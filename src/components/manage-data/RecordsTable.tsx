import { Link } from "@tanstack/react-router";
import { AlertCircle, Inbox, Pencil, SearchX, Trash2, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { DataRecord } from "@/types/record";
import { DownloadStatusBadge, LinkStatusBadge } from "./StatusBadge";

const COLUMNS = [
  "Select",
  "S.N.",
  "Name",
  "Email",
  "Phone",
  "Address",
  "Organisation",
  "Type",
  "Link Status",
  "Download Status",
  "Added On",
  "Action",
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

interface RecordsTableProps {
  records: DataRecord[];
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string | undefined;
  onRetry: () => void;
  startIndex: number;
  selected: Set<string>;
  onToggle: (id: string) => void;
  onToggleAll: () => void;
  onEdit: (record: DataRecord) => void;
  onDelete: (record: DataRecord) => void;
  hasFilters: boolean;
  onResetFilters: () => void;
}

function StateBlock({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Inbox;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <h3 className="text-base font-semibold">{title}</h3>
      <div className="max-w-sm text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

export function RecordsTable(props: RecordsTableProps) {
  const {
    records,
    isLoading,
    isError,
    errorMessage,
    onRetry,
    startIndex,
    selected,
    onToggle,
    onToggleAll,
    onEdit,
    onDelete,
    hasFilters,
    onResetFilters,
  } = props;

  const allSelected = records.length > 0 && records.every((r) => selected.has(r.id));

  if (isError) {
    return (
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <StateBlock icon={AlertCircle} title="We couldn't load your records">
          <p>{errorMessage ?? "The request failed. Please try again."}</p>
          <Button className="mt-4" onClick={onRetry}>
            Try again
          </Button>
        </StateBlock>
      </div>
    );
  }

  if (!isLoading && records.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card shadow-sm">
        {hasFilters ? (
          <StateBlock icon={SearchX} title="No records match your filters">
            <p>Try a different search term, or clear the filters to see everything again.</p>
            <Button variant="outline" className="mt-4" onClick={onResetFilters}>
              Reset filters
            </Button>
          </StateBlock>
        ) : (
          <StateBlock icon={Inbox} title="No records yet">
            <p>Import an Excel or CSV file to populate the database with records.</p>
            <Button asChild className="mt-4">
              <Link to="/upload-excel">
                <UploadCloud className="size-4" aria-hidden="true" />
                Upload Excel
              </Link>
            </Button>
          </StateBlock>
        )}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="w-full overflow-x-auto">
        <Table>
          <caption className="sr-only">Imported records with update and delete actions</caption>
          <TableHeader>
            <TableRow className="bg-muted/60">
              <TableHead className="w-10">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={onToggleAll}
                  aria-label="Select all records on this page"
                  disabled={isLoading || records.length === 0}
                />
              </TableHead>
              {COLUMNS.slice(1).map((c) => (
                <TableHead
                  key={c}
                  className="whitespace-nowrap text-xs font-semibold uppercase tracking-wide"
                >
                  {c}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: 8 }, (_, i) => (
                  <TableRow key={`skeleton-${i}`}>
                    {COLUMNS.map((c) => (
                      <TableCell key={c}>
                        <Skeleton className="h-5 w-full min-w-14" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : records.map((record, index) => (
                  <TableRow
                    key={record.id}
                    data-state={selected.has(record.id) ? "selected" : undefined}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selected.has(record.id)}
                        onCheckedChange={() => onToggle(record.id)}
                        aria-label={`Select ${record.name}`}
                      />
                    </TableCell>
                    <TableCell className="tabular-nums text-muted-foreground">
                      {startIndex + index + 1}
                    </TableCell>
                    <TableCell className="font-medium whitespace-nowrap">{record.name}</TableCell>
                    <TableCell className="max-w-52 truncate">{record.email}</TableCell>
                    <TableCell className="whitespace-nowrap tabular-nums">{record.phone}</TableCell>
                    <TableCell className="max-w-56 truncate text-muted-foreground">
                      {record.address || "—"}
                    </TableCell>
                    <TableCell className="max-w-44 truncate">
                      {record.organisation || "—"}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{record.type}</TableCell>
                    <TableCell>
                      <LinkStatusBadge status={record.linkStatus} />
                    </TableCell>
                    <TableCell>
                      <DownloadStatusBadge status={record.downloadStatus} />
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      {formatDate(record.createdAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(record)}
                          aria-label={`Update ${record.name}`}
                        >
                          <Pencil className="size-4" aria-hidden="true" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(record)}
                          aria-label={`Delete ${record.name}`}
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="size-4" aria-hidden="true" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
