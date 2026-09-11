import axios from "axios";

/**
 * Axios instance pointed at the future Express + Mongoose REST API.
 * The mock service in `records-service.ts` implements the identical contract,
 * so switching over is a per-function body swap — no component changes.
 */
const isServer = typeof window === "undefined";
const defaultBaseUrl = isServer ? "http://localhost:8082/api" : "/api";

export const http = axios.create({
  baseURL: import.meta.env["VITE_API_BASE_URL"] ?? defaultBaseUrl,
  headers: { "Content-Type": "application/json" },
  timeout: 20_000,
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  if (!isServer) {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!isServer && error.response && error.response.status === 401) {
      localStorage.removeItem("auth_token");
      if (window.location.pathname !== "/sign-in") {
        window.location.href = "/sign-in";
      }
    }
    return Promise.reject(error);
  }
);

/** Normalises any transport failure into a readable message. */
export function toApiMessage(error: unknown, fallback = "Something went wrong"): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined;
    return data?.message ?? error.message ?? fallback;
  }
  if (error instanceof Error) return error.message;
  return fallback;
}
