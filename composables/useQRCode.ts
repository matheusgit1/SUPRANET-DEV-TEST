import type { QRCodeConfig } from "../store/qrCode.store";
import { API_CONFIG, QR_CONFIG, VALIDATION_RULES } from "../utils/constants";

interface QRCodeParams {
  data: string;
  size: string;
  color: string;
  bgcolor: string;
  format: string;
}

export const useQRCode = () => {
  const generateUrl = (config: QRCodeConfig): string => {
    if (!isValidConfig(config)) {
      throw new Error("Configuração do QR Code inválida");
    }

    const params: QRCodeParams = {
      data: config.text,
      size: config.size || QR_CONFIG.DEFAULT_SIZE,
      color: sanitizeColor(config.color),
      bgcolor: sanitizeColor(config.bgcolor),
      format: config.format || QR_CONFIG.DEFAULT_FORMAT,
    };

    const queryString = buildQueryString(params);
    return `${API_CONFIG.QR_CODE_BASE_URL}?${queryString}`;
  };

  const isValidConfig = (config: QRCodeConfig): boolean => {
    return !!(
      config &&
      typeof config.text === "string" &&
      config.text.trim().length >= VALIDATION_RULES.MIN_TEXT_LENGTH &&
      config.text.trim().length <= VALIDATION_RULES.MAX_TEXT_LENGTH
    );
  };

  const sanitizeColor = (color: string): string => {
    return color.replace(/^#/, "");
  };

  const buildQueryString = (params: QRCodeParams): string => {
    const urlParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      urlParams.append(key, value);
    });
    return urlParams.toString();
  };

  return {
    generateUrl,
    isValidConfig,
  };
};
