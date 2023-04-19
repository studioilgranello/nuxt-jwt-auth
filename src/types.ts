import { $Fetch } from 'ofetch'

export interface Endpoints {
  login: string
  logout: string
  user: string
}

export interface Redirects {
  home: string
  login: string
  logout: string
}

export interface ModuleOptions {
  token: boolean
  baseUrl: string
  endpoints: Endpoints
  redirects: Redirects
}


export interface AuthState {
  user: any
  loggedIn: boolean
  token: string|null
}

export type Callback = (response: any) => void

export interface JwtAuthPlugin {
  login: (data: any, callback?: Callback | undefined) => Promise<void>
  getUser: () => Promise<any>
  logout: (callback?: Callback | undefined) => Promise<void>
  authFetch: $Fetch
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
