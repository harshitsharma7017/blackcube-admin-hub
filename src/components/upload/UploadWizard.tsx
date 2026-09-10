import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  FileSpreadsheet,
  Loader2,
  UploadCloud,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCommitImport } from "@/features/manage-data/queries";
import {
  MAX_FILE_BYTES,
  missingRequiredFields,
  parseImportFile,
  validateFile,
  validateRows,
} from "@/services/import-service";
import { toApiMessage } from "@/services/http";
import {
  CANONICAL_FIELDS,
  type HeaderMapping,
  type ParsedFile,
  type ValidationResult,
} from "@/types/record";
import { cn } from "@/lib/utils";

const STEPS = ["Choose file", "Map columns", "Preview", "Done"] as const;
const NONE = "__none__";

function Stepper({ current }: { current: number }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm" aria-label="Import steps">
      {STEPS.map((step, index) => {
        const state = index < current ? "done" : index === current ? "current" : "todo";
        return (
          <li key={step} className="flex items-center gap-2">
            <span
              className={cn(
                "flex size-6 items-center justify-center rounded-full border text-xs font-semibold tabular-nums",
                state === "done" && "border-success bg-success text-success-foreground",
                state === "current" && "border-primary bg-primary text-primary-foreground",
                state === "todo" && "border-border bg-muted text-muted-foreground",
              )}
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <span
              className={cn(
                state === "todo" ? "text-muted-foreground" : "font-medium text-foreground",
              )}
            >
              {step}
              {state === "current" ? <span className="sr-only"> (current step)</span> : null}
            </span>
            {index < STEPS.length - 1 ? (
              <span className="hidden h-px w-8 bg-border sm:block" aria-hidden="true" />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

export function UploadWizard() {
  const [step, setStep] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [parsed, setParsed] = useState<ParsedFile | null>(null);
  const [mapping, setMapping] = useState<HeaderMapping>({});
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [imported, setImported] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const commit = useCommitImport();

  const reset = () => {
    setStep(0);
    setParsed(null);
    setMapping({});
    setValidation(null);
    setFileError(null);
    setImported(0);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleFile = async (file: File) => {
    setFileError(null);
    const problem = validateFile(file);
    if (problem) {
      setFileError(problem);
      return;
    }
    setParsing(true);
    try {
      const result = await parseImportFile(file);
      setParsed(result);
      setMapping(result.suggestedMapping);
      setStep(1);
    } catch (error) {
      setFileError(toApiMessage(error, "This file could not be read"));
    } finally {
      setParsing(false);
    }
  };

  const missing = missingRequiredFields(mapping);

  const goToPreview = () => {
    if (!parsed || missing.length > 0) return;
    setValidation(validateRows(parsed, mapping));
    setStep(2);
  };

  const confirmImport = async () => {
    if (!validation) return;
    try {
      const result = await commit.mutateAsync(validation.validRows);
      setImported(result.inserted);
      setStep(3);
      toast.success(`${result.inserted} records imported`);
    } catch (error) {
      toast.error(toApiMessage(error, "The import could not be completed"));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Stepper current={step} />

      {step === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Upload a spreadsheet</CardTitle>
            <CardDescription>
              Accepted formats: .xlsx, .xls and .csv. Maximum size{" "}
              {(MAX_FILE_BYTES / 1024 / 1024).toFixed(0)} MB. The first row must contain column
              headers.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                const file = e.dataTransfer.files[0];
                if (file) void handleFile(file);
              }}
              className={cn(
                "flex flex-col items-center gap-3 rounded-xl border-2 border-dashed px-6 py-12 text-center transition-colors",
                dragging ? "border-primary bg-accent" : "border-border bg-muted/40",
              )}
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-background text-primary">
                {parsing ? (
                  <Loader2 className="size-6 animate-spin" aria-hidden="true" />
                ) : (
                  <UploadCloud className="size-6" aria-hidden="true" />
                )}
              </span>
              <p className="text-sm font-medium">
                {parsing ? "Reading your file…" : "Drag and drop your file here"}
              </p>
              <p className="text-sm text-muted-foreground">or</p>
              <Button type="button" onClick={() => inputRef.current?.click()} disabled={parsing}>
                Browse files
              </Button>
              <input
                ref={inputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                className="sr-only"
                aria-label="Choose a spreadsheet file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void handleFile(file);
                }}
              />
            </div>

            {fileError ? (
              <p
                role="alert"
                className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
              >
                <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {fileError}
              </p>
            ) : null}
          </CardContent>
        </Card>
      ) : null}

      {step === 1 && parsed ? (
        <Card>
          <CardHeader>
            <CardTitle>Map your columns</CardTitle>
            <CardDescription>
              <span className="inline-flex items-center gap-1.5">
                <FileSpreadsheet className="size-4" aria-hidden="true" />
                {parsed.fileName} · {parsed.rows.length} rows · {parsed.headers.length} columns
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="grid gap-4 sm:grid-cols-2">
              {CANONICAL_FIELDS.map((field) => (
                <div key={field.key} className="grid gap-2">
                  <Label htmlFor={`map-${field.key}`}>
                    {field.label}
                    {field.required ? (
                      <span className="text-destructive" aria-hidden="true">
                        {" "}
                        *
                      </span>
                    ) : (
                      <span className="text-muted-foreground"> (optional)</span>
                    )}
                  </Label>
                  <Select
                    value={mapping[field.key] ?? NONE}
                    onValueChange={(value) =>
                      setMapping((prev) => ({
                        ...prev,
                        [field.key]: value === NONE ? undefined : value,
                      }))
                    }
                  >
                    <SelectTrigger id={`map-${field.key}`}>
                      <SelectValue placeholder="Not mapped" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={NONE}>Not mapped</SelectItem>
                      {parsed.headers.map((header) => (
                        <SelectItem key={header} value={header}>
                          {header}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>

            {missing.length > 0 ? (
              <p
                role="alert"
                className="flex items-start gap-2 rounded-lg border border-warning/40 bg-warning/10 p-3 text-sm"
              >
                <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                Map these required fields before continuing: {missing.join(", ")}.
              </p>
            ) : null}

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={reset}>
                <ArrowLeft className="size-4" aria-hidden="true" />
                Choose another file
              </Button>
              <Button onClick={goToPreview} disabled={missing.length > 0}>
                Validate and preview
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {step === 2 && validation ? (
        <div className="flex flex-col gap-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Rows in file", value: validation.totalRows },
              { label: "Valid rows", value: validation.validRows.length },
              {
                label: "Rows with errors",
                value: validation.totalRows - validation.validRows.length,
              },
            ].map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="font-display text-2xl font-semibold tabular-nums">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {validation.errors.length > 0 ? (
            <Card className="border-destructive/40">
              <CardHeader>
                <CardTitle className="text-base">
                  {validation.errors.length} validation issue
                  {validation.errors.length === 1 ? "" : "s"}
                </CardTitle>
                <CardDescription>
                  These rows will be skipped. Fix them in your spreadsheet and upload again to
                  include them.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="max-h-56 space-y-1.5 overflow-y-auto text-sm">
                  {validation.errors.slice(0, 100).map((error, index) => (
                    <li key={`${error.rowNumber}-${error.field}-${index}`} className="flex gap-2">
                      <span className="font-medium tabular-nums">Row {error.rowNumber}</span>
                      <span className="text-muted-foreground">
                        {error.field}: {error.message}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ) : null}

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Preview of valid rows</CardTitle>
              <CardDescription>Showing the first 10 rows that will be imported.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="w-full overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/60">
                      {["Name", "Email", "Phone", "Address", "Organisation", "Type"].map((h) => (
                        <TableHead key={h} className="whitespace-nowrap">
                          {h}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {validation.validRows.slice(0, 10).map((row, index) => (
                      <TableRow key={`${row.email}-${index}`}>
                        <TableCell className="whitespace-nowrap font-medium">{row.name}</TableCell>
                        <TableCell className="max-w-52 truncate">{row.email}</TableCell>
                        <TableCell className="whitespace-nowrap">{row.phone}</TableCell>
                        <TableCell className="max-w-52 truncate text-muted-foreground">
                          {row.address || "—"}
                        </TableCell>
                        <TableCell className="max-w-44 truncate">
                          {row.organisation || "—"}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{row.type}</TableCell>
                      </TableRow>
                    ))}
                    {validation.validRows.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                          No valid rows to import.
                        </TableCell>
                      </TableRow>
                    ) : null}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => setStep(1)} disabled={commit.isPending}>
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to mapping
            </Button>
            <Button
              onClick={() => void confirmImport()}
              disabled={commit.isPending || validation.validRows.length === 0}
            >
              {commit.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Importing…
                </>
              ) : (
                `Confirm import of ${validation.validRows.length} rows`
              )}
            </Button>
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-success/15 text-success">
              <CheckCircle2 className="size-6" aria-hidden="true" />
            </span>
            <h2 className="text-lg font-semibold">Import complete</h2>
            <p className="text-sm text-muted-foreground">
              {imported} record{imported === 1 ? "" : "s"} were added to the database.
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              <Button asChild>
                <Link
                  to="/manage-data"
                  search={{
                    tab: "all",
                    q: "",
                    link: "all",
                    download: "all",
                    date: "all",
                    page: 1,
                    sort: "",
                    order: "",
                  }}
                >
                  View records
                </Link>
              </Button>
              <Button variant="outline" onClick={reset}>
                Import another file
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
