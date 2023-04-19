# Nuxt JWT Auth

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

A Nuxt module to authenticate on a custom backend (Laravel) via jwt token.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)

## Features

<!-- Highlight some of the features your module provide here -->
- ⛰ &nbsp;Foo
- 🚠 &nbsp;Bar
- 🌲 &nbsp;Baz

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
export default defineNuxtConfig({
  modules: [
    'nuxt-jwt-auth'
  ]
})
```

That's it! You can now use Nuxt JWT Auth in your Nuxt app ✨

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
