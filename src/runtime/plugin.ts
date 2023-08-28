import { ref } from '#imports'
import { defineNuxtPlugin, addRouteMiddleware, useCookie, useRuntimeConfig } from '#app'
import { ModuleOptions, Callback, Login, Logout, AuthData, AuthState, Signup } from '../types'
import { $Fetch, ofetch } from 'ofetch'
import { useJwtAuth } from './composables'

export default defineNuxtPlugin(() => {

  const config: ModuleOptions = useRuntimeConfig().public.nuxtJwtAuth

  const cookie = useCookie<AuthData>('nuxt-jwt-auth-token', {
    expires: new Date(Date.now() + 12096e5), // 2 weeks from now
    sameSite: 'strict'
  })

  const authState: AuthState = useJwtAuth()

  addRouteMiddleware('auth', async () => {
    // using cookie value instead of authState.loggedIn because
    // when navigating to protected route right after login (without full server reload)
    // authState is not updated
    if (!cookie.value?.token) {
      return config.redirects.login
    }
  })

  addRouteMiddleware('guest', async () => {
    // see above
    if (cookie.value?.token) {
      return config.redirects.home
    }
  })

  const setCookie = (data: AuthData) => {
    cookie.value = {
      token: data.token,
      user: data.user
    } as AuthData
  }

  const setUser = (user: any) => {
    cookie.value = {
      ...cookie.value,
      user
    }
  }

  const setToken = (token: string) => {
    cookie.value = {
      ...cookie.value,
      token
    }
  }

  const clearCookie = () => {
    useCookie('nuxt-jwt-auth-token').value = null
  }

  const authorizedRequestHeaders = ref<HeadersInit>({
    Accept: 'application/json',
    Authorization: 'Bearer ' + authState?.token
  })

  const fetch: $Fetch = ofetch.create({
    baseURL: config.baseUrl,
    credentials: 'include',
    headers: authorizedRequestHeaders.value
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
        setCookie(response as AuthData)
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
      window.location.replace(config.redirects.home)

    }
  }

  const signup: Signup = async (data: any, callback?: Callback | undefined) => {

    if (!config.endpoints.signup) {
      console.log('No signup endpoint configured in nuxt.config.ts !')
      return
    }

    try {
      const response = await fetch(config.endpoints.signup, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Accept: 'application/json'
        } as HeadersInit
      })

      if (response?.token && response?.user) {
        setCookie(response as AuthData)
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

  return {
    provide: {
      jwtAuth: {
        setTokenAndUser: setCookie,
        setUser,
        setToken,
        login,
        logout,
        signup,
        fetch,
        headers: authorizedRequestHeaders.value
      }
    }
  }

})
