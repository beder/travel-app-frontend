// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  apollo: {
    clients: {
      default: {
        httpEndpoint: "http://localhost:4000/graphql",
      },
    },
  },
  devtools: { enabled: true },
  modules: ["@nuxtjs/apollo", "@nuxtjs/tailwindcss"],
});
