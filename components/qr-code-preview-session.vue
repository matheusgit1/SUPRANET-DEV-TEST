<template>
  <a-card title="Preview do QR Code" class="preview-card">
    <div v-if="generatedUrl" class="qr-display">
      <a-image
        :src="generatedUrl"
        alt="QR Code"
        :width="250"
        :height="250"
        @load="loading = false"
      />
      <div class="actions" style="margin-top: 16px;">
        <a-button
          type="primary"
          @click="downloadQR"
          :loading="loadingDownload"
        >
          Baixar Imagem
        </a-button>
      </div>
    </div>
    <div v-else class="empty-state">
      <a-empty description="Insira um texto e clique em gerar para visualizar" />
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { message, notification} from 'ant-design-vue'
import { ref } from 'vue'
import { UI_CONFIG } from '../utils/constants'

interface Props {
  generatedUrl?: string
  loading?: boolean
  format?: string
}

const props = withDefaults(defineProps<Props>(), {
  generatedUrl: '',
  loading: false,
  format: 'png'
})

const loadingDownload = ref(false)

const downloadQR = async () => {
  try {
    loadingDownload.value = true
    const response = await fetch(props.generatedUrl!)
    const blob = await response.blob()
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `qrcode-${Date.now()}.${props.format}`
    link.click()
    notification.success({
      message: 'Download Concluído',
      placement: UI_CONFIG.NOTIFICATION_PLACEMENT,
      duration: UI_CONFIG.NOTIFICATION_DURATION,
    })
  } catch (err) {
    notification.error({
      message: 'Erro ao baixar a imagem.',
      placement: UI_CONFIG.NOTIFICATION_PLACEMENT,
      duration: UI_CONFIG.NOTIFICATION_DURATION,
    })
  } finally {
    loadingDownload.value = false
  }
}
</script>

<style lang="css" scoped>
.preview-card {
  max-width: 100%;
  height: 100%;
}

.qr-display {
  text-align: center;
}

.actions {
  display: flex;
  justify-content: center;
}
</style>


