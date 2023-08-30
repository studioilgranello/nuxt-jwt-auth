export default defineNuxtConfig({
  css: ['bootstrap/dist/css/bootstrap.min.css'],
  modules: ['../src/module'],
  nuxtJwtAuth: {
    baseUrl: 'http://metalpro-shipments.test/api',
    endpoints: {
      login: '/login',
      logout: '/logout',
      signup: '/signup',
      user: '/user'
    },
    redirects: {
      home: '/',
      login: '/login',
      logout: '/login'
    }
  }
})
