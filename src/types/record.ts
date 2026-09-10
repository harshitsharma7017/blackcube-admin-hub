import { z } from "zod";

export const RECORD_TYPES = [
  "Student",
  "Teacher",
  "Mentor",
  "Job Seeker",
  "Institute",
  "Other",
] as const;
export type RecordType = (typeof RECORD_TYPES)[number];

export const LINK_STATUSES = ["Sent", "Pending", "Failed"] as const;
export type LinkStatus = (typeof LINK_STATUSES)[number];

export const DOWNLOAD_STATUSES = ["Downloaded", "Not Downloaded"] as const;
export type DownloadStatus = (typeof DOWNLOAD_STATUSES)[number];

export const CATEGORY_TABS = [
  { key: "all", label: "All Data", type: null },
  { key: "students", label: "Students", type: "Student" },
  { key: "teachers", label: "Teachers", type: "Teacher" },
  { key: "mentors", label: "Mentors", type: "Mentor" },
  { key: "job-seekers", label: "Job Seekers", type: "Job Seeker" },
  { key: "institutes", label: "Institutes", type: "Institute" },
  { key: "others", label: "Others", type: "Other" },
] as const;
export type CategoryKey = (typeof CATEGORY_TABS)[number]["key"];

/** Canonical persisted record (mirrors the future Mongoose document). */
export interface DataRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  organisation: string;
  type: RecordType;
  linkStatus: LinkStatus;
  downloadStatus: DownloadStatus;
  createdAt: string; // ISO
}

export const recordInputSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(7, "Phone must be at least 7 digits")
    .regex(/^[0-9+\-()\s]+$/, "Phone may only contain digits and + - ( )"),
  address: z.string().trim().max(160, "Address is too long").default(""),
  organisation: z.string().trim().max(120, "Organisation is too long").default(""),
  type: z.enum(RECORD_TYPES),
  linkStatus: z.enum(LINK_STATUSES),
  downloadStatus: z.enum(DOWNLOAD_STATUSES),
});
export type RecordInput = z.infer<typeof recordInputSchema>;

export interface ListRecordsQuery {
  page: number;
  pageSize: number;
  search?: string;
  type?: RecordType | null;
  linkStatus?: LinkStatus | "all";
  downloadStatus?: DownloadStatus | "all";
  dateAdded?: "all" | "today" | "7d" | "30d";
  sortBy?: SortableField;
  sortOrder?: "asc" | "desc";
}

export type SortableField =
  | "name"
  | "email"
  | "phoneNumber"
  | "address"
  | "organisation"
  | "type"
  | "linkStatus"
  | "downloadStatus"
  | "dateAdded";

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface SummaryCounts {
  all: number;
  students: number;
  teachers: number;
  institutes: number;
  mentors: number;
  jobSeekers: number;
  others: number;
}

/** ---- Import contracts ---- */
export const CANONICAL_FIELDS = [
  { key: "name", label: "Name", required: true },
  { key: "email", label: "Email", required: true },
  { key: "phone", label: "Phone", required: true },
  { key: "address", label: "Address", required: false },
  { key: "organisation", label: "Organisation", required: false },
  { key: "type", label: "Type", required: false },
] as const;
export type CanonicalField = (typeof CANONICAL_FIELDS)[number]["key"];

export type HeaderMapping = Partial<Record<CanonicalField, string>>;

export interface ParsedFile {
  fileName: string;
  headers: string[];
  rows: Record<string, string>[];
  suggestedMapping: HeaderMapping;
}

export interface RowError {
  rowNumber: number;
  field: string;
  message: string;
}

export interface ValidationResult {
  validRows: RecordInput[];
  errors: RowError[];
  totalRows: number;
}

export interface ImportResult {
  inserted: number;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}
