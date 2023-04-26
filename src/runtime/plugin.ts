import { defineNuxtPlugin, addRouteMiddleware, useCookie, useRuntimeConfig } from '#app'
import { ModuleOptions, Callback, GetUser, Login, Logout, CookieData, AuthState } from '../types'
import { $Fetch, ofetch } from 'ofetch'
import { useJwtAuth } from './composables'

export default defineNuxtPlugin(() => {
  //
  const config: ModuleOptions = useRuntimeConfig().public.nuxtJwtAuth
  //
  const authState: AuthState = useJwtAuth()

  addRouteMiddleware('auth', async () => {
    if (!authState.loggedIn) {
      return config.redirects.login
    }
  })

  addRouteMiddleware('guest', async () => {
    if (authState.loggedIn) {
      return config.redirects.home
    }
  })

  const setCookie = (data: CookieData) => {
    const cookie = useCookie('nuxt-jwt-auth-token', {
      expires: new Date(Date.now() + 12096e5), // 2 weeks from now
      sameSite: 'strict'
    })
    cookie.value = JSON.stringify({
      token: data.token,
      user: data.user
    } as CookieData)
  }

  const clearCookie = () => {
    useCookie('nuxt-jwt-auth-token').value = null
  }

  const fetch: $Fetch = ofetch.create({
    baseURL: config.baseUrl,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + authState?.token
    } as HeadersInit
  })

  const login: Login = async (credentials: any, callback?: Callback | undefined) => {

    try {
      const response = await fetch(config.endpoints.login, {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          Accept: 'application/json'
        } as HeadersInit
      })

      if (response?.token && response?.user) {
        setCookie(response as CookieData)
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

    } catch (error) {
      console.log(error)
    } finally {

      clearCookie()
      window.location.replace(config.redirects.logout)

    }
  }

  return {
    provide: {
      jwtAuth: {
        login,
        logout,
        fetch
      }
    }
  }

})
