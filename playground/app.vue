<template>
  <div>
    Nuxt module playground!
  </div>
</template>

<script setup lang="ts">
import { onMounted, useNuxtApp } from '#imports'

const {$jwtAuth} = useNuxtApp()

onMounted( async () => {
  await $jwtAuth.logout()
})

</script>
