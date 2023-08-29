<template>
  <div class="m-5">
    <h1>My Profile</h1>
    <h2>My name is: {{ user?.name }}</h2>
    <button
      class="btn btn-primary me-5"
      @click="onUpdate"
    >
      Cambia nome utente nel cookie
    </button>
    <button
      class="btn btn-primary"
      @click="onFetch"
    >
      Fetch some data
    </button>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta, useJwtAuth, useNuxtApp } from '#imports'

definePageMeta({
  middleware: 'auth'
})

const { $jwtAuth } = useNuxtApp()

const { user, headers } = useJwtAuth()

function onFetch () {
  console.log('Sending request with this headers!', headers)
}

function onUpdate () {
  $jwtAuth.setUser({
    name: 'Test'
  })
}

</script>
