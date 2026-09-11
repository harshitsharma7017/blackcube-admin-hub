import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-PwNqyxv_.mjs";
import { E as CloudUpload, R as Building2, T as Database, U as ArrowRight, a as UserCheck, i as UserPlus, n as Users, v as GraduationCap, z as Briefcase } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-CHk9u69c.mjs";
import { t as Skeleton } from "./skeleton-DcnTQsWF.mjs";
import { i as summaryQuery, r as recordsQuery } from "./queries-GmUgzXC-.mjs";
import { n as CardContent, t as Card } from "./card-C5Nmk_bj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C6TCJRXf.js
var import_jsx_runtime = require_jsx_runtime();
var SUMMARY_CARDS = [
	{
		key: "all",
		label: "All Data",
		icon: Database,
		color: "text-primary"
	},
	{
		key: "students",
		label: "Students",
		icon: GraduationCap,
		color: "text-chart-1"
	},
	{
		key: "teachers",
		label: "Teachers",
		icon: Users,
		color: "text-chart-2"
	},
	{
		key: "institutes",
		label: "Institutes",
		icon: Building2,
		color: "text-chart-4"
	},
	{
		key: "mentors",
		label: "Mentors",
		icon: UserCheck,
		color: "text-chart-3"
	},
	{
		key: "jobSeekers",
		label: "Job Seekers",
		icon: Briefcase,
		color: "text-chart-5"
	},
	{
		key: "others",
		label: "Others",
		icon: UserPlus,
		color: "text-muted-foreground"
	}
];
function DashboardPage() {
	const summary = useQuery(summaryQuery());
	const recent = useQuery(recordsQuery({
		page: 1,
		pageSize: 5
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Dashboard",
		description: "Overview of your imported records and quick actions.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"aria-label": "Record summary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-4 text-lg font-semibold",
						children: "Summary"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
						children: SUMMARY_CARDS.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "border-border/70 shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "flex items-center gap-4 p-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent ${card.color}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(card.icon, {
										className: "size-5",
										"aria-hidden": "true"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-muted-foreground",
										children: card.label
									}), summary.isPending || !summary.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-1.5 h-7 w-14" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-2xl font-semibold tabular-nums",
										children: summary.data[card.key].toLocaleString()
									})]
								})]
							})
						}, card.key))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"aria-label": "Quick actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-4 text-lg font-semibold",
						children: "Quick Actions"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								className: "border-border/70 shadow-sm transition-shadow hover:shadow-md",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									className: "flex flex-col gap-3 p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {
												className: "size-5",
												"aria-hidden": "true"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-semibold",
											children: "Manage Data"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm text-muted-foreground",
											children: "Search, filter, update and delete imported records."
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											size: "sm",
											className: "mt-auto w-fit",
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/manage-data",
												search: {
													tab: "all",
													q: "",
													link: "all",
													download: "all",
													date: "all",
													page: 1,
													sort: "",
													order: ""
												},
												children: ["Open", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
													className: "size-4",
													"aria-hidden": "true"
												})]
											})
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								className: "border-border/70 shadow-sm transition-shadow hover:shadow-md",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									className: "flex flex-col gap-3 p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex size-10 items-center justify-center rounded-lg bg-success/10 text-success",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {
												className: "size-5",
												"aria-hidden": "true"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-semibold",
											children: "Upload Excel"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm text-muted-foreground",
											children: "Import records from an Excel or CSV spreadsheet."
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											size: "sm",
											className: "mt-auto w-fit",
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/upload-excel",
												children: ["Import", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
													className: "size-4",
													"aria-hidden": "true"
												})]
											})
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								className: "border-dashed border-border/70 shadow-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									className: "flex flex-col items-center justify-center gap-2 p-5 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-muted-foreground",
										children: "Social & Ads campaigns"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Coming soon"
									})]
								})
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"aria-label": "Recent records",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold",
							children: "Recent Records"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "link",
							size: "sm",
							className: "text-primary",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/manage-data",
								search: {
									tab: "all",
									q: "",
									link: "all",
									download: "all",
									date: "all",
									page: 1,
									sort: "",
									order: ""
								},
								children: ["View all", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
									className: "size-4",
									"aria-hidden": "true"
								})]
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "overflow-hidden border-border/70 shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							className: "p-0",
							children: recent.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-3 p-5",
								children: Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-32" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "hidden h-5 w-44 sm:block" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "hidden h-5 w-28 md:block" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "ml-auto h-5 w-20" })
									]
								}, `skeleton-${i}`))
							}) : !recent.data || recent.data.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center gap-3 px-6 py-12 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {
										className: "size-10 text-muted-foreground/50",
										"aria-hidden": "true"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-muted-foreground",
										children: "No records yet"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: "Upload a spreadsheet to get started."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "mt-2",
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/upload-excel",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {
												className: "size-4",
												"aria-hidden": "true"
											}), "Upload Excel"]
										})
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full overflow-x-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "border-b bg-muted/60 text-left",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
												children: "Name"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "hidden whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:table-cell",
												children: "Email"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "hidden whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground md:table-cell",
												children: "Phone"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
												children: "Type"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "whitespace-nowrap px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground",
												children: "Added"
											})
										]
									}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: recent.data.items.map((record) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "border-b last:border-0 transition-colors hover:bg-muted/30",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "whitespace-nowrap px-4 py-3 font-medium",
												children: record.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "hidden max-w-48 truncate px-4 py-3 text-muted-foreground sm:table-cell",
												children: record.email
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "hidden whitespace-nowrap px-4 py-3 tabular-nums text-muted-foreground md:table-cell",
												children: record.phone
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "whitespace-nowrap px-4 py-3",
												children: record.type
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "whitespace-nowrap px-4 py-3 text-right text-muted-foreground",
												children: new Date(record.createdAt).toLocaleDateString("en-GB", {
													day: "2-digit",
													month: "short"
												})
											})
										]
									}, record.id)) })]
								})
							})
						})
					})]
				})
			]
		})
	});
}
//#endregion
export { DashboardPage as component };
