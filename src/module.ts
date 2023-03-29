import { defineNuxtModule, addPlugin, createResolver, addImports } from '@nuxt/kit'
import { Endpoints, Redirects } from './runtime/types/module'

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

    addPlugin(resolver.resolve('./runtime/composition'))

    addImports({
      name: 'useJwtAuth', // name of the composable to be used
      as: 'useJwtAuth',
      from: resolver.resolve('runtime/composables/useJwtAuth') // path of composable
    })

    nuxt.hook('prepare:types', ({ references }) => {
      const typesFile = resolver.resolve('./runtime/types')
      references.push({ path: resolver.resolve(nuxt.options.buildDir, typesFile) })
    })

  }
})
