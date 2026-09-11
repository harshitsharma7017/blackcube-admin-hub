import { n as getMe, t as authKeys } from "./queries-BrHWFq0A.mjs";
import { f as lazyRouteComponent, k as redirect, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/import-history-mElodLhp.js
var $$splitComponentImporter = () => import("./import-history-BuD7X5GI.mjs");
var Route = createFileRoute("/import-history")({
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
	validateSearch: (search) => ({ page: Math.max(1, Number(search["page"] ?? 1) || 1) }),
	head: () => ({ meta: [{ title: "Import History — BlackCube Admin Panel" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
