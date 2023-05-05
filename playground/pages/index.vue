<template>
  <div>
    <h1>{{ title }}</h1>
    <h3>You are currently logged {{ loggedIn ? 'in' : 'out' }}</h3>
  </div>
</template>

<script setup lang="ts">
import { computed, useJwtAuth } from '#imports'

const { user, loggedIn } = useJwtAuth()

const title = computed(() => {
  if (loggedIn) {
    return 'Hello, ' + user?.name
  } else {
    return 'Hello, handsome stranger'
  }
})

</script>