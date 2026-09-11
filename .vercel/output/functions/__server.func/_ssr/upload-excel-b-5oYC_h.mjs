import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as toApiMessage } from "./queries-BrHWFq0A.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as cn, t as Button } from "./button-PwNqyxv_.mjs";
import { A as CircleCheck, E as CloudUpload, W as ArrowLeft, h as LoaderCircle, o as TriangleAlert, y as FileSpreadsheet } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-CHk9u69c.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BcaWptOW.mjs";
import { s as useCommitImport } from "./queries-GmUgzXC-.mjs";
import { a as LINK_STATUSES, i as DOWNLOAD_STATUSES, n as CANONICAL_FIELDS, o as RECORD_TYPES, s as recordInputSchema, t as ApiError } from "./record-vheJP5m5.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-C5Nmk_bj.mjs";
import { t as Label } from "./label-BeT0bXvu.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DamjaduW.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as utils, t as readSync } from "../_libs/xlsx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/upload-excel-b-5oYC_h.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAX_FILE_BYTES = 5242880;
var ALLOWED_EXTENSIONS = [
	"xlsx",
	"xls",
	"csv"
];
function validateFile(file) {
	const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
	if (!ALLOWED_EXTENSIONS.includes(ext)) return `“${file.name}” is not supported. Upload an .xlsx, .xls or .csv file.`;
	if (file.size > 5242880) return `“${file.name}” is ${(file.size / 1024 / 1024).toFixed(1)} MB. The limit is 5 MB.`;
	if (file.size === 0) return `“${file.name}” is empty.`;
	return null;
}
var normalise = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
var SYNONYMS = {
	name: [
		"name",
		"fullname",
		"studentname",
		"contactname",
		"person"
	],
	email: [
		"email",
		"emailaddress",
		"mail",
		"emailid"
	],
	phone: [
		"phone",
		"phonenumber",
		"mobile",
		"mobileno",
		"contact",
		"contactnumber"
	],
	address: [
		"address",
		"location",
		"city",
		"fulladdress"
	],
	organisation: [
		"organisation",
		"organization",
		"company",
		"institute",
		"school",
		"college"
	],
	type: [
		"type",
		"category",
		"role",
		"usertype"
	]
};
function suggestMapping(headers) {
	const mapping = {};
	for (const field of CANONICAL_FIELDS) {
		const match = headers.find((h) => SYNONYMS[field.key].includes(normalise(h)));
		if (match) mapping[field.key] = match;
	}
	return mapping;
}
/** Parses the workbook/CSV in the browser and returns headers + raw rows. */
async function parseImportFile(file) {
	const problem = validateFile(file);
	if (problem) throw new ApiError(problem, 415);
	const buffer = await file.arrayBuffer();
	let workbook;
	try {
		workbook = readSync(buffer, { type: "array" });
	} catch {
		throw new ApiError("This file could not be read. It may be corrupted.", 422);
	}
	const sheetName = workbook.SheetNames[0];
	if (!sheetName) throw new ApiError("The file has no worksheets.", 422);
	const matrix = utils.sheet_to_json(workbook.Sheets[sheetName], {
		header: 1,
		blankrows: false,
		defval: "",
		raw: false
	});
	if (matrix.length < 2) throw new ApiError("The file needs a header row and at least one data row.", 422);
	const headers = (matrix[0] ?? []).map((h) => String(h ?? "").trim()).filter((h) => h.length > 0);
	if (headers.length === 0) throw new ApiError("No column headers were found.", 422);
	const rows = matrix.slice(1).map((row) => {
		const record = {};
		headers.forEach((header, i) => {
			record[header] = String(row[i] ?? "").trim();
		});
		return record;
	});
	return {
		fileName: file.name,
		headers,
		rows,
		suggestedMapping: suggestMapping(headers)
	};
}
function coerceType(value) {
	const v = normalise(value);
	const found = RECORD_TYPES.find((t) => normalise(t) === v);
	if (found) return found;
	if (v.includes("student")) return "Student";
	if (v.includes("teacher")) return "Teacher";
	if (v.includes("mentor")) return "Mentor";
	if (v.includes("job")) return "Job Seeker";
	if (v.includes("institute") || v.includes("school")) return "Institute";
	return "Other";
}
/** Applies the mapping and validates every row, returning previewable rows + errors. */
function validateRows(parsed, mapping) {
	const validRows = [];
	const errors = [];
	const seenEmails = /* @__PURE__ */ new Set();
	parsed.rows.forEach((row, index) => {
		const rowNumber = index + 2;
		const candidate = {
			name: mapping.name ? row[mapping.name] ?? "" : "",
			email: mapping.email ? row[mapping.email] ?? "" : "",
			phone: mapping.phone ? row[mapping.phone] ?? "" : "",
			address: mapping.address ? row[mapping.address] ?? "" : "",
			organisation: mapping.organisation ? row[mapping.organisation] ?? "" : "",
			type: coerceType(mapping.type ? row[mapping.type] ?? "" : ""),
			linkStatus: LINK_STATUSES[1],
			downloadStatus: DOWNLOAD_STATUSES[1]
		};
		const result = recordInputSchema.safeParse(candidate);
		if (!result.success) {
			for (const issue of result.error.issues) errors.push({
				rowNumber,
				field: String(issue.path[0] ?? "row"),
				message: issue.message
			});
			return;
		}
		const emailKey = result.data.email.toLowerCase();
		if (seenEmails.has(emailKey)) {
			errors.push({
				rowNumber,
				field: "email",
				message: `Duplicate email in this file (${result.data.email})`
			});
			return;
		}
		seenEmails.add(emailKey);
		validRows.push(result.data);
	});
	return {
		validRows,
		errors,
		totalRows: parsed.rows.length
	};
}
function missingRequiredFields(mapping) {
	return CANONICAL_FIELDS.filter((f) => f.required && !mapping[f.key]).map((f) => f.label);
}
var STEPS = [
	"Choose file",
	"Map columns",
	"Preview",
	"Done"
];
var NONE = "__none__";
function Stepper({ current }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "flex flex-wrap items-center gap-x-3 gap-y-2 text-sm",
		"aria-label": "Import steps",
		children: STEPS.map((step, index) => {
			const state = index < current ? "done" : index === current ? "current" : "todo";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("flex size-6 items-center justify-center rounded-full border text-xs font-semibold tabular-nums", state === "done" && "border-success bg-success text-success-foreground", state === "current" && "border-primary bg-primary text-primary-foreground", state === "todo" && "border-border bg-muted text-muted-foreground"),
						"aria-hidden": "true",
						children: index + 1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: cn(state === "todo" ? "text-muted-foreground" : "font-medium text-foreground"),
						children: [step, state === "current" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: " (current step)"
						}) : null]
					}),
					index < STEPS.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden h-px w-8 bg-border sm:block",
						"aria-hidden": "true"
					}) : null
				]
			}, step);
		})
	});
}
function UploadWizard() {
	const [step, setStep] = (0, import_react.useState)(0);
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const [parsing, setParsing] = (0, import_react.useState)(false);
	const [fileError, setFileError] = (0, import_react.useState)(null);
	const [parsed, setParsed] = (0, import_react.useState)(null);
	const [mapping, setMapping] = (0, import_react.useState)({});
	const [validation, setValidation] = (0, import_react.useState)(null);
	const [imported, setImported] = (0, import_react.useState)(0);
	const inputRef = (0, import_react.useRef)(null);
	const commit = useCommitImport();
	const reset = () => {
		setStep(0);
		setParsed(null);
		setMapping({});
		setValidation(null);
		setFileError(null);
		setImported(0);
		if (inputRef.current) inputRef.current.value = "";
	};
	const handleFile = async (file) => {
		setFileError(null);
		const problem = validateFile(file);
		if (problem) {
			setFileError(problem);
			return;
		}
		setParsing(true);
		try {
			const result = await parseImportFile(file);
			setParsed(result);
			setMapping(result.suggestedMapping);
			setStep(1);
		} catch (error) {
			setFileError(toApiMessage(error, "This file could not be read"));
		} finally {
			setParsing(false);
		}
	};
	const missing = missingRequiredFields(mapping);
	const goToPreview = () => {
		if (!parsed || missing.length > 0) return;
		setValidation(validateRows(parsed, mapping));
		setStep(2);
	};
	const confirmImport = async () => {
		if (!validation || !parsed) return;
		try {
			const result = await commit.mutateAsync({
				fileName: parsed.fileName,
				totalRows: validation.totalRows,
				validRows: validation.validRows
			});
			setImported(result.inserted);
			setStep(3);
			toast.success(`${result.inserted} records imported`);
		} catch (error) {
			toast.error(toApiMessage(error, "The import could not be completed"));
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, { current: step }),
			step === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Upload a spreadsheet" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, { children: [
				"Accepted formats: .xlsx, .xls and .csv. Maximum size",
				" ",
				(MAX_FILE_BYTES / 1024 / 1024).toFixed(0),
				" MB. The first row must contain column headers."
			] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-col gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					onDragOver: (e) => {
						e.preventDefault();
						setDragging(true);
					},
					onDragLeave: () => setDragging(false),
					onDrop: (e) => {
						e.preventDefault();
						setDragging(false);
						const file = e.dataTransfer.files[0];
						if (file) handleFile(file);
					},
					className: cn("flex flex-col items-center gap-3 rounded-xl border-2 border-dashed px-6 py-12 text-center transition-colors", dragging ? "border-primary bg-accent" : "border-border bg-muted/40"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-12 items-center justify-center rounded-full bg-background text-primary",
							children: parsing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								className: "size-6 animate-spin",
								"aria-hidden": "true"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {
								className: "size-6",
								"aria-hidden": "true"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: parsing ? "Reading your file…" : "Drag and drop your file here"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "or"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							onClick: () => inputRef.current?.click(),
							disabled: parsing,
							children: "Browse files"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: inputRef,
							type: "file",
							accept: ".xlsx,.xls,.csv",
							className: "sr-only",
							"aria-label": "Choose a spreadsheet file",
							onChange: (e) => {
								const file = e.target.files?.[0];
								if (file) handleFile(file);
							}
						})
					]
				}), fileError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					role: "alert",
					className: "flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
						className: "mt-0.5 size-4 shrink-0",
						"aria-hidden": "true"
					}), fileError]
				}) : null]
			})] }) : null,
			step === 1 && parsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Map your columns" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, {
						className: "size-4",
						"aria-hidden": "true"
					}),
					parsed.fileName,
					" · ",
					parsed.rows.length,
					" rows · ",
					parsed.headers.length,
					" columns"
				]
			}) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-col gap-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: CANONICAL_FIELDS.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								htmlFor: `map-${field.key}`,
								children: [field.label, field.required ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-destructive",
									"aria-hidden": "true",
									children: [" ", "*"]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: " (optional)"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: mapping[field.key] ?? NONE,
								onValueChange: (value) => setMapping((prev) => ({
									...prev,
									[field.key]: value === NONE ? void 0 : value
								})),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									id: `map-${field.key}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Not mapped" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: NONE,
									children: "Not mapped"
								}), parsed.headers.map((header) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: header,
									children: header
								}, header))] })]
							})]
						}, field.key))
					}),
					missing.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						role: "alert",
						className: "flex items-start gap-2 rounded-lg border border-warning/40 bg-warning/10 p-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
								className: "mt-0.5 size-4 shrink-0",
								"aria-hidden": "true"
							}),
							"Map these required fields before continuing: ",
							missing.join(", "),
							"."
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: reset,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
								className: "size-4",
								"aria-hidden": "true"
							}), "Choose another file"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: goToPreview,
							disabled: missing.length > 0,
							children: "Validate and preview"
						})]
					})
				]
			})] }) : null,
			step === 2 && validation ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							{
								label: "Rows in file",
								value: validation.totalRows
							},
							{
								label: "Valid rows",
								value: validation.validRows.length
							},
							{
								label: "Rows with errors",
								value: validation.totalRows - validation.validRows.length
							}
						].map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: stat.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl font-semibold tabular-nums",
								children: stat.value
							})]
						}) }, stat.label))
					}),
					validation.errors.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "border-destructive/40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
							className: "text-base",
							children: [
								validation.errors.length,
								" validation issue",
								validation.errors.length === 1 ? "" : "s"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "These rows will be skipped. Fix them in your spreadsheet and upload again to include them." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "max-h-56 space-y-1.5 overflow-y-auto text-sm",
							children: validation.errors.slice(0, 100).map((error, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-medium tabular-nums",
									children: ["Row ", error.rowNumber]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground",
									children: [
										error.field,
										": ",
										error.message
									]
								})]
							}, `${error.rowNumber}-${error.field}-${index}`))
						}) })]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-base",
						children: "Preview of valid rows"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Showing the first 10 rows that will be imported." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "p-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
								className: "bg-muted/60",
								children: [
									"Name",
									"Email",
									"Phone",
									"Address",
									"Organisation",
									"Type"
								].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									className: "whitespace-nowrap",
									children: h
								}, h))
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, { children: [validation.validRows.slice(0, 10).map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "whitespace-nowrap font-medium",
									children: row.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "max-w-52 truncate",
									children: row.email
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "whitespace-nowrap",
									children: row.phone
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "max-w-52 truncate text-muted-foreground",
									children: row.address || "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "max-w-44 truncate",
									children: row.organisation || "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "whitespace-nowrap",
									children: row.type
								})
							] }, `${row.email}-${index}`)), validation.validRows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								colSpan: 6,
								className: "py-10 text-center text-muted-foreground",
								children: "No valid rows to import."
							}) }) : null] })] })
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: () => setStep(1),
							disabled: commit.isPending,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
								className: "size-4",
								"aria-hidden": "true"
							}), "Back to mapping"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => void confirmImport(),
							disabled: commit.isPending || validation.validRows.length === 0,
							children: commit.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								className: "size-4 animate-spin",
								"aria-hidden": "true"
							}), "Importing…"] }) : `Confirm import of ${validation.validRows.length} rows`
						})]
					})
				]
			}) : null,
			step === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-col items-center gap-3 px-6 py-16 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-12 items-center justify-center rounded-full bg-success/15 text-success",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
							className: "size-6",
							"aria-hidden": "true"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: "Import complete"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [
							imported,
							" record",
							imported === 1 ? "" : "s",
							" were added to the database."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap justify-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
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
								children: "View records"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: reset,
							children: "Import another file"
						})]
					})
				]
			}) }) : null
		]
	});
}
function UploadExcelPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Upload Excel",
		description: "Import records from an Excel or CSV spreadsheet into the database.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadWizard, {})
	});
}
//#endregion
export { UploadExcelPage as component };
