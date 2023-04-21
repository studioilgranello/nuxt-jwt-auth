export default defineNuxtConfig({
  css: ["bootstrap/dist/css/bootstrap.min.css"],
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
