import { $Fetch } from 'ofetch'

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

export interface CookieData {
  user: any
  token: string | null
}

export interface AuthState extends CookieData {
  loggedIn: boolean
}

export type Callback = (response: any) => void

export type Login = (credentials: any, callback?: Callback | undefined) => Promise<void>

export type GetUser = <T>() => Promise<T|null>

export type Logout = (callback?: Callback | undefined) => Promise<void>

export type Signup = (data: any, callback?: Callback | undefined) => Promise<void>

export interface JwtAuthPlugin {
  login: Login
  getUser: GetUser
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
