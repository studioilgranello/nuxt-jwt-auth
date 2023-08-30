import { computed, Ref } from 'vue'
import { useState } from '#app'
import { AuthData, AuthState } from '../types'

export function useJwtAuth<T = any>() {

  const data: Ref<AuthData> = useState('data')

  const token = computed(() => data.value?.token)

  const user = computed(() => data.value?.user)

  const loggedIn = computed(() => !!data.value)

  const headers = computed(() => loggedIn.value ? {
    Accept: 'application/json',
    Authorization: 'Bearer ' + data.value.token
  } : { Accept: 'application/json' })

  return {
    token,
    user,
    loggedIn,
    headers: headers.value
  } as AuthState<T>

}
