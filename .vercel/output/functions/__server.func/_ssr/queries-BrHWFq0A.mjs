import { a as useQueryClient, r as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as axios } from "../_libs/axios+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/queries-BrHWFq0A.js
/**
* Axios instance pointed at the future Express + Mongoose REST API.
* The mock service in `records-service.ts` implements the identical contract,
* so switching over is a per-function body swap — no component changes.
*/
var http = axios.create({
	baseURL: {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_API_BASE_URL": "http://localhost:8082/api"
	}["VITE_API_BASE_URL"] ?? "/api",
	headers: { "Content-Type": "application/json" },
	timeout: 2e4,
	withCredentials: true
});
/** Normalises any transport failure into a readable message. */
function toApiMessage(error, fallback = "Something went wrong") {
	if (axios.isAxiosError(error)) return (error.response?.data)?.message ?? error.message ?? fallback;
	if (error instanceof Error) return error.message;
	return fallback;
}
async function signUp(data) {
	await http.post("/auth/signup", data);
}
async function signIn(data) {
	await http.post("/auth/login", data);
}
async function logout() {
	await http.post("/auth/logout");
}
async function getMe() {
	return (await http.get("/auth/me")).data.data;
}
var authKeys = { currentUser: ["currentUser"] };
function useCurrentUser() {
	return useQuery({
		queryKey: authKeys.currentUser,
		queryFn: getMe,
		retry: false
	});
}
function useLogin() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: signIn,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: authKeys.currentUser });
		}
	});
}
function useSignup() {
	return useMutation({ mutationFn: signUp });
}
function useLogout() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: logout,
		onSettled: () => {
			queryClient.clear();
		}
	});
}
//#endregion
export { useCurrentUser as a, useSignup as c, toApiMessage as i, getMe as n, useLogin as o, http as r, useLogout as s, authKeys as t };
