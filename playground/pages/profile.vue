<template>
  <div class="m-5">
    <h1>My Profile</h1>
    <h2>My name is: {{ user?.name }}</h2>
    <button
      class="btn btn-primary"
      @click="onFetch"
    >
      Fetch some data
    </button>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta, useJwtAuth } from '#imports'

definePageMeta({
  middleware: 'auth'
})

const { user, headers } = useJwtAuth()

function onFetch () {
  console.log('Sending request with this headers!', headers)
}

</script>
