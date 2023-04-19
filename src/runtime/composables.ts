import { useState } from '#app'
import { AuthState } from '../types'

export function useJwtAuth () {
  return useState('jwt-auth').value as AuthState
}
