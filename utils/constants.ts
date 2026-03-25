export const APP_CONFIG = {
  NAME: "QR Code Studio",
  VERSION: "1.0.0",
} as const;

export const QR_CONFIG = {
  DEFAULT_SIZE: "300x300",
  DEFAULT_FORMAT: "png",
  DEFAULT_FOREGROUND_COLOR: "#000000",
  DEFAULT_BACKGROUND_COLOR: "#ffffff",
  AVAILABLE_SIZES: ["150x150", "300x300", "500x500"] as const,
  AVAILABLE_FORMATS: ["png", "jpg", "svg"] as const,
  MAX_HISTORY_ITEMS: 10,
} as const;

export const API_CONFIG = {
  QR_CODE_BASE_URL: "https://api.qrserver.com/v1/create-qr-code/",
} as const;

export const STORAGE_KEYS = {
  QR_HISTORY: "qr_history",
} as const;

export const UI_CONFIG = {
  CARD_MAX_HEIGHT: "500px",
  IMAGE_PREVIEW_SIZE: 250,
  THUMBNAIL_SIZE: 50,
  NOTIFICATION_DURATION: 1.75,
  NOTIFICATION_PLACEMENT: "topLeft",
} as const;

export const VALIDATION_RULES = {
  MIN_TEXT_LENGTH: 1,
  MAX_TEXT_LENGTH: 1000,
} as const;
