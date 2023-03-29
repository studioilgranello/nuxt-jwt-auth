import { $Fetch } from 'ofetch'

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
  apiReq: $Fetch
}
