import axios from "axios";

/**
 * Axios instance pointed at the future Express + Mongoose REST API.
 * The mock service in `records-service.ts` implements the identical contract,
 * so switching over is a per-function body swap — no component changes.
 */
export const http = axios.create({
  baseURL: import.meta.env["VITE_API_BASE_URL"] ?? "/api",
  headers: { "Content-Type": "application/json" },
  timeout: 20_000,
});

/** Normalises any transport failure into a readable message. */
export function toApiMessage(error: unknown, fallback = "Something went wrong"): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined;
    return data?.message ?? error.message ?? fallback;
  }
  if (error instanceof Error) return error.message;
  return fallback;
}
