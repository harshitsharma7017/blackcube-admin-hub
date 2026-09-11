import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as getMe, t as authKeys } from "./queries-BrHWFq0A.mjs";
import { _ as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, k as redirect, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$6 } from "./audit-log-D6vJyur8.mjs";
import { t as Route$7 } from "./import-history-mElodLhp.mjs";
import { t as Route$8 } from "./manage-data-B7jGNGBc.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router--c0gUfqy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CDB4gkvs.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$5 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "BlackCube Admin Panel" },
			{
				name: "description",
				content: "Manage Data admin panel for BlackCube Solutions — import, search, filter and manage records."
			},
			{
				name: "author",
				content: "BlackCube Solutions"
			},
			{
				property: "og:title",
				content: "BlackCube Admin Panel"
			},
			{
				property: "og:description",
				content: "Manage Data admin panel for BlackCube Solutions — import, search, filter and manage records."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Sora:wght@500;600;700&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$5.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			richColors: true,
			closeButton: true,
			position: "bottom-right"
		})]
	});
}
var $$splitComponentImporter$4 = () => import("./routes-C6TCJRXf.mjs");
var Route$4 = createFileRoute("/")({
	beforeLoad: async ({ context: { queryClient } }) => {
		if (typeof window === "undefined") return;
		try {
			await queryClient.ensureQueryData({
				queryKey: authKeys.currentUser,
				queryFn: getMe
			});
		} catch {
			throw redirect({
				to: "/sign-in",
				replace: true
			});
		}
	},
	head: () => ({ meta: [
		{ title: "Dashboard — BlackCube Admin Panel" },
		{
			name: "description",
			content: "Database-backed summary dashboard for the BlackCube admin panel."
		},
		{
			property: "og:title",
			content: "Dashboard — BlackCube Admin Panel"
		},
		{
			property: "og:description",
			content: "Database-backed summary dashboard for the BlackCube admin panel."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./sign-in-D0mrvUtv.mjs");
var Route$3 = createFileRoute("/sign-in")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./sign-up-ZEO2KfCt.mjs");
var Route$2 = createFileRoute("/sign-up")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./social-ads-B0UGEZVZ.mjs");
var Route$1 = createFileRoute("/social-ads")({
	beforeLoad: async ({ context: { queryClient } }) => {
		if (typeof window === "undefined") return;
		try {
			await queryClient.ensureQueryData({
				queryKey: authKeys.currentUser,
				queryFn: getMe
			});
		} catch {
			throw redirect({
				to: "/sign-in",
				replace: true
			});
		}
	},
	head: () => ({ meta: [
		{ title: "Social & Ads — BlackCube Admin Panel" },
		{
			name: "description",
			content: "Campaign and social outreach tools for the BlackCube admin panel."
		},
		{
			property: "og:title",
			content: "Social & Ads — BlackCube Admin Panel"
		},
		{
			property: "og:description",
			content: "Campaign and social outreach tools for the BlackCube admin panel."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./upload-excel-b-5oYC_h.mjs");
var Route = createFileRoute("/upload-excel")({
	beforeLoad: async ({ context: { queryClient } }) => {
		if (typeof window === "undefined") return;
		try {
			await queryClient.ensureQueryData({
				queryKey: authKeys.currentUser,
				queryFn: getMe
			});
		} catch {
			throw redirect({
				to: "/sign-in",
				replace: true
			});
		}
	},
	head: () => ({ meta: [
		{ title: "Upload Excel — BlackCube Admin Panel" },
		{
			name: "description",
			content: "Import student, teacher and institute records from an Excel or CSV spreadsheet into the BlackCube database."
		},
		{
			property: "og:title",
			content: "Upload Excel — BlackCube Admin Panel"
		},
		{
			property: "og:description",
			content: "Validate, map and preview spreadsheet rows before importing them into MongoDB."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$4.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$5
	}),
	AuditLogRoute: Route$6.update({
		id: "/audit-log",
		path: "/audit-log",
		getParentRoute: () => Route$5
	}),
	ImportHistoryRoute: Route$7.update({
		id: "/import-history",
		path: "/import-history",
		getParentRoute: () => Route$5
	}),
	ManageDataRoute: Route$8.update({
		id: "/manage-data",
		path: "/manage-data",
		getParentRoute: () => Route$5
	}),
	SignInRoute: Route$3.update({
		id: "/sign-in",
		path: "/sign-in",
		getParentRoute: () => Route$5
	}),
	SignUpRoute: Route$2.update({
		id: "/sign-up",
		path: "/sign-up",
		getParentRoute: () => Route$5
	}),
	SocialAdsRoute: Route$1.update({
		id: "/social-ads",
		path: "/social-ads",
		getParentRoute: () => Route$5
	}),
	UploadExcelRoute: Route.update({
		id: "/upload-excel",
		path: "/upload-excel",
		getParentRoute: () => Route$5
	})
};
var routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
