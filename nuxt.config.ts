import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    buildModules: [
        "@nuxt3-graphql/urql",
    ],
    css: ["~/assets/css/tailwind.css"],
    build: {
      postcss: {
        postcssOptions: {
          plugins: {
            tailwindcss: {},
            autoprefixer: {},
          },
        },
      },
    },
    urql: {
    //     url: "https://api.spacex.land/graphql"
        url: "http://localhost:4000/"
    },
})
