<template>
  <div class="d-flex justify-content-center mt-5">
    <div class="card p-5">
      <h1>Login</h1>
      <form class="mt-5">
        <label
          for="email"
          class="form-label"
        >
          Email
        </label>
        <input
          v-model="email"
          type="email"
          class="form-control"
        >
        <label
          for="password"
          class="form-label"
        >
          Password
        </label>
        <input
          v-model="password"
          type="password"
          class="form-control"
        >
        <button
          type="button"
          class="btn btn-primary mt-5"
          @click="onLogin"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ref, useNuxtApp, definePageMeta, useRouter } from '#imports'

const {$jwtAuth} = useNuxtApp()
const router = useRouter()

definePageMeta({
  middleware: ['guest']
})

const email = ref('')
const password = ref('')

function onLogin() {
  const formData = new FormData()
  formData.append('email', email.value)
  formData.append('password', password.value)
  $jwtAuth.login(formData, () => {
    router.push('/')
  })
}

</script>
