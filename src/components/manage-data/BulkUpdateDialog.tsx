import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBulkUpdateRecords } from "@/features/manage-data/queries";
import { toApiMessage } from "@/services/http";
import { DOWNLOAD_STATUSES, LINK_STATUSES, RECORD_TYPES, type RecordInput } from "@/types/record";

export function BulkUpdateDialog({
  selectedIds,
  isOpen,
  onOpenChange,
  onSuccess,
}: {
  selectedIds: Set<string>;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}) {
  const mutation = useBulkUpdateRecords();
  const count = selectedIds.size;

  const [type, setType] = useState<RecordInput["type"] | "">("");
  const [linkStatus, setLinkStatus] = useState<RecordInput["linkStatus"] | "">("");
  const [downloadStatus, setDownloadStatus] = useState<RecordInput["downloadStatus"] | "">("");

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setType("");
      setLinkStatus("");
      setDownloadStatus("");
    }
    onOpenChange(open);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (count === 0) return;

    const updates: Partial<RecordInput> = {};
    if (type !== "") updates.type = type;
    if (linkStatus !== "") updates.linkStatus = linkStatus;
    if (downloadStatus !== "") updates.downloadStatus = downloadStatus;

    if (Object.keys(updates).length === 0) {
      toast.error("Please select at least one field to update");
      return;
    }

    try {
      await mutation.mutateAsync({ ids: Array.from(selectedIds), updates });
      toast.success(`${count} record${count === 1 ? "" : "s"} updated successfully`);
      onSuccess();
      handleOpenChange(false);
    } catch (error) {
      toast.error(toApiMessage(error, "The records could not be updated"));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Update {count} selected record{count === 1 ? "" : "s"}
          </DialogTitle>
          <DialogDescription>
            Only the fields you select below will be modified. Unselected fields will remain
            unchanged for all selected records.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="grid gap-4 mt-2">
          <div className="grid gap-2">
            <Label htmlFor="bulk-type">Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as RecordInput["type"])}>
              <SelectTrigger id="bulk-type">
                <SelectValue placeholder="Unchanged" />
              </SelectTrigger>
              <SelectContent>
                {RECORD_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="bulk-linkStatus">Link status</Label>
            <Select
              value={linkStatus}
              onValueChange={(v) => setLinkStatus(v as RecordInput["linkStatus"])}
            >
              <SelectTrigger id="bulk-linkStatus">
                <SelectValue placeholder="Unchanged" />
              </SelectTrigger>
              <SelectContent>
                {LINK_STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="bulk-downloadStatus">Download status</Label>
            <Select
              value={downloadStatus}
              onValueChange={(v) => setDownloadStatus(v as RecordInput["downloadStatus"])}
            >
              <SelectTrigger id="bulk-downloadStatus">
                <SelectValue placeholder="Unchanged" />
              </SelectTrigger>
              <SelectContent>
                {DOWNLOAD_STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={mutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending || count === 0}>
              {mutation.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Updating…
                </>
              ) : (
                "Update records"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
