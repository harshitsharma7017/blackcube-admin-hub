import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteRecord } from "@/features/manage-data/queries";
import { toApiMessage } from "@/services/http";
import type { DataRecord } from "@/types/record";

export function DeleteRecordDialog({
  record,
  onOpenChange,
}: {
  record: DataRecord | null;
  onOpenChange: (open: boolean) => void;
}) {
  const mutation = useDeleteRecord();

  const confirm = async () => {
    if (!record) return;
    try {
      await mutation.mutateAsync(record.id);
      toast.success(`${record.name} was deleted`);
      onOpenChange(false);
    } catch (error) {
      toast.error(toApiMessage(error, "The record could not be deleted"));
    }
  };

  return (
    <AlertDialog open={Boolean(record)} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this record?</AlertDialogTitle>
          <AlertDialogDescription>
            {record ? (
              <>
                <span className="font-medium text-foreground">{record.name}</span> ({record.email})
                will be permanently removed from the database. This cannot be undone.
              </>
            ) : null}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={mutation.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(event) => {
              event.preventDefault();
              void confirm();
            }}
            disabled={mutation.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Deleting…
              </>
            ) : (
              "Delete record"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
