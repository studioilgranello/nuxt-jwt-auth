import { JwtAuthPlugin } from './plugin'

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

// index.d.ts
declare module '#app' {
  interface NuxtApp {
    $jwtAuth: JwtAuthPlugin
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $jwtAuth: JwtAuthPlugin
  }
}

export { }
