import {
  ApiError,
  type DataRecord,
  type ImportResult,
  type ListRecordsQuery,
  type Paginated,
  type RecordInput,
  type SummaryCounts,
  recordInputSchema,
} from "@/types/record";
import { newId, readAll, writeAll } from "./mock-store";

/**
 * Mock implementation of the Manage Data REST contract.
 * Every function is async, server-shaped (query in / DTO out) and mirrors the
 * endpoints the Express + Mongoose API will expose:
 *   GET    /records            -> listRecords
 *   GET    /records/summary    -> getSummary
 *   PATCH  /records/:id        -> updateRecord
 *   DELETE /records/:id        -> deleteRecord
 *   POST   /import/commit      -> commitImport
 */

const latency = (ms = 260) => new Promise((r) => setTimeout(r, ms));

function withinDate(iso: string, range: ListRecordsQuery["dateAdded"]) {
  if (!range || range === "all") return true;
  const days = range === "today" ? 1 : range === "7d" ? 7 : 30;
  return Date.now() - new Date(iso).getTime() <= days * 24 * 60 * 60 * 1000;
}

export async function listRecords(query: ListRecordsQuery): Promise<Paginated<DataRecord>> {
  await latency();
  const search = query.search?.trim().toLowerCase() ?? "";
  const filtered = readAll()
    .filter((r) => (query.type ? r.type === query.type : true))
    .filter((r) =>
      search
        ? r.name.toLowerCase().includes(search) ||
          r.email.toLowerCase().includes(search) ||
          r.phone.toLowerCase().includes(search)
        : true,
    )
    .filter((r) =>
      query.linkStatus && query.linkStatus !== "all" ? r.linkStatus === query.linkStatus : true,
    )
    .filter((r) =>
      query.downloadStatus && query.downloadStatus !== "all"
        ? r.downloadStatus === query.downloadStatus
        : true,
    )
    .filter((r) => withinDate(r.createdAt, query.dateAdded))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const pageSize = Math.max(1, query.pageSize);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const page = Math.min(Math.max(1, query.page), totalPages);
  const start = (page - 1) * pageSize;

  return {
    items: filtered.slice(start, start + pageSize),
    total: filtered.length,
    page,
    pageSize,
    totalPages,
  };
}

export async function getSummary(): Promise<SummaryCounts> {
  await latency(180);
  const all = readAll();
  const count = (t: string) => all.filter((r) => r.type === t).length;
  return {
    all: all.length,
    students: count("Student"),
    teachers: count("Teacher"),
    institutes: count("Institute"),
    mentors: count("Mentor"),
    jobSeekers: count("Job Seeker"),
    others: count("Other"),
  };
}

export async function updateRecord(id: string, input: RecordInput): Promise<DataRecord> {
  await latency(420);
  const parsed = recordInputSchema.safeParse(input);
  if (!parsed.success) {
    throw new ApiError(parsed.error.issues[0]?.message ?? "Validation failed", 422);
  }
  const all = readAll();
  const index = all.findIndex((r) => r.id === id);
  if (index === -1) throw new ApiError("Record no longer exists", 404);
  const updated: DataRecord = { ...all[index]!, ...parsed.data };
  const next = [...all];
  next[index] = updated;
  writeAll(next);
  return updated;
}

export async function deleteRecord(id: string): Promise<{ id: string }> {
  await latency(380);
  const all = readAll();
  if (!all.some((r) => r.id === id)) throw new ApiError("Record no longer exists", 404);
  writeAll(all.filter((r) => r.id !== id));
  return { id };
}

export async function commitImport(rows: RecordInput[]): Promise<ImportResult> {
  await latency(700);
  if (rows.length === 0) throw new ApiError("There are no valid rows to import", 422);
  const createdAt = new Date().toISOString();
  const inserted: DataRecord[] = rows.map((row) => ({
    id: newId(),
    ...recordInputSchema.parse(row),
    createdAt,
  }));
  writeAll([...inserted, ...readAll()]);
  return { inserted: inserted.length };
}
