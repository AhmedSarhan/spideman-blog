const bodyParser = require('body-parser');
const axios = require('axios');
export default {
  // Target (https://go.nuxtjs.dev/config-target)

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'SpiderMan Blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'the best Blog for Spidey Movies out There!',
      },
    ],
    script: [
      { src: 'https://code.jquery.com/jquery-3.5.1.slim.min.js' },
      {
        src:
          'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js',
      },
      {
        src:
          'https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap',
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css',
      },
    ],
  },
  // customize the progress bar color
  loading: {
    height: '4px',
    continuous: true,
    duration: 3000,
  },

  /*
   ** importing a custom loader. this will overwrite the default loader above
   */
  loading: '~/components/LoadingBar.vue',

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/styles/main.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~plugins/core-components.js'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['@nuxtjs/axios'],
  env: {
    fbAPIKey: 'AIzaSyDfmKg4tNquC7fssWQWGvnqPWL42AaRHuc',
  },
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
  pageTransition: {
    name: 'page',
    mode: 'out-in',
  },
  serverMiddleware: [bodyParser.json(), '~/api'],
  generate: {
    routes: function () {
      return axios
        .get('https://nuxt-blog-4711b.firebaseio.com/posts.json')
        .then((res) => {
          const routes = [];
          for (const key in res.data) {
            routes.push({
              route: '/posts/' + key,
              payload: { postData: res.data[key] },
            });
          }
          return routes;
        });
    },
  },
};
