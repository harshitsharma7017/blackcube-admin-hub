import {
  type DataRecord,
  type ImportResult,
  type ListRecordsQuery,
  type Paginated,
  type RecordInput,
  type SummaryCounts,
  type ImportHistoryEntry,
  type AuditLogEntry,
} from "@/types/record";
import { http } from "./http";

/* ───────────────────────────────────────────────
 * Helpers: map between frontend and backend shapes
 * ─────────────────────────────────────────────── */

/** Backend returns `phoneNumber`; frontend uses `phone`.
 *  Backend returns `dateAdded`; frontend uses `createdAt`. */
function toFrontendRecord(raw: Record<string, unknown>): DataRecord {
  return {
    id: String(raw["id"] ?? raw["_id"] ?? ""),
    name: String(raw["name"] ?? ""),
    email: String(raw["email"] ?? ""),
    phone: String(raw["phoneNumber"] ?? raw["phone"] ?? ""),
    address: String(raw["address"] ?? ""),
    organisation: String(raw["organisation"] ?? ""),
    type: raw["type"] as DataRecord["type"],
    linkStatus: raw["linkStatus"] as DataRecord["linkStatus"],
    downloadStatus: raw["downloadStatus"] as DataRecord["downloadStatus"],
    createdAt: String(raw["dateAdded"] ?? raw["createdAt"] ?? new Date().toISOString()),
  };
}

/** Frontend sends `phone`; backend update schema expects `phoneNumber`. */
function toBackendInput(input: RecordInput): Record<string, unknown> {
  return {
    name: input.name,
    email: input.email,
    phoneNumber: input.phone,
    address: input.address,
    organisation: input.organisation,
    type: input.type,
    linkStatus: input.linkStatus,
    downloadStatus: input.downloadStatus,
  };
}

/** Convert frontend relative date filter to backend ISO dateFrom/dateTo. */
function dateRangeParams(dateAdded?: ListRecordsQuery["dateAdded"]): Record<string, string> {
  if (!dateAdded || dateAdded === "all") return {};
  const now = new Date();
  const to = now.toISOString();
  const days = dateAdded === "today" ? 1 : dateAdded === "7d" ? 7 : 30;
  const from = new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString();
  return { dateFrom: from, dateTo: to };
}

/* ───────────────────────────────────────────────
 * API functions (same signatures as the old mock)
 * ─────────────────────────────────────────────── */

export async function listRecords(query: ListRecordsQuery): Promise<Paginated<DataRecord>> {
  const params: Record<string, string | number> = {
    page: query.page,
    pageSize: query.pageSize,
  };

  if (query.search) params["search"] = query.search;
  if (query.type) params["category"] = query.type;
  if (query.linkStatus && query.linkStatus !== "all") params["linkStatus"] = query.linkStatus;
  if (query.downloadStatus && query.downloadStatus !== "all")
    params["downloadStatus"] = query.downloadStatus;

  const dateParams = dateRangeParams(query.dateAdded);
  Object.assign(params, dateParams);

  if (query.sortBy) params["sortBy"] = query.sortBy;
  if (query.sortOrder) params["sortOrder"] = query.sortOrder;

  const res = await http.get("/records", { params });

  const items: DataRecord[] = (res.data.data as Record<string, unknown>[]).map(toFrontendRecord);
  const meta = res.data.meta as {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };

  return {
    items,
    total: meta.total,
    page: meta.page,
    pageSize: meta.pageSize,
    totalPages: meta.totalPages,
  };
}

export async function exportRecords(
  query: ListRecordsQuery,
  format: "csv" | "xlsx",
): Promise<void> {
  const params: Record<string, string | number> = {
    format,
  };

  if (query.search) params["search"] = query.search;
  if (query.type) params["category"] = query.type;
  if (query.linkStatus && query.linkStatus !== "all") params["linkStatus"] = query.linkStatus;
  if (query.downloadStatus && query.downloadStatus !== "all")
    params["downloadStatus"] = query.downloadStatus;

  const dateParams = dateRangeParams(query.dateAdded);
  Object.assign(params, dateParams);

  if (query.sortBy) params["sortBy"] = query.sortBy;
  if (query.sortOrder) params["sortOrder"] = query.sortOrder;

  const res = await http.get("/records/export", { params, responseType: "blob" });

  if (res.data.type === "application/json") {
    const text = await res.data.text();
    const json = JSON.parse(text);
    throw new Error(json.error?.message || "Export failed");
  }

  const blob = new Blob([res.data], { type: String(res.headers["content-type"] || "") });
  const url = window.URL.createObjectURL(blob);

  let fileName = `export-${new Date().toISOString().split("T")[0]}.${format}`;
  const dispositionRaw = res.headers["content-disposition"];
  const disposition = dispositionRaw ? String(dispositionRaw) : "";
  if (disposition && disposition.indexOf("attachment") !== -1) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(disposition);
    if (matches != null && matches[1]) {
      fileName = matches[1].replace(/['"]/g, "");
    }
  }

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }, 100);
}

export async function getSummary(): Promise<SummaryCounts> {
  const res = await http.get("/summary");
  return res.data.data as SummaryCounts;
}

export async function updateRecord(id: string, input: RecordInput): Promise<DataRecord> {
  const res = await http.patch(`/records/${id}`, toBackendInput(input));
  return toFrontendRecord(res.data.data as Record<string, unknown>);
}

export async function deleteRecord(id: string): Promise<{ id: string }> {
  await http.delete(`/records/${id}`);
  return { id };
}

export async function bulkDeleteRecords(ids: string[]): Promise<{ deletedCount: number }> {
  const res = await http.delete("/records/bulk", { data: { ids } });
  return res.data.data as { deletedCount: number };
}

export async function bulkUpdateRecords(
  ids: string[],
  updates: Partial<RecordInput>,
): Promise<{ modifiedCount: number }> {
  const backendUpdates: Record<string, unknown> = {};
  if (updates.type !== undefined) backendUpdates["type"] = updates.type;
  if (updates.linkStatus !== undefined) backendUpdates["linkStatus"] = updates.linkStatus;
  if (updates.downloadStatus !== undefined)
    backendUpdates["downloadStatus"] = updates.downloadStatus;

  const res = await http.patch("/records/bulk", { ids, updates: backendUpdates });
  return res.data.data as { modifiedCount: number };
}

export async function commitImport(data: {
  fileName: string;
  totalRows: number;
  validRows: RecordInput[];
}): Promise<ImportResult> {
  const backendRows = data.validRows.map((row) => ({
    name: row.name,
    email: row.email,
    phone: row.phone,
    address: row.address,
    organisation: row.organisation,
    type: row.type,
    linkStatus: row.linkStatus,
    downloadStatus: row.downloadStatus,
  }));

  const res = await http.post("/import", {
    fileName: data.fileName,
    totalRows: data.totalRows,
    validRows: backendRows,
  });
  return res.data.data as ImportResult;
}

export async function getImportHistory(
  page: number,
  pageSize: number,
): Promise<Paginated<ImportHistoryEntry>> {
  const res = await http.get("/import-history", { params: { page, pageSize } });
  return {
    items: res.data.data,
    total: res.data.meta.total,
    page: res.data.meta.page,
    pageSize: res.data.meta.pageSize,
    totalPages: res.data.meta.totalPages,
  };
}

export async function getAuditLogs(
  page: number,
  pageSize: number,
): Promise<Paginated<AuditLogEntry>> {
  const res = await http.get("/audit-log", { params: { page, pageSize } });
  return {
    items: res.data.data,
    total: res.data.meta.total,
    page: res.data.meta.page,
    pageSize: res.data.meta.pageSize,
    totalPages: res.data.meta.totalPages,
  };
}
