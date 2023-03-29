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
