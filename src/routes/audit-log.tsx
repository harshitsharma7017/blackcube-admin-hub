import { redirect } from "@tanstack/react-router";
import { authKeys } from "@/features/auth/queries";
import { getMe } from "@/services/auth-service";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { TablePagination } from "@/components/manage-data/TablePagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { auditLogQuery } from "@/features/manage-data/queries";
import { AlertCircle, FileKey2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchState {
  page: number;
}

export const Route = createFileRoute("/audit-log")({
  beforeLoad: async ({ context: { queryClient } }) => {
    // Skip auth check during SSR — the server cannot access browser HttpOnly cookies.
    // Auth will be verified client-side after hydration.
    if (typeof window === "undefined") return;
    try {
      await queryClient.ensureQueryData({
        queryKey: authKeys.currentUser,
        queryFn: getMe,
      });
    } catch {
      throw redirect({ to: "/sign-in", replace: true });
    }
  },
  validateSearch: (search: Record<string, unknown>): SearchState => ({
    page: Math.max(1, Number(search["page"] ?? 1) || 1),
  }),
  head: () => ({
    meta: [{ title: "Audit Log — BlackCube Admin Panel" }],
  }),
  component: AuditLogPage,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function AuditLogPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const setPage = (page: number) => {
    void navigate({ to: ".", search: { page }, replace: true });
  };

  const listQuery = useQuery(auditLogQuery(search.page, 10));

  const items = listQuery.data?.items ?? [];
  const total = listQuery.data?.total ?? 0;
  const page = listQuery.data?.page ?? search.page;
  const totalPages = listQuery.data?.totalPages ?? 1;
  const startIndex = (page - 1) * 10;

  return (
    <AppShell
      title="Audit Log"
      description="View recent actions and changes made across the application."
    >
      <div className="flex flex-col gap-6">
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/60">
                  <TableHead className="w-12 text-xs font-semibold uppercase tracking-wide">
                    S.N.
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">
                    Date
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">
                    Action
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">
                    Entity
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">
                    Target
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">
                    Details
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listQuery.isPending ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 6 }).map((_, j) => (
                        <TableCell key={"sk-" + i + "-" + j}>
                          <Skeleton className="h-5 w-full min-w-14" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : listQuery.isError ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-10 text-center">
                      <div className="flex flex-col items-center gap-2 text-destructive">
                        <AlertCircle className="size-6" />
                        <p>Failed to load audit logs</p>
                        <Button variant="outline" size="sm" onClick={() => listQuery.refetch()}>
                          Retry
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                      <div className="flex flex-col items-center gap-2">
                        <FileKey2 className="size-6" />
                        <p>No audit logs found.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((item: import("@/types/record").AuditLogEntry, idx: number) => (
                    <TableRow key={item._id}>
                      <TableCell className="tabular-nums text-muted-foreground">
                        {startIndex + idx + 1}
                      </TableCell>
                      <TableCell className="whitespace-nowrap tabular-nums">
                        {formatDate(item.createdAt)}
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-xs tracking-wide uppercase px-2 py-1 rounded bg-muted">
                          {item.action}
                        </span>
                      </TableCell>
                      <TableCell>{item.entityType}</TableCell>
                      <TableCell className="text-muted-foreground tabular-nums max-w-32 truncate">
                        {item.entityId}
                      </TableCell>
                      <TableCell className="max-w-72 truncate text-sm">
                        {item.details ? JSON.stringify(item.details) : "—"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {!listQuery.isPending && !listQuery.isError && items.length > 0 && (
          <TablePagination
            page={page}
            totalPages={totalPages}
            total={total}
            startIndex={startIndex}
            count={items.length}
            onPageChange={setPage}
          />
        )}
      </div>
    </AppShell>
  );
}
