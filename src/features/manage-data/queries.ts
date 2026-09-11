import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ListRecordsQuery, RecordInput } from "@/types/record";
import {
  commitImport,
  deleteRecord,
  getSummary,
  listRecords,
  updateRecord,
  bulkDeleteRecords,
  bulkUpdateRecords,
  getImportHistory,
  getAuditLogs,
  exportRecords,
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
  const invalidateAudit = useInvalidateAuditLog();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: RecordInput }) => updateRecord(id, input),
    onSuccess: () => {
      invalidate();
      invalidateAudit();
    },
  });
}

export function useDeleteRecord() {
  const invalidate = useInvalidateRecords();
  const invalidateAudit = useInvalidateAuditLog();
  return useMutation({
    mutationFn: (id: string) => deleteRecord(id),
    onSuccess: () => {
      invalidate();
      invalidateAudit();
    },
  });
}

export function useCommitImport() {
  const invalidate = useInvalidateRecords();
  const invalidateHistory = useInvalidateImportHistory();
  const invalidateAudit = useInvalidateAuditLog();
  return useMutation({
    mutationFn: (data: { fileName: string; totalRows: number; validRows: RecordInput[] }) =>
      commitImport(data),
    onSuccess: () => {
      invalidate();
      invalidateHistory();
      invalidateAudit();
    },
  });
}

export function useBulkDeleteRecords() {
  const invalidate = useInvalidateRecords();
  const invalidateAudit = useInvalidateAuditLog();
  return useMutation({
    mutationFn: (ids: string[]) => bulkDeleteRecords(ids),
    onSuccess: () => {
      invalidate();
      invalidateAudit();
    },
  });
}

export function useBulkUpdateRecords() {
  const invalidate = useInvalidateRecords();
  const invalidateAudit = useInvalidateAuditLog();
  return useMutation({
    mutationFn: ({ ids, updates }: { ids: string[]; updates: Partial<RecordInput> }) =>
      bulkUpdateRecords(ids, updates),
    onSuccess: () => {
      invalidate();
      invalidateAudit();
    },
  });
}

export function useExportRecords() {
  const invalidateAudit = useInvalidateAuditLog();
  return useMutation({
    mutationFn: ({ query, format }: { query: ListRecordsQuery; format: "csv" | "xlsx" }) =>
      exportRecords(query, format),
    onSuccess: () => {
      invalidateAudit();
    },
  });
}

export const historyKeys = {
  importHistory: (page: number) => ["importHistory", page] as const,
  auditLog: (page: number) => ["auditLog", page] as const,
};

export const importHistoryQuery = (page: number, pageSize: number = 10) =>
  queryOptions({
    queryKey: historyKeys.importHistory(page),
    queryFn: () => getImportHistory(page, pageSize),
    staleTime: 10_000,
  });

export const auditLogQuery = (page: number, pageSize: number = 10) =>
  queryOptions({
    queryKey: historyKeys.auditLog(page),
    queryFn: () => getAuditLogs(page, pageSize),
    staleTime: 10_000,
  });

export function useInvalidateAuditLog() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ["auditLog"] });
}

export function useInvalidateImportHistory() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ["importHistory"] });
}
