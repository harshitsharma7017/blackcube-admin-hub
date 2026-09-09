import { RotateCcw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DOWNLOAD_STATUSES, LINK_STATUSES } from "@/types/record";

export interface FiltersValue {
  q: string;
  link: string;
  download: string;
  date: string;
}

export function FiltersToolbar({
  value,
  onChange,
  onReset,
  hasActiveFilters,
}: {
  value: FiltersValue;
  onChange: (patch: Partial<FiltersValue>) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}) {
  return (
    <section
      aria-label="Search and filters"
      className="rounded-xl border border-border bg-card p-4 shadow-sm"
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))_auto] lg:items-end">
        <div className="grid gap-2">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="search"
              type="search"
              value={value.q}
              placeholder="Name, email or phone"
              onChange={(e) => onChange({ q: e.target.value })}
              className="pl-9"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="link-status">Link status</Label>
          <Select value={value.link} onValueChange={(v) => onChange({ link: v })}>
            <SelectTrigger id="link-status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All link statuses</SelectItem>
              {LINK_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="download-status">Download status</Label>
          <Select value={value.download} onValueChange={(v) => onChange({ download: v })}>
            <SelectTrigger id="download-status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All download statuses</SelectItem>
              {DOWNLOAD_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="date-added">Date added</Label>
          <Select value={value.date} onValueChange={(v) => onChange({ date: v })}>
            <SelectTrigger id="date-added">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any time</SelectItem>
              <SelectItem value="today">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          disabled={!hasActiveFilters}
          className="w-full lg:w-auto"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          Reset
        </Button>
      </div>
    </section>
  );
}
