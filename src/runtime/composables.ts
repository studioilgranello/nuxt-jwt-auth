import {reactive} from 'vue'
import { useCookie } from '#app'
import { AuthState, AuthData } from '../types'

export function useJwtAuth () {

  const cookie = useCookie<AuthData>('nuxt-jwt-auth-token').value
  const authState = reactive<AuthState>({
    ...cookie,
    loggedIn: !!cookie,
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + cookie?.token
    }
  })

  return authState
  
}
