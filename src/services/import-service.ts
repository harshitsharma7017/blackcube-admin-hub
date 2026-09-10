import * as XLSX from "xlsx";
import {
  ApiError,
  CANONICAL_FIELDS,
  DOWNLOAD_STATUSES,
  LINK_STATUSES,
  RECORD_TYPES,
  type CanonicalField,
  type HeaderMapping,
  type ParsedFile,
  type RecordInput,
  type RowError,
  type ValidationResult,
  recordInputSchema,
} from "@/types/record";

export const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ALLOWED_EXTENSIONS = ["xlsx", "xls", "csv"];

export function validateFile(file: File): string | null {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return `“${file.name}” is not supported. Upload an .xlsx, .xls or .csv file.`;
  }
  if (file.size > MAX_FILE_BYTES) {
    return `“${file.name}” is ${(file.size / 1024 / 1024).toFixed(1)} MB. The limit is 5 MB.`;
  }
  if (file.size === 0) return `“${file.name}” is empty.`;
  return null;
}

const normalise = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

const SYNONYMS: Record<CanonicalField, string[]> = {
  name: ["name", "fullname", "studentname", "contactname", "person"],
  email: ["email", "emailaddress", "mail", "emailid"],
  phone: ["phone", "phonenumber", "mobile", "mobileno", "contact", "contactnumber"],
  address: ["address", "location", "city", "fulladdress"],
  organisation: ["organisation", "organization", "company", "institute", "school", "college"],
  type: ["type", "category", "role", "usertype"],
};

function suggestMapping(headers: string[]): HeaderMapping {
  const mapping: HeaderMapping = {};
  for (const field of CANONICAL_FIELDS) {
    const match = headers.find((h) => SYNONYMS[field.key].includes(normalise(h)));
    if (match) mapping[field.key] = match;
  }
  return mapping;
}

/** Parses the workbook/CSV in the browser and returns headers + raw rows. */
export async function parseImportFile(file: File): Promise<ParsedFile> {
  const problem = validateFile(file);
  if (problem) throw new ApiError(problem, 415);

  const buffer = await file.arrayBuffer();
  let workbook: XLSX.WorkBook;
  try {
    workbook = XLSX.read(buffer, { type: "array" });
  } catch {
    throw new ApiError("This file could not be read. It may be corrupted.", 422);
  }

  const sheetName = workbook.SheetNames[0];
  if (!sheetName) throw new ApiError("The file has no worksheets.", 422);

  const matrix = XLSX.utils.sheet_to_json<string[]>(workbook.Sheets[sheetName]!, {
    header: 1,
    blankrows: false,
    defval: "",
    raw: false,
  });
  if (matrix.length < 2) {
    throw new ApiError("The file needs a header row and at least one data row.", 422);
  }

  const headers = (matrix[0] ?? []).map((h) => String(h ?? "").trim()).filter((h) => h.length > 0);
  if (headers.length === 0) throw new ApiError("No column headers were found.", 422);

  const rows = matrix.slice(1).map((row) => {
    const record: Record<string, string> = {};
    headers.forEach((header, i) => {
      record[header] = String(row[i] ?? "").trim();
    });
    return record;
  });

  return { fileName: file.name, headers, rows, suggestedMapping: suggestMapping(headers) };
}

function coerceType(value: string) {
  const v = normalise(value);
  const found = RECORD_TYPES.find((t) => normalise(t) === v);
  if (found) return found;
  if (v.includes("student")) return "Student" as const;
  if (v.includes("teacher")) return "Teacher" as const;
  if (v.includes("mentor")) return "Mentor" as const;
  if (v.includes("job")) return "Job Seeker" as const;
  if (v.includes("institute") || v.includes("school")) return "Institute" as const;
  return "Other" as const;
}

/** Applies the mapping and validates every row, returning previewable rows + errors. */
export function validateRows(parsed: ParsedFile, mapping: HeaderMapping): ValidationResult {
  const validRows: RecordInput[] = [];
  const errors: RowError[] = [];
  const seenEmails = new Set<string>();

  parsed.rows.forEach((row, index) => {
    const rowNumber = index + 2; // +1 header, +1 one-based
    const candidate = {
      name: mapping.name ? (row[mapping.name] ?? "") : "",
      email: mapping.email ? (row[mapping.email] ?? "") : "",
      phone: mapping.phone ? (row[mapping.phone] ?? "") : "",
      address: mapping.address ? (row[mapping.address] ?? "") : "",
      organisation: mapping.organisation ? (row[mapping.organisation] ?? "") : "",
      type: coerceType(mapping.type ? (row[mapping.type] ?? "") : ""),
      linkStatus: LINK_STATUSES[1],
      downloadStatus: DOWNLOAD_STATUSES[1],
    };

    const result = recordInputSchema.safeParse(candidate);
    if (!result.success) {
      for (const issue of result.error.issues) {
        errors.push({
          rowNumber,
          field: String(issue.path[0] ?? "row"),
          message: issue.message,
        });
      }
      return;
    }

    const emailKey = result.data.email.toLowerCase();
    if (seenEmails.has(emailKey)) {
      errors.push({
        rowNumber,
        field: "email",
        message: `Duplicate email in this file (${result.data.email})`,
      });
      return;
    }
    seenEmails.add(emailKey);
    validRows.push(result.data);
  });

  return { validRows, errors, totalRows: parsed.rows.length };
}

export function missingRequiredFields(mapping: HeaderMapping): string[] {
  return CANONICAL_FIELDS.filter((f) => f.required && !mapping[f.key]).map((f) => f.label);
}
