<template>
  <div class="m-5">
    <h1>{{ title }}</h1>
    <h3>You are currently logged {{ loggedIn ? 'in' : 'out' }}</h3>
    <nuxt-link
      v-if="loggedIn"
      to="/profile"
    >
      My super-secret profile page
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { computed, useJwtAuth } from '#imports'

const { user, loggedIn } = useJwtAuth()

const title = computed(() => {
  if (loggedIn) {
    return 'Welcome back, ' + user?.name
  } else {
    return 'Hello, handsome stranger'
  }
})

</script>