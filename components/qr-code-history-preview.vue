<template>
  <a-card title="Histórico de QR Codes" class="history-card">
    <a-list
      v-if="hasHistory"
      :data-source="qrHistory"
      :bordered="false"
    >
      <template #renderItem="{ item }">
        <a-list-item class="history-item" @click="loadQRFromHistory(item)" style="cursor: pointer;">
          <template #extra>
            <a-image
              :src="item.url"
              :width="50"
              :height="50"
              :preview="true"
              @click.stop
            />
          </template>
          <a-list-item-meta>
            <template #title>
              <span class="text-truncate" :title="item.text">{{ item.text }}</span>
            </template>
            <template #description>
              <a-space>
                <a-tag color="blue">{{ item.size }}</a-tag>
                <a-tag color="green">{{ item.format }}</a-tag><br/>
                <span style="font-size: 12px; color: #999;">{{ formatDate(item.timestamp) }}</span>
              </a-space>
            </template>
          </a-list-item-meta>
          <template #actions>
            <a-button
              type="primary"
              size="small"
              danger
              @click.stop="removeQRFromHistory(item.id)"
            >
              Remover
            </a-button>
          </template>
        </a-list-item>
      </template>
    </a-list>
    <a-empty v-else description="Nenhum QR Code no histórico" />
  </a-card>
</template>

<script setup lang="ts">
  import { computed, onMounted } from 'vue'
  import { useQRStore, type QRCodeHistoryItem } from '~~/store/qrCode.store'

  const qrStore = useQRStore()

  const qrHistory = computed(() => qrStore.history)
  const hasHistory = computed(() => qrStore.hasHistory)

  onMounted(() => {
    qrStore.loadHistory()
  })

  const loadQRFromHistory = (item: QRCodeHistoryItem) => {
    qrStore.loadConfigFromHistory(item)
  }

  const removeQRFromHistory = (itemId: string) => {
    qrStore.removeFromHistory(itemId)
  }

  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
</script>

<style lang="css" scoped>
.history-card {
  max-height: 500px;
  overflow-y: auto;
}

.history-item {
  padding: 8px 0;
  transition: background-color 0.3s;
}

.history-item:hover {
  background-color: #fafafa53;
  border-radius: 4px;
  padding-left: 8px;
  padding-right: 8px;
  margin-left: -8px;
  margin-right: -8px;
}

.text-truncate {
  display: block;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>