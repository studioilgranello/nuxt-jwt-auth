import { computed, Ref } from 'vue'
import { useState } from '#app'
import { AuthData, AuthState } from '../types'

export function useJwtAuth<T = any> () {

  const data: Ref<AuthData> = useState('data')

  return {
    token: computed(() => data.value?.token),
    user: computed(() => data.value?.user),
    loggedIn: computed(() => !!data.value),
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + data.value?.token
    }
  } as AuthState<T>

}
