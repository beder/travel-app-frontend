// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "nuxt-graphql-client"],
  "graphql-client": {
    tokenStorage: {
      name: "_session",
      mode: "cookie", // default
      cookieOptions: {
        path: "/",
        secure: false, // defaults to `process.env.NODE_ENV === 'production'`
        httpOnly: false, // Only accessible via HTTP(S)
        maxAge: 60 * 60 * 24 * 5, // 5 days
      },
    },
  },
  runtimeConfig: {
    public: {
      GQL_HOST: process.env.GQL_HOST, // "http://localhost:4000/graphql"
    },
  },
  typescript: {
    typeCheck: true,
  },
});
