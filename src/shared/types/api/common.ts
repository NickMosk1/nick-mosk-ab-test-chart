export type Endpoint = {
  url: string;
  method: HTTPMethods;
};

export enum HTTPMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
};

export type APIResponse<T = any> = { data: T, error?: unknown };
