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
import { useBulkDeleteRecords } from "@/features/manage-data/queries";
import { toApiMessage } from "@/services/http";

export function BulkDeleteDialog({
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
  const mutation = useBulkDeleteRecords();
  const count = selectedIds.size;

  const confirm = async () => {
    if (count === 0) return;
    try {
      await mutation.mutateAsync(Array.from(selectedIds));
      toast.success(`${count} record${count === 1 ? "" : "s"} deleted`);
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast.error(toApiMessage(error, "The records could not be deleted"));
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete {count} selected record{count === 1 ? "" : "s"}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            These records will be permanently removed from the database. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={mutation.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(event) => {
              event.preventDefault();
              void confirm();
            }}
            disabled={mutation.isPending || count === 0}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Deleting…
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
