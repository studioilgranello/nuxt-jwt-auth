export default defineNuxtConfig({
  modules: ['../src/module'],
  nuxtJwtAuth: {
    baseUrl: 'http://unogmall.test/api',
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
})
