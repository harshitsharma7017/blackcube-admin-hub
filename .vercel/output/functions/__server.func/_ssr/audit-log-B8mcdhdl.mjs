import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./audit-log-D6vJyur8.mjs";
import { t as Button } from "./button-PwNqyxv_.mjs";
import { b as FileKey, j as CircleAlert } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-CHk9u69c.mjs";
import { t as TablePagination } from "./TablePagination-Bi2nY3sv.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BcaWptOW.mjs";
import { t as Skeleton } from "./skeleton-DcnTQsWF.mjs";
import { t as auditLogQuery } from "./queries-GmUgzXC-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/audit-log-B8mcdhdl.js
var import_jsx_runtime = require_jsx_runtime();
function formatDate(iso) {
	return new Date(iso).toLocaleString("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	});
}
function AuditLogPage() {
	const search = Route.useSearch();
	const navigate = useNavigate({ from: Route.fullPath });
	const setPage = (page) => {
		navigate({
			to: ".",
			search: { page },
			replace: true
		});
	};
	const listQuery = useQuery(auditLogQuery(search.page, 10));
	const items = listQuery.data?.items ?? [];
	const total = listQuery.data?.total ?? 0;
	const page = listQuery.data?.page ?? search.page;
	const totalPages = listQuery.data?.totalPages ?? 1;
	const startIndex = (page - 1) * 10;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Audit Log",
		description: "View recent actions and changes made across the application.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-xl border border-border bg-card shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						className: "bg-muted/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "w-12 text-xs font-semibold uppercase tracking-wide",
								children: "S.N."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-xs font-semibold uppercase tracking-wide",
								children: "Date"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-xs font-semibold uppercase tracking-wide",
								children: "Action"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-xs font-semibold uppercase tracking-wide",
								children: "Entity"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-xs font-semibold uppercase tracking-wide",
								children: "Target"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-xs font-semibold uppercase tracking-wide",
								children: "Details"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: listQuery.isPending ? Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: Array.from({ length: 6 }).map((_, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-full min-w-14" }) }, "sk-" + i + "-" + j)) }, i)) : listQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						colSpan: 6,
						className: "py-10 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-2 text-destructive",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-6" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Failed to load audit logs" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => listQuery.refetch(),
									children: "Retry"
								})
							]
						})
					}) }) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						colSpan: 6,
						className: "py-10 text-center text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileKey, { className: "size-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No audit logs found." })]
						})
					}) }) : items.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "tabular-nums text-muted-foreground",
							children: startIndex + idx + 1
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "whitespace-nowrap tabular-nums",
							children: formatDate(item.createdAt)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-xs tracking-wide uppercase px-2 py-1 rounded bg-muted",
							children: item.action
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: item.entityType }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-muted-foreground tabular-nums max-w-32 truncate",
							children: item.entityId
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "max-w-72 truncate text-sm",
							children: item.details ? JSON.stringify(item.details) : "—"
						})
					] }, item._id)) })] })
				})
			}), !listQuery.isPending && !listQuery.isError && items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TablePagination, {
				page,
				totalPages,
				total,
				startIndex,
				count: items.length,
				onPageChange: setPage
			})]
		})
	});
}
//#endregion
export { AuditLogPage as component };
