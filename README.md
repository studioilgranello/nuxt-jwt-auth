# Nuxt JWT Auth

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

A Nuxt module to authenticate on a custom backend (Laravel) via jwt token.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)

## Features

- 🔌 Manage login, logout, protected api requests with `$jwtAuth` plugin
- 🪝 Access to user data with `useJwtAuth` composable
- 🖥️ Works also in SSR mode
- ❤️ Heavily inspired by the awesome [nuxt-sanctum-auth](https://github.com/dystcz/nuxt-sanctum-auth)


## Quick Setup

1. Add `nuxt-jwt-auth` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-jwt-auth

# Using yarn
yarn add --dev nuxt-jwt-auth

# Using npm
npm install --save-dev nuxt-jwt-auth
```

2. Add `nuxt-jwt-auth` to the `modules` section of `nuxt.config.ts`

```js
// nuxt.config.ts

export default defineNuxtConfig({
  modules: [
    'nuxt-jwt-auth'
  ]
})
```

3. Add configuration object `nuxt-jwt-auth`

```js
// nuxt.config.ts

export default defineNuxtConfig({
  // ...
  nuxtJwtAuth: {
    baseUrl: 'http://homestead.test/api', // URL of your backend
    endpoints: {
      login: '/login', // Where to request login (POST)
      logout: '/logout', // Where to request logout (POST)
      user: '/user' // Where to request user data (GET)
    },
    redirects: {
      home: '/', // Where to redirect after successfull login and logout
      login: '/login', // Where to redirect if user is not logged in and accesses a logged-only route
      logout: '/logout' // Where to redirect if user is logged in and accesses a guest-only route 
    }
  }
})
```

## How to use

### Login
This modules provides the $jwtAuth plugin, which contains login and logout methods.

Login function accepts credentials, which are passed as-is to the backend, as first argument.
You can optionally provide a callback function as second argument. This function will receive the response from the backend.

If no callback function is provided, the user will be redirected to the `home` route specified in configuration after successful login.

```vue
<script setup>
const { $jwtAuth } = useNuxtApp()
const router = useRouter()

async function login() {
  try {
    await $jwtAuth.login(
      {
        email: 'email@example.com',
        password: 'supersecretpassword'
      },
      // optional callback function
      (data) => {
        console.log(data)
        router.push('/account')
      }
    )
  } catch (e) {
    // your error handling
  }
}
</script>
```

Please note that it is requested that the backend responds to the login request with a JSON object containing both token and user properties:

```json
{
  "token": "1|TjVJavoOkerwXViiRwLBLsd1xGSRoYosiO87zSEr",
  "user": {
    "name": "Mario",
    "surname": "Rossi",
    "address": "Fake St. 123"
  }
}
```

---

### Signup
This modules provides the $jwtAuth plugin, which contains signup method.

Signup function accepts registration data, which are passed as-is to the backend, as first argument.
You can optionally provide a callback function as second argument. This function will receive the response from the backend.

If no callback function is provided, the user will be redirected to the `home` route specified in configuration after successful signup.

```vue
<script setup>
const { $jwtAuth } = useNuxtApp()
const router = useRouter()

async function signup() {
  try {
    await $jwtAuth.signup(
      {
        username: 'Mario Rossi',
        email: 'email@example.com',
        password: 'supersecretpassword',
        password_confirm: 'supersecretpassword'
      },
      // optional callback function
      (data) => {
        console.log(data)
        router.push('/account')
      }
    )
  } catch (e) {
    // your error handling
  }
}
</script>
```

Please note that it is requested that the backend responds to the signup request with a JSON object containing both token and user properties:

```json
{
  "token": "1|TjVJavoOkerwXViiRwLBLsd1xGSRoYosiO87zSEr",
  "user": {
    "name": "Mario",
    "surname": "Rossi",
    "address": "Fake St. 123"
  }
}
```

---

### Route middlewares
This modules provides two route middleware you can optionally add to pages.

#### auth
Use this middleware in pages where user must be logged in (such as `/account`)
```vue
<script setup>
definePageMeta({
  middleware: 'auth'
})
</script>
```

#### guest
Use this middleware in pages where user must not be logged in (such as `/login`)
```vue
<script setup>
definePageMeta({
  middleware: 'guest'
})
</script>
```

---

### Get the user (useJwtAuth)
This modules provides the useJwtAuth composable, which you can use to obtain useful auth-related data, such as `user`, `token`, `loggedIn` state.

```vue
<template>
  <h1>Hello,</h1>
  <h2 v-if="loggedIn">{{user.name}}</h2>
</template>

<script setup>
const { user, loggedIn } = useJwtAuth()

</script>
```

---

### Protected data fetch (fetch)
By using the fetch function of $jwtAuth plugin, you can send standard api requests to the backend.

```vue
<script setup>
const { $jwtAuth } = useNuxtApp()

async function fetchMyData() {
  try {
    const myData = await $jwtAuth.fetch('my-api-route')
    // do something with received data...
  } catch (e) {
    // your error handling
  }
}
</script>
```

---

### Logout
This modules provides the $jwtAuth plugin, which contains login and logout methods.

```vue
<script setup>
const { $jwtAuth } = useNuxtApp()

async function logout() {
  try {
    await $jwtAuth.logout()
  } catch (e) {
    // your error handling
  }
}
</script>
```

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-jwt-auth/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-jwt-auth

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-jwt-auth.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-jwt-auth

[license-src]: https://img.shields.io/npm/l/nuxt-jwt-auth.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-jwt-auth

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
