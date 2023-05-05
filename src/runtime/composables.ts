import {reactive} from 'vue'
import { useCookie } from '#app'
import { AuthState, CookieData } from '../types'

export function useJwtAuth () {

  const cookie = useCookie<CookieData>('nuxt-jwt-auth-token').value
  const authState = reactive<AuthState>({
    ...cookie,
    loggedIn: !!cookie
  })

  return authState
  
}
