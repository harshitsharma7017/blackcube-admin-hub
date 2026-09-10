import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ListRecordsQuery, RecordInput } from "@/types/record";
import {
  commitImport,
  deleteRecord,
  getSummary,
  listRecords,
  updateRecord,
} from "@/services/records-service";

export const recordKeys = {
  root: ["records"] as const,
  list: (query: ListRecordsQuery) => ["records", "list", query] as const,
  summary: ["records", "summary"] as const,
};

export const recordsQuery = (query: ListRecordsQuery) =>
  queryOptions({
    queryKey: recordKeys.list(query),
    queryFn: () => listRecords(query),
    staleTime: 10_000,
  });

export const summaryQuery = () =>
  queryOptions({
    queryKey: recordKeys.summary,
    queryFn: () => getSummary(),
    staleTime: 10_000,
  });

export function useInvalidateRecords() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: recordKeys.root });
}

export function useUpdateRecord() {
  const invalidate = useInvalidateRecords();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: RecordInput }) => updateRecord(id, input),
    onSuccess: () => invalidate(),
  });
}

export function useDeleteRecord() {
  const invalidate = useInvalidateRecords();
  return useMutation({
    mutationFn: (id: string) => deleteRecord(id),
    onSuccess: () => invalidate(),
  });
}

export function useCommitImport() {
  const invalidate = useInvalidateRecords();
  return useMutation({
    mutationFn: (rows: RecordInput[]) => commitImport(rows),
    onSuccess: () => invalidate(),
  });
}
