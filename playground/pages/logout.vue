<template>
  <h1>Logging you out..</h1>
</template>

<script setup lang="ts">
import { onMounted, useNuxtApp } from '#imports'

const { $jwtAuth } = useNuxtApp()

onMounted(() => {
  $jwtAuth.logout()
})

</script>