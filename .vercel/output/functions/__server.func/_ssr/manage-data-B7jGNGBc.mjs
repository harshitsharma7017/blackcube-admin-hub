import { n as getMe, t as authKeys } from "./queries-BrHWFq0A.mjs";
import { f as lazyRouteComponent, k as redirect, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as CATEGORY_TABS } from "./record-vheJP5m5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/manage-data-B7jGNGBc.js
var $$splitComponentImporter = () => import("./manage-data-CEyOKDva.mjs");
var Route = createFileRoute("/manage-data")({
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
	validateSearch: (search) => {
		const tab = String(search["tab"] ?? "all");
		return {
			tab: CATEGORY_TABS.some((t) => t.key === tab) ? tab : "all",
			q: String(search["q"] ?? ""),
			link: String(search["link"] ?? "all"),
			download: String(search["download"] ?? "all"),
			date: String(search["date"] ?? "all"),
			page: Math.max(1, Number(search["page"] ?? 1) || 1),
			sort: String(search["sort"] ?? ""),
			order: String(search["order"] ?? "")
		};
	},
	head: () => ({ meta: [
		{ title: "Manage Data — BlackCube Admin Panel" },
		{
			name: "description",
			content: "Search, filter, update and delete imported student, teacher and institute records in the BlackCube admin panel."
		},
		{
			property: "og:title",
			content: "Manage Data — BlackCube Admin Panel"
		},
		{
			property: "og:description",
			content: "Database-backed record management with search, filters, pagination and CRUD."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
