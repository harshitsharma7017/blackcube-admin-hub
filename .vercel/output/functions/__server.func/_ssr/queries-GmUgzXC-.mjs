import { a as useQueryClient, n as queryOptions, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { r as http } from "./queries-BrHWFq0A.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/queries-GmUgzXC-.js
/** Backend returns `phoneNumber`; frontend uses `phone`.
*  Backend returns `dateAdded`; frontend uses `createdAt`. */
function toFrontendRecord(raw) {
	return {
		id: String(raw["id"] ?? raw["_id"] ?? ""),
		name: String(raw["name"] ?? ""),
		email: String(raw["email"] ?? ""),
		phone: String(raw["phoneNumber"] ?? raw["phone"] ?? ""),
		address: String(raw["address"] ?? ""),
		organisation: String(raw["organisation"] ?? ""),
		type: raw["type"],
		linkStatus: raw["linkStatus"],
		downloadStatus: raw["downloadStatus"],
		createdAt: String(raw["dateAdded"] ?? raw["createdAt"] ?? (/* @__PURE__ */ new Date()).toISOString())
	};
}
/** Frontend sends `phone`; backend update schema expects `phoneNumber`. */
function toBackendInput(input) {
	return {
		name: input.name,
		email: input.email,
		phoneNumber: input.phone,
		address: input.address,
		organisation: input.organisation,
		type: input.type,
		linkStatus: input.linkStatus,
		downloadStatus: input.downloadStatus
	};
}
/** Convert frontend relative date filter to backend ISO dateFrom/dateTo. */
function dateRangeParams(dateAdded) {
	if (!dateAdded || dateAdded === "all") return {};
	const now = /* @__PURE__ */ new Date();
	const to = now.toISOString();
	const days = dateAdded === "today" ? 1 : dateAdded === "7d" ? 7 : 30;
	return {
		dateFrom: (/* @__PURE__ */ new Date(now.getTime() - days * 24 * 60 * 60 * 1e3)).toISOString(),
		dateTo: to
	};
}
async function listRecords(query) {
	const params = {
		page: query.page,
		pageSize: query.pageSize
	};
	if (query.search) params["search"] = query.search;
	if (query.type) params["category"] = query.type;
	if (query.linkStatus && query.linkStatus !== "all") params["linkStatus"] = query.linkStatus;
	if (query.downloadStatus && query.downloadStatus !== "all") params["downloadStatus"] = query.downloadStatus;
	const dateParams = dateRangeParams(query.dateAdded);
	Object.assign(params, dateParams);
	if (query.sortBy) params["sortBy"] = query.sortBy;
	if (query.sortOrder) params["sortOrder"] = query.sortOrder;
	const res = await http.get("/records", { params });
	const items = res.data.data.map(toFrontendRecord);
	const meta = res.data.meta;
	return {
		items,
		total: meta.total,
		page: meta.page,
		pageSize: meta.pageSize,
		totalPages: meta.totalPages
	};
}
async function exportRecords(query, format) {
	const params = { format };
	if (query.search) params["search"] = query.search;
	if (query.type) params["category"] = query.type;
	if (query.linkStatus && query.linkStatus !== "all") params["linkStatus"] = query.linkStatus;
	if (query.downloadStatus && query.downloadStatus !== "all") params["downloadStatus"] = query.downloadStatus;
	const dateParams = dateRangeParams(query.dateAdded);
	Object.assign(params, dateParams);
	if (query.sortBy) params["sortBy"] = query.sortBy;
	if (query.sortOrder) params["sortOrder"] = query.sortOrder;
	const res = await http.get("/records/export", {
		params,
		responseType: "blob"
	});
	if (res.data.type === "application/json") {
		const text = await res.data.text();
		const json = JSON.parse(text);
		throw new Error(json.error?.message || "Export failed");
	}
	const blob = new Blob([res.data], { type: String(res.headers["content-type"] || "") });
	const url = window.URL.createObjectURL(blob);
	let fileName = `export-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.${format}`;
	const dispositionRaw = res.headers["content-disposition"];
	const disposition = dispositionRaw ? String(dispositionRaw) : "";
	if (disposition && disposition.indexOf("attachment") !== -1) {
		const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(disposition);
		if (matches != null && matches[1]) fileName = matches[1].replace(/['"]/g, "");
	}
	const link = document.createElement("a");
	link.href = url;
	link.download = fileName;
	document.body.appendChild(link);
	link.click();
	setTimeout(() => {
		document.body.removeChild(link);
		window.URL.revokeObjectURL(url);
	}, 100);
}
async function getSummary() {
	return (await http.get("/summary")).data.data;
}
async function updateRecord(id, input) {
	return toFrontendRecord((await http.patch(`/records/${id}`, toBackendInput(input))).data.data);
}
async function deleteRecord(id) {
	await http.delete(`/records/${id}`);
	return { id };
}
async function bulkDeleteRecords(ids) {
	return (await http.delete("/records/bulk", { data: { ids } })).data.data;
}
async function bulkUpdateRecords(ids, updates) {
	const backendUpdates = {};
	if (updates.type !== void 0) backendUpdates["type"] = updates.type;
	if (updates.linkStatus !== void 0) backendUpdates["linkStatus"] = updates.linkStatus;
	if (updates.downloadStatus !== void 0) backendUpdates["downloadStatus"] = updates.downloadStatus;
	return (await http.patch("/records/bulk", {
		ids,
		updates: backendUpdates
	})).data.data;
}
async function commitImport(data) {
	const backendRows = data.validRows.map((row) => ({
		name: row.name,
		email: row.email,
		phone: row.phone,
		address: row.address,
		organisation: row.organisation,
		type: row.type,
		linkStatus: row.linkStatus,
		downloadStatus: row.downloadStatus
	}));
	return (await http.post("/import", {
		fileName: data.fileName,
		totalRows: data.totalRows,
		validRows: backendRows
	})).data.data;
}
async function getImportHistory(page, pageSize) {
	const res = await http.get("/import-history", { params: {
		page,
		pageSize
	} });
	return {
		items: res.data.data,
		total: res.data.meta.total,
		page: res.data.meta.page,
		pageSize: res.data.meta.pageSize,
		totalPages: res.data.meta.totalPages
	};
}
async function getAuditLogs(page, pageSize) {
	const res = await http.get("/audit-log", { params: {
		page,
		pageSize
	} });
	return {
		items: res.data.data,
		total: res.data.meta.total,
		page: res.data.meta.page,
		pageSize: res.data.meta.pageSize,
		totalPages: res.data.meta.totalPages
	};
}
var recordKeys = {
	root: ["records"],
	list: (query) => [
		"records",
		"list",
		query
	],
	summary: ["records", "summary"]
};
var recordsQuery = (query) => queryOptions({
	queryKey: recordKeys.list(query),
	queryFn: () => listRecords(query),
	staleTime: 1e4
});
var summaryQuery = () => queryOptions({
	queryKey: recordKeys.summary,
	queryFn: () => getSummary(),
	staleTime: 1e4
});
function useInvalidateRecords() {
	const queryClient = useQueryClient();
	return () => queryClient.invalidateQueries({ queryKey: recordKeys.root });
}
function useUpdateRecord() {
	const invalidate = useInvalidateRecords();
	const invalidateAudit = useInvalidateAuditLog();
	return useMutation({
		mutationFn: ({ id, input }) => updateRecord(id, input),
		onSuccess: () => {
			invalidate();
			invalidateAudit();
		}
	});
}
function useDeleteRecord() {
	const invalidate = useInvalidateRecords();
	const invalidateAudit = useInvalidateAuditLog();
	return useMutation({
		mutationFn: (id) => deleteRecord(id),
		onSuccess: () => {
			invalidate();
			invalidateAudit();
		}
	});
}
function useCommitImport() {
	const invalidate = useInvalidateRecords();
	const invalidateHistory = useInvalidateImportHistory();
	const invalidateAudit = useInvalidateAuditLog();
	return useMutation({
		mutationFn: (data) => commitImport(data),
		onSuccess: () => {
			invalidate();
			invalidateHistory();
			invalidateAudit();
		}
	});
}
function useBulkDeleteRecords() {
	const invalidate = useInvalidateRecords();
	const invalidateAudit = useInvalidateAuditLog();
	return useMutation({
		mutationFn: (ids) => bulkDeleteRecords(ids),
		onSuccess: () => {
			invalidate();
			invalidateAudit();
		}
	});
}
function useBulkUpdateRecords() {
	const invalidate = useInvalidateRecords();
	const invalidateAudit = useInvalidateAuditLog();
	return useMutation({
		mutationFn: ({ ids, updates }) => bulkUpdateRecords(ids, updates),
		onSuccess: () => {
			invalidate();
			invalidateAudit();
		}
	});
}
function useExportRecords() {
	const invalidateAudit = useInvalidateAuditLog();
	return useMutation({
		mutationFn: ({ query, format }) => exportRecords(query, format),
		onSuccess: () => {
			invalidateAudit();
		}
	});
}
var historyKeys = {
	importHistory: (page) => ["importHistory", page],
	auditLog: (page) => ["auditLog", page]
};
var importHistoryQuery = (page, pageSize = 10) => queryOptions({
	queryKey: historyKeys.importHistory(page),
	queryFn: () => getImportHistory(page, pageSize),
	staleTime: 1e4
});
var auditLogQuery = (page, pageSize = 10) => queryOptions({
	queryKey: historyKeys.auditLog(page),
	queryFn: () => getAuditLogs(page, pageSize),
	staleTime: 1e4
});
function useInvalidateAuditLog() {
	const queryClient = useQueryClient();
	return () => queryClient.invalidateQueries({ queryKey: ["auditLog"] });
}
function useInvalidateImportHistory() {
	const queryClient = useQueryClient();
	return () => queryClient.invalidateQueries({ queryKey: ["importHistory"] });
}
//#endregion
export { useBulkDeleteRecords as a, useDeleteRecord as c, summaryQuery as i, useExportRecords as l, importHistoryQuery as n, useBulkUpdateRecords as o, recordsQuery as r, useCommitImport as s, auditLogQuery as t, useUpdateRecord as u };
