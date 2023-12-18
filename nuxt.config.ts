// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: "%s - Projeto Pokemon",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@vee-validate/nuxt"],
  runtimeConfig: {
    public: {
      url_api: process.env.URL_BASE_API,
    },
  },
  debug: true,
  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: "VeeForm",
      Field: "VeeField",
      FieldArray: "VeeFieldArray",
      ErrorMessage: "VeeErrorMessage",
    },
  },
});
