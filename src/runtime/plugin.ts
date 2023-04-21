import { defineNuxtPlugin, useState, addRouteMiddleware, useCookie, useRuntimeConfig } from '#app'
import { ModuleOptions, Callback, AuthState, GetUser, Login, Logout } from '../types'
import { $Fetch, ofetch } from 'ofetch'

export default defineNuxtPlugin(() => {
  //
  const config: ModuleOptions = useRuntimeConfig().public.nuxtJwtAuth
  //
  const auth = useState<AuthState>('jwt-auth', () => {
    return {
      user: null,
      loggedIn: false,
      token: null
    }
  })

  addRouteMiddleware('fetch-user', async () => {
    getToken()

    await getUser()

  }, { global: true })

  addRouteMiddleware('auth', async () => {
    if (!auth.value.loggedIn) {
      return config.redirects.login
    }
  })

  addRouteMiddleware('guest', async () => {
    if (auth.value.loggedIn) {
      return config.redirects.home
    }
  })

  const getToken = () => {
    auth.value.token = useCookie('nuxt-jwt-auth-token').value ?? null
  }

  const setToken = (token: string) => {
    useCookie('nuxt-jwt-auth-token').value = token
  }

  const clearToken = () => {
    useCookie('nuxt-jwt-auth-token').value = null
  }

  const fetch: $Fetch = ofetch.create({
    baseURL: config.baseUrl,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + auth.value.token
    } as HeadersInit
  })

  const getUser: GetUser = async () => {
    if (auth.value.loggedIn && auth.value.user) {
      return auth.value.user
    }

    if (!auth.value.token) {
      return null
    }

    try {
      const user = await fetch(config.endpoints.user)
      if (user) {
        auth.value.loggedIn = true
        auth.value.user = user
        return user
      }
    } catch (error) {
      // console.log(error)
    }

    return null
  }

  const login: Login = async (credentials: any, callback?: Callback | undefined) => {

    try {
      const response = await fetch(config.endpoints.login, {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          Accept: 'application/json'
        } as HeadersInit
      })

      if (response?.token) {
        setToken(response.token)
      }

      if (callback !== undefined) {
        callback(response)
        return
      }
      window.location.replace(config.redirects.home)
    } catch (error: any) {
      throw error.data
    }
  }

  const logout: Logout = async (callback?: Callback | undefined) => {
    try {
      const response = await fetch(config.endpoints.logout, {
        method: 'POST'
      })
      if (callback !== undefined) {
        callback(response)
        return
      }

      window.location.replace(config.redirects.logout)
    } catch (error) {
      console.log(error)
    } finally {
      auth.value.loggedIn = false
      auth.value.user = null
      auth.value.token = null
      clearToken()
    }
  }

  return {
    provide: {
      jwtAuth: {
        login,
        getUser,
        logout,
        fetch
      }
    }
  }

})
