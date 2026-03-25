<template>
  <NuxtRouteAnnouncer />
  <div v-if="isLoading">
    <AppLoadingFallback />
  </div>
  <div v-else>
    <a-config-provider :theme="themeConfig">
      <a-layout style="min-height: 100vh;">
        <Header></Header>
        <a-layout-content style="padding: 20px;">
          <a-row :gutter="24">
            <QRCodeConfigSession/>
            <a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
              <QRCodeHistoryPreview/>
            </a-col>
          </a-row>
        </a-layout-content>
        <a-float-button 
          type="primary" 
          :tooltip="`Mudar para tema ${isDark ? 'Claro' : 'Escuro'}`" 
          shape="square" 
          @click="toggleTheme"
        >
          <template #icon>
            <SwapOutlined />
          </template>
        </a-float-button>
      </a-layout>
    </a-config-provider>
  </div>
</template>

<script setup lang="ts">
  import { SwapOutlined } from "@ant-design/icons-vue"
  import { useTheme } from '../composables/useTheme'
  import { createPinia } from "pinia";
  import { createApp, ref, onMounted  } from 'vue'
  import { APP_CONFIG } from '../utils/constants'
  import Header from '../components/header.vue';
  import QRCodeConfigSession from '../components/qr-code-config-session.vue';
  import QRCodeHistoryPreview from '../components/qr-code-history-preview.vue';
  import AppLoadingFallback from '../components/app-loading-fallback.vue';

  const isLoading = ref(true)

  const { isDark, themeConfig, toggleTheme } = useTheme()
  
  const pinia = createPinia()
  const app = createApp(App)
  app.use(pinia)

  useHead({
    title: APP_CONFIG.NAME
  })

  onMounted(async () => {
    isLoading.value = false
  })
</script>