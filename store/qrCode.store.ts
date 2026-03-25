import { defineStore } from "pinia";
import { QR_CONFIG, STORAGE_KEYS } from "../utils/constants";

export interface QRCodeConfig {
  text: string;
  size: string;
  color: string;
  bgcolor: string;
  format: string;
  url: string;
}

export interface QRCodeHistoryItem extends QRCodeConfig {
  id: string;
  timestamp: number;
}

interface QRStoreState {
  history: QRCodeHistoryItem[];
  currentConfig: QRCodeConfig;
}


const MAX_HISTORY_ITEMS = QR_CONFIG.MAX_HISTORY_ITEMS;

export const useQRStore = defineStore("qrStore", {
  state: (): QRStoreState => ({
    history: [],
    currentConfig: {
      text: "",
      size: QR_CONFIG.DEFAULT_SIZE,
      color: QR_CONFIG.DEFAULT_FOREGROUND_COLOR.replace("#", ""),
      bgcolor: QR_CONFIG.DEFAULT_BACKGROUND_COLOR.replace("#", ""),
      format: QR_CONFIG.DEFAULT_FORMAT,
      url: "",
    },
  }),

  getters: {
    hasHistory: (state) => state.history.length > 0,
    latestQRCode: (state) => state.history[0] || null,
    historyCount: (state) => state.history.length,
  },

  actions: {
    saveToHistory(item: QRCodeHistoryItem) {
      this.history = [item, ...this.history].slice(0, MAX_HISTORY_ITEMS);
      this.persistHistory();
    },

    loadHistory() {
      try {
        const saved = localStorage.getItem(STORAGE_KEYS.QR_HISTORY);
        if (saved) {
          this.history = JSON.parse(saved);
        }
      } catch (error) {
        console.error("Erro ao carregar histórico:", error);
        this.history = [];
      }
    },

    loadConfigFromHistory(item: QRCodeHistoryItem) {
      this.currentConfig = {
        text: item.text,
        size: item.size,
        color: item.color,
        bgcolor: item.bgcolor,
        format: item.format,
        url: item.url,
      };
    },

    removeFromHistory(itemId: string) {
      const index = this.history.findIndex((item) => item.id === itemId);
      if (index > -1) {
        this.history.splice(index, 1);
        this.persistHistory();
      }
    },

    clearHistory() {
      this.history = [];
      this.persistHistory();
    },

    persistHistory() {
      try {
        localStorage.setItem(
          STORAGE_KEYS.QR_HISTORY,
          JSON.stringify(this.history),
        );
      } catch (error) {
        console.error("Erro ao salvar histórico:", error);
      }
    },
  },
});

