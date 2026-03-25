import { ref, computed, readonly } from "vue";
import { theme } from "ant-design-vue";

export const useTheme = () => {
  const isDark = ref(false);

  const themeConfig = computed(() => ({
    algorithm: isDark.value ? theme.darkAlgorithm : theme.defaultAlgorithm,
  }));

  const toggleTheme = () => {
    isDark.value = !isDark.value;
  };

  const setTheme = (dark: boolean) => {
    isDark.value = dark;
  };

  return {
    isDark: readonly(isDark),
    themeConfig,
    toggleTheme,
    setTheme,
  };
};
