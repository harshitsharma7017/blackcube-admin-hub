import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateRecord } from "@/features/manage-data/queries";
import { toApiMessage } from "@/services/http";
import {
  DOWNLOAD_STATUSES,
  LINK_STATUSES,
  RECORD_TYPES,
  recordInputSchema,
  type DataRecord,
  type RecordInput,
} from "@/types/record";

function FieldError({ id, message }: { id: string; message?: string | undefined }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-xs font-medium text-destructive">
      {message}
    </p>
  );
}

export function EditRecordDialog({
  record,
  onOpenChange,
}: {
  record: DataRecord | null;
  onOpenChange: (open: boolean) => void;
}) {
  const mutation = useUpdateRecord();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RecordInput>({
    resolver: zodResolver(recordInputSchema) as never,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      organisation: "",
      type: "Student",
      linkStatus: "Pending",
      downloadStatus: "Not Downloaded",
    },
  });

  useEffect(() => {
    if (!record) return;
    reset({
      name: record.name,
      email: record.email,
      phone: record.phone,
      address: record.address,
      organisation: record.organisation,
      type: record.type,
      linkStatus: record.linkStatus,
      downloadStatus: record.downloadStatus,
    });
  }, [record, reset]);

  const onSubmit = handleSubmit(async (values: RecordInput) => {
    if (!record) return;
    try {
      await mutation.mutateAsync({ id: record.id, input: values });
      toast.success("Record updated");
      onOpenChange(false);
    } catch (error) {
      toast.error(toApiMessage(error, "The record could not be updated"));
    }
  });

  const type = watch("type");
  const linkStatus = watch("linkStatus");
  const downloadStatus = watch("downloadStatus");

  return (
    <Dialog open={Boolean(record)} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update record</DialogTitle>
          <DialogDescription>
            Changes are saved to the database and only then reflected in the table.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="grid gap-4" noValidate>
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name")}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            <FieldError id="name-error" message={errors.name?.message} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              <FieldError id="email-error" message={errors.email?.message} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                {...register("phone")}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              <FieldError id="phone-error" message={errors.phone?.message} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" {...register("address")} />
            <FieldError id="address-error" message={errors.address?.message} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="organisation">Organisation</Label>
              <Input id="organisation" {...register("organisation")} />
              <FieldError id="organisation-error" message={errors.organisation?.message} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={type}
                onValueChange={(v) => setValue("type", v as RecordInput["type"])}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
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
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="linkStatus">Link status</Label>
              <Select
                value={linkStatus}
                onValueChange={(v) => setValue("linkStatus", v as RecordInput["linkStatus"])}
              >
                <SelectTrigger id="linkStatus">
                  <SelectValue placeholder="Select status" />
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
              <Label htmlFor="downloadStatus">Download status</Label>
              <Select
                value={downloadStatus}
                onValueChange={(v) =>
                  setValue("downloadStatus", v as RecordInput["downloadStatus"])
                }
              >
                <SelectTrigger id="downloadStatus">
                  <SelectValue placeholder="Select status" />
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
          </div>

          <DialogFooter className="mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={mutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Saving…
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
