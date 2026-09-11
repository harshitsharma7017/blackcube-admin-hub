import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { p as Megaphone } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-CHk9u69c.mjs";
import { n as CardContent, t as Card } from "./card-C5Nmk_bj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/social-ads-B0UGEZVZ.js
var import_jsx_runtime = require_jsx_runtime();
function SocialAdsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Social & Ads",
		description: "Outreach campaigns built on your imported records.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "border-dashed",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-col items-center gap-3 px-6 py-20 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, {
							className: "size-6",
							"aria-hidden": "true"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold",
						children: "Campaign tools are coming soon"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-md text-sm text-muted-foreground",
						children: "This area will let you launch social and advertising campaigns against the audiences you build in Manage Data."
					})
				]
			})
		})
	});
}
//#endregion
export { SocialAdsPage as component };
