import { APIResponse } from "@/shared/types";

export const checkAPIResponse = (response?: APIResponse): response is APIResponse => {
  return response && response.data && !response.error;
};
