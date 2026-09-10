import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { UploadCloud } from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { BulkDeleteDialog } from "@/components/manage-data/BulkDeleteDialog";
import { BulkUpdateDialog } from "@/components/manage-data/BulkUpdateDialog";
import { DeleteRecordDialog } from "@/components/manage-data/DeleteRecordDialog";
import { EditRecordDialog } from "@/components/manage-data/EditRecordDialog";
import { FiltersToolbar } from "@/components/manage-data/FiltersToolbar";
import { RecordsTable } from "@/components/manage-data/RecordsTable";
import { SummaryCards } from "@/components/manage-data/SummaryCards";
import { TablePagination } from "@/components/manage-data/TablePagination";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { recordsQuery, summaryQuery } from "@/features/manage-data/queries";
import { toApiMessage } from "@/services/http";
import {
  CATEGORY_TABS,
  type CategoryKey,
  type DataRecord,
  type DownloadStatus,
  type LinkStatus,
  type RecordType,
} from "@/types/record";

const PAGE_SIZE = 10;

interface ManageDataSearch {
  tab: CategoryKey;
  q: string;
  link: string;
  download: string;
  date: string;
  page: number;
}

const DEFAULTS: ManageDataSearch = {
  tab: "all",
  q: "",
  link: "all",
  download: "all",
  date: "all",
  page: 1,
};

export const Route = createFileRoute("/manage-data")({
  validateSearch: (search: Record<string, unknown>): ManageDataSearch => {
    const tab = String(search["tab"] ?? "all");
    return {
      tab: (CATEGORY_TABS.some((t) => t.key === tab) ? tab : "all") as CategoryKey,
      q: String(search["q"] ?? ""),
      link: String(search["link"] ?? "all"),
      download: String(search["download"] ?? "all"),
      date: String(search["date"] ?? "all"),
      page: Math.max(1, Number(search["page"] ?? 1) || 1),
    };
  },
  head: () => ({
    meta: [
      { title: "Manage Data — BlackCube Admin Panel" },
      {
        name: "description",
        content:
          "Search, filter, update and delete imported student, teacher and institute records in the BlackCube admin panel.",
      },
      { property: "og:title", content: "Manage Data — BlackCube Admin Panel" },
      {
        property: "og:description",
        content: "Database-backed record management with search, filters, pagination and CRUD.",
      },
    ],
  }),
  component: ManageDataPage,
});

function ManageDataPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [editing, setEditing] = useState<DataRecord | null>(null);
  const [deleting, setDeleting] = useState<DataRecord | null>(null);
  const [bulkUpdating, setBulkUpdating] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);

  const setSearch = (patch: Partial<ManageDataSearch>) => {
    void navigate({
      to: ".",
      search: (prev) => ({ ...prev, ...patch, page: patch.page ?? 1 }),
      replace: true,
    });
  };

  const activeType = useMemo(
    () => CATEGORY_TABS.find((t) => t.key === search.tab)?.type ?? null,
    [search.tab],
  );

  const listQuery = useQuery(
    recordsQuery({
      page: search.page,
      pageSize: PAGE_SIZE,
      search: search.q,
      type: activeType as RecordType | null,
      linkStatus: search.link as LinkStatus | "all",
      downloadStatus: search.download as DownloadStatus | "all",
      dateAdded: search.date as "all" | "today" | "7d" | "30d",
    }),
  );
  const summary = useQuery(summaryQuery());

  const records = listQuery.data?.items ?? [];
  const total = listQuery.data?.total ?? 0;
  const page = listQuery.data?.page ?? search.page;
  const totalPages = listQuery.data?.totalPages ?? 1;
  const startIndex = (page - 1) * PAGE_SIZE;

  const hasFilters =
    search.q !== "" || search.link !== "all" || search.download !== "all" || search.date !== "all";

  const resetFilters = () =>
    setSearch({
      q: DEFAULTS.q,
      link: DEFAULTS.link,
      download: DEFAULTS.download,
      date: DEFAULTS.date,
    });

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleAll = () =>
    setSelected((prev) => {
      const allSelected = records.length > 0 && records.every((r) => prev.has(r.id));
      const next = new Set(prev);
      records.forEach((r) => (allSelected ? next.delete(r.id) : next.add(r.id)));
      return next;
    });

  return (
    <AppShell
      title="Manage Data"
      description="Browse, search and maintain every record imported from your spreadsheets."
      actions={
        <Button asChild>
          <Link to="/upload-excel">
            <UploadCloud className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Upload Excel</span>
          </Link>
        </Button>
      }
    >
      <div className="flex flex-col gap-6">
        <SummaryCards data={summary.data} isLoading={summary.isPending} />

        <Tabs value={search.tab} onValueChange={(v) => setSearch({ tab: v as CategoryKey })}>
          <div className="w-full overflow-x-auto pb-1">
            <TabsList aria-label="Record categories" className="w-max">
              {CATEGORY_TABS.map((tab) => (
                <TabsTrigger key={tab.key} value={tab.key} className="whitespace-nowrap">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>

        <FiltersToolbar
          value={{ q: search.q, link: search.link, download: search.download, date: search.date }}
          onChange={(patch) => setSearch(patch)}
          onReset={resetFilters}
          hasActiveFilters={hasFilters}
        />

        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
          <p aria-live="polite">
            {listQuery.isPending
              ? "Loading records…"
              : `${total} record${total === 1 ? "" : "s"} found`}
          </p>
          {selected.size > 0 ? (
            <div className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
              <span className="font-medium text-foreground">{selected.size} selected</span>
              <Button variant="outline" size="sm" onClick={() => setBulkUpdating(true)}>
                Bulk Update
              </Button>
              <Button variant="destructive" size="sm" onClick={() => setBulkDeleting(true)}>
                Bulk Delete
              </Button>
            </div>
          ) : null}
        </div>

        <RecordsTable
          records={records}
          isLoading={listQuery.isPending}
          isError={listQuery.isError}
          errorMessage={listQuery.error ? toApiMessage(listQuery.error) : undefined}
          onRetry={() => void listQuery.refetch()}
          startIndex={startIndex}
          selected={selected}
          onToggle={toggle}
          onToggleAll={toggleAll}
          onEdit={setEditing}
          onDelete={setDeleting}
          hasFilters={hasFilters}
          onResetFilters={resetFilters}
        />

        <TablePagination
          page={page}
          totalPages={totalPages}
          total={total}
          startIndex={startIndex}
          count={records.length}
          onPageChange={(p) => setSearch({ page: p })}
        />
      </div>

      <EditRecordDialog record={editing} onOpenChange={(open) => !open && setEditing(null)} />
      <DeleteRecordDialog record={deleting} onOpenChange={(open) => !open && setDeleting(null)} />

      <BulkUpdateDialog
        isOpen={bulkUpdating}
        onOpenChange={setBulkUpdating}
        selectedIds={selected}
        onSuccess={() => setSelected(new Set())}
      />

      <BulkDeleteDialog
        isOpen={bulkDeleting}
        onOpenChange={setBulkDeleting}
        selectedIds={selected}
        onSuccess={() => setSelected(new Set())}
      />
    </AppShell>
  );
}
