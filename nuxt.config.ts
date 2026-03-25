export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@ant-design-vue/nuxt"],
  antd: {
    extractStyle: true,
  },
  css: ["ant-design-vue/dist/reset.css"],
});
