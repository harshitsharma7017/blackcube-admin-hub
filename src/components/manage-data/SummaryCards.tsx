import { Building2, Database, GraduationCap, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { SummaryCounts } from "@/types/record";

const CARDS = [
  { key: "all", label: "All Data", icon: Database, hint: "Total records in database" },
  { key: "students", label: "Students", icon: GraduationCap, hint: "Type: Student" },
  { key: "teachers", label: "Teachers", icon: Users, hint: "Type: Teacher" },
  { key: "institutes", label: "Institutes", icon: Building2, hint: "Type: Institute" },
] as const;

export function SummaryCards({
  data,
  isLoading,
}: {
  data?: SummaryCounts;
  isLoading: boolean;
}) {
  return (
    <section aria-label="Summary" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {CARDS.map((card) => (
        <Card key={card.key} className="border-border/70 shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <card.icon className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
              {isLoading || !data ? (
                <Skeleton className="mt-1.5 h-7 w-14" />
              ) : (
                <p className="font-display text-2xl font-semibold tabular-nums">
                  {data[card.key].toLocaleString()}
                </p>
              )}
              <p className="sr-only">{card.hint}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
