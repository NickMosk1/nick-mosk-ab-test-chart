import { APP_CONFIG } from "@/shared/config/app-config";

export const getPageUrl = (pathname: string, title?: string) => {
  return pathname === `${APP_CONFIG.BASE_PATH}/` ? "Home" : title?.length ? title : "Page Not Found";
};
