import { computed, Ref } from 'vue'
import { useState } from '#app'
import { AuthData, AuthState } from '../types'

export function useJwtAuth<T = any> () {

  const data: Ref<AuthData> = useState('data')

  const token = computed(() => data.value?.token)

  const user = computed(() => data.value?.user)

  const loggedIn = computed(() => !!data.value)

  return {
    token,
    user,
    loggedIn,
    headers: {
      Accept: 'application/json',
      Authorization: loggedIn.value ? 'Bearer ' + token.value : undefined
    }
  } as AuthState<T>

}
