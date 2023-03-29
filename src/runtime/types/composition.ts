import {defineNuxtPlugin} from '#app'
import { JwtAuthPlugin } from './plugin'

export default defineNuxtPlugin(() => {
  // console.log('load $i18n type definition plugin for composition mode')
})

interface PluginsInjections {
  $jwtAuth: JwtAuthPlugin
}

declare module '#app' {
  interface NuxtApp extends PluginsInjections {}
}

declare module 'nuxt/dist/app/nuxt' {
  interface NuxtApp extends PluginsInjections {}
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties extends PluginsInjections {}
}
