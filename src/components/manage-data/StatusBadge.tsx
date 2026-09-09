import { AlertTriangle, CheckCircle2, Clock, Download, MinusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DownloadStatus, LinkStatus } from "@/types/record";

const base =
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap";

export function LinkStatusBadge({ status }: { status: LinkStatus }) {
  const map = {
    Sent: { cls: "border-success/30 bg-success/10 text-success", Icon: CheckCircle2 },
    Pending: { cls: "border-warning/40 bg-warning/10 text-warning-foreground dark:text-warning", Icon: Clock },
    Failed: { cls: "border-destructive/30 bg-destructive/10 text-destructive", Icon: AlertTriangle },
  } as const;
  const { cls, Icon } = map[status];
  return (
    <span className={cn(base, cls)}>
      <Icon className="size-3.5" aria-hidden="true" />
      {status}
    </span>
  );
}

export function DownloadStatusBadge({ status }: { status: DownloadStatus }) {
  const downloaded = status === "Downloaded";
  return (
    <span
      className={cn(
        base,
        downloaded
          ? "border-info/30 bg-info/10 text-info"
          : "border-border bg-muted text-muted-foreground",
      )}
    >
      {downloaded ? (
        <Download className="size-3.5" aria-hidden="true" />
      ) : (
        <MinusCircle className="size-3.5" aria-hidden="true" />
      )}
      {status}
    </span>
  );
}
