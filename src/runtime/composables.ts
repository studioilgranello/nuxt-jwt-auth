import { useCookie } from '#app'
import { AuthState, CookieData } from '../types'

export function useJwtAuth () {

  if (useCookie<CookieData>('nuxt-jwt-auth-token').value) {
    
    return {
      ...useCookie<CookieData>('nuxt-jwt-auth-token').value,
      loggedIn: true
    } as AuthState

  } else {

    return {
      user: null,
      token: null,
      loggedIn: false
    } as AuthState
    
  }
  
}
