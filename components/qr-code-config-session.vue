<template>
  <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
    <a-card title="Configurações" class="preview-card">
      <a-form :model="qrForm" layout="vertical">
        <a-form-item label="Texto ou URL">
          <a-input
            v-model:value="qrForm.text"
            placeholder="Digite o texto ou URL"
            @press-enter="generateQRCode"
          />
        </a-form-item>

        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Tamanho">
              <a-select v-model:value="qrForm.size">
                <a-select-option
                  v-for="size in QR_CONFIG.AVAILABLE_SIZES"
                  :key="size"
                  :value="size"
                >
                  {{ size }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Formato">
              <a-select v-model:value="qrForm.format">
                <a-select-option
                  v-for="format in QR_CONFIG.AVAILABLE_FORMATS"
                  :key="format"
                  :value="format"
                >
                  {{ format.toUpperCase() }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Cor de fundo QR Code">
              <a-input
                v-model:value="qrForm.backgroundColor"
                type="color"
                style="width: 60px;"
              />
              <span style="margin-left: 8px;">{{ qrForm.backgroundColor }}</span>
              </a-form-item>
            </a-col>
            <a-col :span="12">
            <a-form-item label="Cor do QR Code">
              <a-input
                v-model:value="qrForm.foregroundColor"
                type="color"
                style="width: 60px;"
              />
              <span style="margin-left: 8px;">{{ qrForm.foregroundColor }}</span>
            </a-form-item>
          </a-col>
        </a-row>

        <a-form-item>
          <a-button
            type="primary"
            @click="generateQRCode"
            :loading="isGenerating"
            block
          >
            {{ isGenerating ? 'A processar...' : 'Gerar QR Code' }}
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </a-col>
      
  <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
    <QRCodePreviewSession
      :generated-url="qrCodeUrl"
      :loading="isGenerating"
      :format="qrForm.format"
    />
  </a-col>

</template>

<script setup lang="ts">
import {  notification } from 'ant-design-vue'
import { useQRCode } from '../composables/useQRCode'
import { useQRStore } from '../store/qrCode.store'
import { ref, reactive, watch, createApp} from 'vue'
import QRCodePreviewSession from './qr-code-preview-session.vue'
import { APP_CONFIG, QR_CONFIG, UI_CONFIG } from '../utils/constants'

const { generateUrl } = useQRCode()
const qrStore = useQRStore()

const qrCodeUrl = ref('')
const isGenerating = ref(false)

const qrForm = reactive<QRFormData>({
  text: '',
  size: QR_CONFIG.DEFAULT_SIZE,
  format: QR_CONFIG.DEFAULT_FORMAT,
  backgroundColor: QR_CONFIG.DEFAULT_BACKGROUND_COLOR,
  foregroundColor: QR_CONFIG.DEFAULT_FOREGROUND_COLOR,
})

watch(
  () => qrStore.currentConfig,
  (newConfig) => {
    qrForm.text = newConfig.text
    qrForm.size = newConfig.size
    qrForm.format = newConfig.format
    qrForm.backgroundColor = newConfig.bgcolor
    qrForm.foregroundColor = newConfig.color
    qrCodeUrl.value = newConfig.url || ''
  },
  { deep: true }
)

const validateForm = (): boolean => {
  if (!qrForm.text.trim()) {
    notification.warning({
      message: 'Campo obrigatório',
      description: 'O campo "Texto ou URL" é obrigatório. Por favor, preencha-o para gerar o QR Code.',
      duration: UI_CONFIG.NOTIFICATION_DURATION,
      placement: UI_CONFIG.NOTIFICATION_PLACEMENT
    })
    return false
  }
  return true
}

const generateQRCode = async () => {
  if (!validateForm()) return

  try {
    isGenerating.value = true

    const url = generateUrl({
      text: qrForm.text,
      size: qrForm.size,
      color: qrForm.foregroundColor,
      bgcolor: qrForm.backgroundColor,
      format: qrForm.format,
      url: ''
    })

    qrCodeUrl.value = url

    await qrStore.saveToHistory({
      ...qrForm,
      color: qrForm.foregroundColor,
      bgcolor: qrForm.backgroundColor,
      id: Date.now().toString(),
      url,
      timestamp: Date.now()
    })

    notification.success({
      message: 'QR Code gerado com sucesso!',
      duration: UI_CONFIG.NOTIFICATION_DURATION,
      placement: UI_CONFIG.NOTIFICATION_PLACEMENT
    })
  } catch (error) {
    console.error('Erro ao gerar QR Code:', error)
    notification.error({
      message: 'Erro ao gerar o QR Code.',
      description: 'Ocorreu um erro ao gerar o QR Code. Tente novamente.',
      duration: UI_CONFIG.NOTIFICATION_DURATION,
      placement: UI_CONFIG.NOTIFICATION_PLACEMENT
    })
  } finally {
    isGenerating.value = false
  }
}

interface QRFormData {
  text: string
  size: string
  format: string
  backgroundColor: string
  foregroundColor: string
}
</script>

<style lang="css" scoped>
</style>
