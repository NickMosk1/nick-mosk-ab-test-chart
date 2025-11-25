export const APP_CONFIG = {
  BASE_PATH: import.meta.env.VITE_APP_BASE_PATH || "/nick-mosk-ab-test-chart",
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
};

if (import.meta.env.DEV) {
  console.log('VITE_APP_BASE_PATH:', import.meta.env.VITE_APP_BASE_PATH);
  console.log('Final BASE_PATH:', APP_CONFIG.BASE_PATH);
};
