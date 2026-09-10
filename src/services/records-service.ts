import {
  type DataRecord,
  type ImportResult,
  type ListRecordsQuery,
  type Paginated,
  type RecordInput,
  type SummaryCounts,
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

export async function commitImport(rows: RecordInput[]): Promise<ImportResult> {
  // Convert frontend phone → backend phoneNumber for each row
  const backendRows = rows.map((row) => ({
    name: row.name,
    email: row.email,
    phone: row.phone,
    address: row.address,
    organisation: row.organisation,
    type: row.type,
    linkStatus: row.linkStatus,
    downloadStatus: row.downloadStatus,
  }));

  const res = await http.post("/import", backendRows);
  return res.data.data as ImportResult;
}
