import { redirect } from "@tanstack/react-router";
import { authKeys } from "@/features/auth/queries";
import { getMe } from "@/services/auth-service";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Database,
  GraduationCap,
  Building2,
  Users,
  Briefcase,
  UserCheck,
  UploadCloud,
  UserPlus,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { summaryQuery, recordsQuery } from "@/features/manage-data/queries";

export const Route = createFileRoute("/")({
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
  head: () => ({
    meta: [
      { title: "Dashboard — BlackCube Admin Panel" },
      {
        name: "description",
        content: "Database-backed summary dashboard for the BlackCube admin panel.",
      },
      { property: "og:title", content: "Dashboard — BlackCube Admin Panel" },
      {
        property: "og:description",
        content: "Database-backed summary dashboard for the BlackCube admin panel.",
      },
    ],
  }),
  component: DashboardPage,
});

const SUMMARY_CARDS = [
  { key: "all", label: "All Data", icon: Database, color: "text-primary" },
  { key: "students", label: "Students", icon: GraduationCap, color: "text-chart-1" },
  { key: "teachers", label: "Teachers", icon: Users, color: "text-chart-2" },
  { key: "institutes", label: "Institutes", icon: Building2, color: "text-chart-4" },
  { key: "mentors", label: "Mentors", icon: UserCheck, color: "text-chart-3" },
  { key: "jobSeekers", label: "Job Seekers", icon: Briefcase, color: "text-chart-5" },
  { key: "others", label: "Others", icon: UserPlus, color: "text-muted-foreground" },
] as const;

function DashboardPage() {
  const summary = useQuery(summaryQuery());
  const recent = useQuery(recordsQuery({ page: 1, pageSize: 5 }));

  return (
    <AppShell title="Dashboard" description="Overview of your imported records and quick actions.">
      <div className="flex flex-col gap-8">
        {/* Summary cards — all types from the data layer */}
        <section aria-label="Record summary">
          <h2 className="mb-4 text-lg font-semibold">Summary</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SUMMARY_CARDS.map((card) => (
              <Card key={card.key} className="border-border/70 shadow-sm">
                <CardContent className="flex items-center gap-4 p-5">
                  <span
                    className={`flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent ${card.color}`}
                  >
                    <card.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
                    {summary.isPending || !summary.data ? (
                      <Skeleton className="mt-1.5 h-7 w-14" />
                    ) : (
                      <p className="font-display text-2xl font-semibold tabular-nums">
                        {summary.data[card.key].toLocaleString()}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick actions */}
        <section aria-label="Quick actions">
          <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="border-border/70 shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="flex flex-col gap-3 p-5">
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Database className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold">Manage Data</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Search, filter, update and delete imported records.
                  </p>
                </div>
                <Button variant="outline" size="sm" className="mt-auto w-fit" asChild>
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
                    Open
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/70 shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="flex flex-col gap-3 p-5">
                <span className="flex size-10 items-center justify-center rounded-lg bg-success/10 text-success">
                  <UploadCloud className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold">Upload Excel</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Import records from an Excel or CSV spreadsheet.
                  </p>
                </div>
                <Button variant="outline" size="sm" className="mt-auto w-fit" asChild>
                  <Link to="/upload-excel">
                    Import
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-dashed border-border/70 shadow-sm">
              <CardContent className="flex flex-col items-center justify-center gap-2 p-5 text-center">
                <p className="text-sm font-medium text-muted-foreground">
                  Social &amp; Ads campaigns
                </p>
                <p className="text-xs text-muted-foreground">Coming soon</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Recent records */}
        <section aria-label="Recent records">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Records</h2>
            <Button variant="link" size="sm" className="text-primary" asChild>
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
                View all
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <Card className="overflow-hidden border-border/70 shadow-sm">
            <CardContent className="p-0">
              {recent.isPending ? (
                <div className="space-y-3 p-5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div key={`skeleton-${i}`} className="flex items-center gap-4">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="hidden h-5 w-44 sm:block" />
                      <Skeleton className="hidden h-5 w-28 md:block" />
                      <Skeleton className="ml-auto h-5 w-20" />
                    </div>
                  ))}
                </div>
              ) : !recent.data || recent.data.items.length === 0 ? (
                <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
                  <Database className="size-10 text-muted-foreground/50" aria-hidden="true" />
                  <p className="text-sm font-medium text-muted-foreground">No records yet</p>
                  <p className="text-sm text-muted-foreground">
                    Upload a spreadsheet to get started.
                  </p>
                  <Button className="mt-2" asChild>
                    <Link to="/upload-excel">
                      <UploadCloud className="size-4" aria-hidden="true" />
                      Upload Excel
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/60 text-left">
                        <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Name
                        </th>
                        <th className="hidden whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:table-cell">
                          Email
                        </th>
                        <th className="hidden whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground md:table-cell">
                          Phone
                        </th>
                        <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Type
                        </th>
                        <th className="whitespace-nowrap px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Added
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recent.data.items.map((record) => (
                        <tr
                          key={record.id}
                          className="border-b last:border-0 transition-colors hover:bg-muted/30"
                        >
                          <td className="whitespace-nowrap px-4 py-3 font-medium">{record.name}</td>
                          <td className="hidden max-w-48 truncate px-4 py-3 text-muted-foreground sm:table-cell">
                            {record.email}
                          </td>
                          <td className="hidden whitespace-nowrap px-4 py-3 tabular-nums text-muted-foreground md:table-cell">
                            {record.phone}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3">{record.type}</td>
                          <td className="whitespace-nowrap px-4 py-3 text-right text-muted-foreground">
                            {new Date(record.createdAt).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
