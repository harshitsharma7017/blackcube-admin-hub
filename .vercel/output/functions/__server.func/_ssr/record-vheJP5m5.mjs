import { n as objectType, r as stringType, t as enumType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/record-vheJP5m5.js
var RECORD_TYPES = [
	"Student",
	"Teacher",
	"Mentor",
	"Job Seeker",
	"Institute",
	"Other"
];
var LINK_STATUSES = [
	"Sent",
	"Pending",
	"Failed"
];
var DOWNLOAD_STATUSES = ["Downloaded", "Not Downloaded"];
var CATEGORY_TABS = [
	{
		key: "all",
		label: "All Data",
		type: null
	},
	{
		key: "students",
		label: "Students",
		type: "Student"
	},
	{
		key: "teachers",
		label: "Teachers",
		type: "Teacher"
	},
	{
		key: "mentors",
		label: "Mentors",
		type: "Mentor"
	},
	{
		key: "job-seekers",
		label: "Job Seekers",
		type: "Job Seeker"
	},
	{
		key: "institutes",
		label: "Institutes",
		type: "Institute"
	},
	{
		key: "others",
		label: "Others",
		type: "Other"
	}
];
var recordInputSchema = objectType({
	name: stringType().trim().min(2, "Name must be at least 2 characters"),
	email: stringType().trim().email("Enter a valid email address"),
	phone: stringType().trim().min(7, "Phone must be at least 7 digits").regex(/^[0-9+\-()\s]+$/, "Phone may only contain digits and + - ( )"),
	address: stringType().trim().max(160, "Address is too long").default(""),
	organisation: stringType().trim().max(120, "Organisation is too long").default(""),
	type: enumType(RECORD_TYPES),
	linkStatus: enumType(LINK_STATUSES),
	downloadStatus: enumType(DOWNLOAD_STATUSES)
});
/** ---- Import contracts ---- */
var CANONICAL_FIELDS = [
	{
		key: "name",
		label: "Name",
		required: true
	},
	{
		key: "email",
		label: "Email",
		required: true
	},
	{
		key: "phone",
		label: "Phone",
		required: true
	},
	{
		key: "address",
		label: "Address",
		required: false
	},
	{
		key: "organisation",
		label: "Organisation",
		required: false
	},
	{
		key: "type",
		label: "Type",
		required: false
	}
];
var ApiError = class extends Error {
	status;
	constructor(message, status = 400) {
		super(message);
		this.name = "ApiError";
		this.status = status;
	}
};
//#endregion
export { LINK_STATUSES as a, DOWNLOAD_STATUSES as i, CANONICAL_FIELDS as n, RECORD_TYPES as o, CATEGORY_TABS as r, recordInputSchema as s, ApiError as t };
