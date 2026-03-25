<template>
  <div class="header-container">
    <a-space class="header-content" align="center">
      <div class="icon-wrapper">
        <QrcodeOutlined class="qr-icon" />
      </div>
      <a-typography-title color="primary" :level="1" class="header-title">
        QR Code
        <a-typography-text color="secondary" class="studio-text">
          Studio
        </a-typography-text>
      </a-typography-title>
    </a-space>
  </div>
</template>

<script setup lang="ts">
  import { QrcodeOutlined } from '@ant-design/icons-vue'
</script>

<style lang="css" scoped>
.header-container {
  padding: 24px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
}

.header-content {
  justify-content: center;
  width: 100%;
}

.icon-wrapper {
  border-radius: 50%;
  padding: 12px;
  animation: pulse 2s infinite;
}

.qr-icon {
  font-size: 32px;
}

.header-title {
  margin: 0 !important;
}

.studio-text {
  font-weight: 500;
}

@keyframes pulse {
  0% {
    transform: scale(1.5);
  }
  50% {
    transform: scale(2);
  }
  100% {
    transform: scale(1.5);
  }
}
</style>