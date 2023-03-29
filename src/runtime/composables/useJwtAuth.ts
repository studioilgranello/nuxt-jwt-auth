import { useState } from '#imports'
import { AuthState } from '../types/plugin'

export const useJwtAuth = () => {
  return useState('jwt-auth').value as AuthState
}
