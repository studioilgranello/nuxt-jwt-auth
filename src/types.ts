import { $Fetch } from 'ofetch'
import { ComputedRef } from 'vue'

export interface Endpoints {
  login: string
  logout: string
  signup: string
  user: string
}

export interface Redirects {
  home: string
  login: string
  logout: string
}

export interface ModuleOptions {
  baseUrl: string
  endpoints: Endpoints
  redirects: Redirects
}

export interface AuthData {
  user: any
  token: string | null
}

export interface AuthState<T> {
  user: ComputedRef<T>
  token: ComputedRef<string | null>
  loggedIn: ComputedRef<boolean>
  headers: HeadersInit
}

export type Callback = (response: any) => void

export type SetTokenAndUser = (data: AuthData) => void

export type SetToken = (token: string) => void

export type SetUser = (user: any) => void

export type Login = (credentials: FormData, callback?: Callback | undefined) => Promise<void>

export type Logout = (callback?: Callback | undefined) => Promise<void>

export type Signup = (data: FormData, callback?: Callback | undefined) => Promise<void>

export interface JwtAuthPlugin {
  setTokenAndUser: SetTokenAndUser
  setToken: SetToken
  setUser: SetUser
  login: Login
  logout: Logout
  signup: Signup
  fetch: $Fetch
  headers: HeadersInit
}

// @ts-ignore
declare module 'vue/types/vue' {
  interface Vue {
    $jwtAuth: JwtAuthPlugin
  }
}

// Nuxt Bridge & Nuxt 3
declare module '#app' {
  interface NuxtApp extends PluginInjection {
  }
}

interface PluginInjection {
  $jwtAuth: JwtAuthPlugin
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties extends PluginInjection {
  }
}
