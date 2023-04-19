import { defineNuxtModule, addPlugin, createResolver, addImports } from '@nuxt/kit'
import { Endpoints, Redirects } from './types'

// Module options TypeScript interface definition
export interface ModuleOptions {
  baseUrl: string
  endpoints: Endpoints
  redirects: Redirects
}

const defaults: ModuleOptions = {
  baseUrl: 'http://localhost:8000',
  endpoints: {
    login: '/login',
    logout: '/logout',
    user: '/user'
  },
  redirects: {
    home: '/',
    login: '/login',
    logout: '/login'
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-jwt-auth',
    configKey: 'nuxtJwtAuth'
  },
  // Default configuration options of the Nuxt module
  defaults,
  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.nuxtJwtAuth = options

    addPlugin(resolver.resolve('./runtime/plugin'))

    addImports({
      name: 'useJwtAuth',
      as: 'useJwtAuth',
      from: resolver.resolve('runtime/composables')
    })

  }
})
