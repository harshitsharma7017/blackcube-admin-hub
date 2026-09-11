import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-PwNqyxv_.mjs";
import { N as ChevronRight, P as ChevronLeft } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/TablePagination-Bi2nY3sv.js
var import_jsx_runtime = require_jsx_runtime();
function pageWindow(page, totalPages) {
	const span = 5;
	let start = Math.max(1, page - Math.floor(span / 2));
	const end = Math.min(totalPages, start + span - 1);
	start = Math.max(1, end - span + 1);
	return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
function TablePagination({ page, totalPages, total, startIndex, count, onPageChange }) {
	if (total === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		"aria-label": "Pagination",
		className: "flex flex-col items-center justify-between gap-3 sm:flex-row",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-muted-foreground",
			"aria-live": "polite",
			children: [
				"Showing ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium text-foreground",
					children: startIndex + 1
				}),
				"–",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium text-foreground",
					children: startIndex + count
				}),
				" of",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium text-foreground",
					children: total
				}),
				" records"
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					onClick: () => onPageChange(page - 1),
					disabled: page <= 1,
					"aria-label": "Previous page",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
						className: "size-4",
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden sm:inline",
						children: "Previous"
					})]
				}),
				pageWindow(page, totalPages).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: p === page ? "default" : "outline",
					size: "sm",
					onClick: () => onPageChange(p),
					"aria-label": `Page ${p}`,
					"aria-current": p === page ? "page" : void 0,
					className: "min-w-9 tabular-nums",
					children: p
				}, p)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					onClick: () => onPageChange(page + 1),
					disabled: page >= totalPages,
					"aria-label": "Next page",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden sm:inline",
						children: "Next"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
						className: "size-4",
						"aria-hidden": "true"
					})]
				})
			]
		})]
	});
}
//#endregion
export { TablePagination as t };
