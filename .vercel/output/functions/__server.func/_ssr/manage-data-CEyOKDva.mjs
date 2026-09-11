import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime, a as Overlay2, c as Title2, d as DialogContent$1, f as DialogDescription$1, h as DialogTitle$1, i as Description2, l as Dialog$1, m as DialogPortal$1, n as Cancel, o as Portal2, p as DialogOverlay$1, r as Content2, s as Root2, t as Action, u as DialogClose } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as useCurrentUser, i as toApiMessage } from "./queries-BrHWFq0A.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as buttonVariants, r as cn, t as Button } from "./button-PwNqyxv_.mjs";
import { A as CircleCheck, C as Ellipsis, D as Clock, E as CloudUpload, G as ArrowDown, H as ArrowUpDown, I as Check, R as Building2, T as Database, V as ArrowUp, c as Search, d as Pencil, g as Inbox, h as LoaderCircle, j as CircleAlert, k as CircleMinus, l as SearchX, n as Users, o as TriangleAlert, s as Trash2, t as X, u as RotateCcw, v as GraduationCap, w as Download } from "../_libs/lucide-react.mjs";
import { n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { a as DropdownMenuTrigger, i as DropdownMenuItem, n as DropdownMenu, r as DropdownMenuContent, t as AppShell } from "./AppShell-CHk9u69c.mjs";
import { t as TablePagination } from "./TablePagination-Bi2nY3sv.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-BcaWptOW.mjs";
import { t as Skeleton } from "./skeleton-DcnTQsWF.mjs";
import { a as useBulkDeleteRecords, c as useDeleteRecord, i as summaryQuery, l as useExportRecords, o as useBulkUpdateRecords, r as recordsQuery, u as useUpdateRecord } from "./queries-GmUgzXC-.mjs";
import { a as LINK_STATUSES, i as DOWNLOAD_STATUSES, o as RECORD_TYPES, r as CATEGORY_TABS, s as recordInputSchema } from "./record-vheJP5m5.mjs";
import { t as Route } from "./manage-data-B7jGNGBc.mjs";
import { n as CardContent, t as Card } from "./card-C5Nmk_bj.mjs";
import { t as Label } from "./label-BeT0bXvu.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DamjaduW.mjs";
import { t as Input } from "./input-uzm9g8Y7.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useForm, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
import { i as Trigger, n as List, r as Root2$1, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/manage-data-CEyOKDva.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AlertDialog = Root2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
	className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
AlertDialogOverlay.displayName = Overlay2.displayName;
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props
})] }));
AlertDialogContent.displayName = Content2.displayName;
var AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
	ref,
	className: cn("text-lg font-semibold", className),
	...props
}));
AlertDialogTitle.displayName = Title2.displayName;
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
AlertDialogDescription.displayName = Description2.displayName;
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = Action.displayName;
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
	...props
}));
AlertDialogCancel.displayName = Cancel.displayName;
function BulkDeleteDialog({ selectedIds, isOpen, onOpenChange, onSuccess }) {
	const mutation = useBulkDeleteRecords();
	const count = selectedIds.size;
	const confirm = async () => {
		if (count === 0) return;
		try {
			await mutation.mutateAsync(Array.from(selectedIds));
			toast.success(`${count} record${count === 1 ? "" : "s"} deleted`);
			onSuccess();
			onOpenChange(false);
		} catch (error) {
			toast.error(toApiMessage(error, "The records could not be deleted"));
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
		open: isOpen,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogTitle, { children: [
			"Delete ",
			count,
			" selected record",
			count === 1 ? "" : "s",
			"?"
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "These records will be permanently removed from the database. This action cannot be undone." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
			disabled: mutation.isPending,
			children: "Cancel"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
			onClick: (event) => {
				event.preventDefault();
				confirm();
			},
			disabled: mutation.isPending || count === 0,
			className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
			children: mutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
				className: "size-4 animate-spin",
				"aria-hidden": "true"
			}), "Deleting…"] }) : "Delete"
		})] })] })
	});
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
function BulkUpdateDialog({ selectedIds, isOpen, onOpenChange, onSuccess }) {
	const mutation = useBulkUpdateRecords();
	const count = selectedIds.size;
	const [type, setType] = (0, import_react.useState)("");
	const [linkStatus, setLinkStatus] = (0, import_react.useState)("");
	const [downloadStatus, setDownloadStatus] = (0, import_react.useState)("");
	const handleOpenChange = (open) => {
		if (!open) {
			setType("");
			setLinkStatus("");
			setDownloadStatus("");
		}
		onOpenChange(open);
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		if (count === 0) return;
		const updates = {};
		if (type !== "") updates.type = type;
		if (linkStatus !== "") updates.linkStatus = linkStatus;
		if (downloadStatus !== "") updates.downloadStatus = downloadStatus;
		if (Object.keys(updates).length === 0) {
			toast.error("Please select at least one field to update");
			return;
		}
		try {
			await mutation.mutateAsync({
				ids: Array.from(selectedIds),
				updates
			});
			toast.success(`${count} record${count === 1 ? "" : "s"} updated successfully`);
			onSuccess();
			handleOpenChange(false);
		} catch (error) {
			toast.error(toApiMessage(error, "The records could not be updated"));
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: isOpen,
		onOpenChange: handleOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[90dvh] overflow-y-auto sm:max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: [
				"Update ",
				count,
				" selected record",
				count === 1 ? "" : "s"
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Only the fields you select below will be modified. Unselected fields will remain unchanged for all selected records." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "grid gap-4 mt-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "bulk-type",
							children: "Type"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: type,
							onValueChange: (v) => setType(v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								id: "bulk-type",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Unchanged" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: RECORD_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: t,
								children: t
							}, t)) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "bulk-linkStatus",
							children: "Link status"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: linkStatus,
							onValueChange: (v) => setLinkStatus(v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								id: "bulk-linkStatus",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Unchanged" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: LINK_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: s,
								children: s
							}, s)) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "bulk-downloadStatus",
							children: "Download status"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: downloadStatus,
							onValueChange: (v) => setDownloadStatus(v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								id: "bulk-downloadStatus",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Unchanged" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: DOWNLOAD_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: s,
								children: s
							}, s)) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							onClick: () => handleOpenChange(false),
							disabled: mutation.isPending,
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: mutation.isPending || count === 0,
							children: mutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								className: "size-4 animate-spin",
								"aria-hidden": "true"
							}), "Updating…"] }) : "Update records"
						})]
					})
				]
			})]
		})
	});
}
function DeleteRecordDialog({ record, onOpenChange }) {
	const mutation = useDeleteRecord();
	const confirm = async () => {
		if (!record) return;
		try {
			await mutation.mutateAsync(record.id);
			toast.success(`${record.name} was deleted`);
			onOpenChange(false);
		} catch (error) {
			toast.error(toApiMessage(error, "The record could not be deleted"));
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
		open: Boolean(record),
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Delete this record?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: record ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium text-foreground",
				children: record.name
			}),
			" (",
			record.email,
			") will be permanently removed from the database. This cannot be undone."
		] }) : null })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
			disabled: mutation.isPending,
			children: "Cancel"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
			onClick: (event) => {
				event.preventDefault();
				confirm();
			},
			disabled: mutation.isPending,
			className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
			children: mutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
				className: "size-4 animate-spin",
				"aria-hidden": "true"
			}), "Deleting…"] }) : "Delete record"
		})] })] })
	});
}
function FieldError({ id, message }) {
	if (!message) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		id,
		role: "alert",
		className: "text-xs font-medium text-destructive",
		children: message
	});
}
function EditRecordDialog({ record, onOpenChange }) {
	const mutation = useUpdateRecord();
	const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
		resolver: u(recordInputSchema),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			address: "",
			organisation: "",
			type: "Student",
			linkStatus: "Pending",
			downloadStatus: "Not Downloaded"
		}
	});
	(0, import_react.useEffect)(() => {
		if (!record) return;
		reset({
			name: record.name,
			email: record.email,
			phone: record.phone,
			address: record.address,
			organisation: record.organisation,
			type: record.type,
			linkStatus: record.linkStatus,
			downloadStatus: record.downloadStatus
		});
	}, [record, reset]);
	const onSubmit = handleSubmit(async (values) => {
		if (!record) return;
		try {
			await mutation.mutateAsync({
				id: record.id,
				input: values
			});
			toast.success("Record updated");
			onOpenChange(false);
		} catch (error) {
			toast.error(toApiMessage(error, "The record could not be updated"));
		}
	});
	const type = watch("type");
	const linkStatus = watch("linkStatus");
	const downloadStatus = watch("downloadStatus");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: Boolean(record),
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[90dvh] overflow-y-auto sm:max-w-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Update record" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Changes are saved to the database and only then reflected in the table." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "grid gap-4",
				noValidate: true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "name",
								children: "Name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "name",
								...register("name"),
								"aria-invalid": Boolean(errors.name),
								"aria-describedby": errors.name ? "name-error" : void 0
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, {
								id: "name-error",
								message: errors.name?.message
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "email",
									children: "Email"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "email",
									type: "email",
									...register("email"),
									"aria-invalid": Boolean(errors.email),
									"aria-describedby": errors.email ? "email-error" : void 0
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, {
									id: "email-error",
									message: errors.email?.message
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "phone",
									children: "Phone"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "phone",
									...register("phone"),
									"aria-invalid": Boolean(errors.phone),
									"aria-describedby": errors.phone ? "phone-error" : void 0
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, {
									id: "phone-error",
									message: errors.phone?.message
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "address",
								children: "Address"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "address",
								...register("address")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, {
								id: "address-error",
								message: errors.address?.message
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "organisation",
									children: "Organisation"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "organisation",
									...register("organisation")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, {
									id: "organisation-error",
									message: errors.organisation?.message
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "type",
								children: "Type"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: type,
								onValueChange: (v) => setValue("type", v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									id: "type",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select type" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: RECORD_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: t,
									children: t
								}, t)) })]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "linkStatus",
								children: "Link status"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: linkStatus,
								onValueChange: (v) => setValue("linkStatus", v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									id: "linkStatus",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select status" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: LINK_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: s,
									children: s
								}, s)) })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "downloadStatus",
								children: "Download status"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: downloadStatus,
								onValueChange: (v) => setValue("downloadStatus", v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									id: "downloadStatus",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select status" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: DOWNLOAD_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: s,
									children: s
								}, s)) })]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "mt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							onClick: () => onOpenChange(false),
							disabled: mutation.isPending,
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: mutation.isPending,
							children: mutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								className: "size-4 animate-spin",
								"aria-hidden": "true"
							}), "Saving…"] }) : "Save changes"
						})]
					})
				]
			})]
		})
	});
}
/**
* Hook to debounce a rapidly changing value.
* Useful for delaying API calls until the user has stopped typing.
*/
function useDebounce(value, delay = 400) {
	const [debouncedValue, setDebouncedValue] = (0, import_react.useState)(value);
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);
		return () => {
			clearTimeout(timer);
		};
	}, [value, delay]);
	return debouncedValue;
}
function FiltersToolbar({ value, onChange, onReset, hasActiveFilters }) {
	const [localQ, setLocalQ] = (0, import_react.useState)(value.q);
	const debouncedQ = useDebounce(localQ, 400);
	(0, import_react.useEffect)(() => {
		if (value.q !== debouncedQ) setLocalQ(value.q);
	}, [value.q, debouncedQ]);
	(0, import_react.useEffect)(() => {
		if (debouncedQ !== value.q) onChange({ q: debouncedQ });
	}, [
		debouncedQ,
		value.q,
		onChange
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		"aria-label": "Search and filters",
		className: "rounded-xl border border-border bg-card p-4 shadow-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))_auto] lg:items-end",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "search",
						children: "Search"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "search",
							type: "search",
							value: localQ,
							placeholder: "Name, email or phone",
							onChange: (e) => setLocalQ(e.target.value),
							className: "pl-9"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "link-status",
						children: "Link status"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: value.link,
						onValueChange: (v) => onChange({ link: v }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							id: "link-status",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							children: "All link statuses"
						}), LINK_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: s,
							children: s
						}, s))] })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "download-status",
						children: "Download status"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: value.download,
						onValueChange: (v) => onChange({ download: v }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							id: "download-status",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							children: "All download statuses"
						}), DOWNLOAD_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: s,
							children: s
						}, s))] })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "date-added",
						children: "Date added"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: value.date,
						onValueChange: (v) => onChange({ date: v }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							id: "date-added",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "all",
								children: "Any time"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "today",
								children: "Last 24 hours"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "7d",
								children: "Last 7 days"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "30d",
								children: "Last 30 days"
							})
						] })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					onClick: onReset,
					disabled: !hasActiveFilters,
					className: "w-full lg:w-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
						className: "size-4",
						"aria-hidden": "true"
					}), "Reset"]
				})
			]
		})
	});
}
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: cn("grid place-content-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
var base = "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap";
function LinkStatusBadge({ status }) {
	const { cls, Icon } = {
		Sent: {
			cls: "border-success/30 bg-success/10 text-success",
			Icon: CircleCheck
		},
		Pending: {
			cls: "border-warning/40 bg-warning/10 text-warning-foreground dark:text-warning",
			Icon: Clock
		},
		Failed: {
			cls: "border-destructive/30 bg-destructive/10 text-destructive",
			Icon: TriangleAlert
		}
	}[status];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn(base, cls),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "size-3.5",
			"aria-hidden": "true"
		}), status]
	});
}
function DownloadStatusBadge({ status }) {
	const downloaded = status === "Downloaded";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn(base, downloaded ? "border-info/30 bg-info/10 text-info" : "border-border bg-muted text-muted-foreground"),
		children: [downloaded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
			className: "size-3.5",
			"aria-hidden": "true"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleMinus, {
			className: "size-3.5",
			"aria-hidden": "true"
		}), status]
	});
}
var SORTABLE_COLUMNS = [
	{
		label: "Name",
		sortField: "name"
	},
	{
		label: "Email",
		sortField: "email"
	},
	{
		label: "Phone",
		sortField: "phoneNumber"
	},
	{
		label: "Address",
		sortField: "address"
	},
	{
		label: "Organisation",
		sortField: "organisation"
	},
	{
		label: "Type",
		sortField: "type"
	},
	{
		label: "Link Status",
		sortField: "linkStatus"
	},
	{
		label: "Download Status",
		sortField: "downloadStatus"
	},
	{
		label: "Added On",
		sortField: "dateAdded"
	}
];
function formatDate(iso) {
	return new Date(iso).toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric"
	});
}
function StateBlock({ icon: Icon, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center gap-3 px-6 py-16 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: "size-6",
					"aria-hidden": "true"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-base font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-sm text-sm text-muted-foreground",
				children
			})
		]
	});
}
function RecordsTable(props) {
	const { records, isLoading, isError, errorMessage, onRetry, startIndex, selected, onToggle, onToggleAll, onEdit, onDelete, hasFilters, onResetFilters, sortBy, sortOrder, onSort, isAdmin = false } = props;
	const allSelected = records.length > 0 && records.every((r) => selected.has(r.id));
	if (isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-xl border border-border bg-card shadow-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StateBlock, {
			icon: CircleAlert,
			title: "We couldn't load your records",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: errorMessage ?? "The request failed. Please try again." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-4",
				onClick: onRetry,
				children: "Try again"
			})]
		})
	});
	if (!isLoading && records.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-xl border border-border bg-card shadow-sm",
		children: hasFilters ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StateBlock, {
			icon: SearchX,
			title: "No records match your filters",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Try a different search term, or clear the filters to see everything again." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				className: "mt-4",
				onClick: onResetFilters,
				children: "Reset filters"
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StateBlock, {
			icon: Inbox,
			title: "No records yet",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Import an Excel or CSV file to populate the database with records." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/upload-excel",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {
						className: "size-4",
						"aria-hidden": "true"
					}), "Upload Excel"]
				})
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden rounded-xl border border-border bg-card shadow-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-full overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
					className: "sr-only",
					children: "Imported records with update and delete actions"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
					className: "bg-muted/60",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "w-10",
							children: isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								checked: allSelected,
								onCheckedChange: onToggleAll,
								"aria-label": "Select all records on this page",
								disabled: isLoading || records.length === 0
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "w-12 whitespace-nowrap text-xs font-semibold uppercase tracking-wide",
							children: "S.N."
						}),
						SORTABLE_COLUMNS.map((col) => {
							const isActive = sortBy === col.sortField;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "whitespace-nowrap text-xs font-semibold uppercase tracking-wide group",
								"aria-sort": isActive ? sortOrder === "asc" ? "ascending" : "descending" : "none",
								children: col.sortField ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => onSort?.(col.sortField),
									className: "-ml-2 flex items-center gap-1 rounded-md px-2 py-1 hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
									children: [col.label, isActive ? sortOrder === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, {
										className: "size-3.5",
										"aria-hidden": "true"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, {
										className: "size-3.5",
										"aria-hidden": "true"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, {
										className: "size-3.5 opacity-0 transition-opacity group-hover:opacity-50",
										"aria-hidden": "true"
									})]
								}) : col.label
							}, col.label);
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "w-20 whitespace-nowrap text-xs font-semibold uppercase tracking-wide sticky right-0 bg-muted/95 backdrop-blur-sm shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)]",
							children: "Action"
						})
					]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: isLoading ? Array.from({ length: 8 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: Array.from({ length: 12 }).map((_, colIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-full min-w-14" }) }, colIdx)) }, `skeleton-${i}`)) : records.map((record, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
					"data-state": selected.has(record.id) ? "selected" : void 0,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
							checked: selected.has(record.id),
							onCheckedChange: () => onToggle(record.id),
							"aria-label": `Select ${record.name}`
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "tabular-nums text-muted-foreground",
							children: startIndex + index + 1
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "font-medium whitespace-nowrap",
							children: record.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "max-w-52 truncate",
							children: record.email
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "whitespace-nowrap tabular-nums",
							children: record.phone
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "max-w-56 truncate text-muted-foreground",
							children: record.address || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "max-w-44 truncate",
							children: record.organisation || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "whitespace-nowrap",
							children: record.type
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkStatusBadge, { status: record.linkStatus }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DownloadStatusBadge, { status: record.downloadStatus }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "whitespace-nowrap text-muted-foreground",
							children: formatDate(record.createdAt)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "sticky right-0 bg-card shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									"aria-label": "Open menu",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, {
										className: "size-4",
										"aria-hidden": "true"
									})
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
								align: "end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									onClick: () => onEdit(record),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
										className: "mr-2 size-4",
										"aria-hidden": "true"
									}), "Edit"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									onClick: () => onDelete(record),
									className: "text-destructive focus:text-destructive focus:bg-destructive/10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
										className: "mr-2 size-4",
										"aria-hidden": "true"
									}), "Delete"]
								})]
							})] })
						})
					]
				}, record.id)) })
			] })
		})
	});
}
var CARDS = [
	{
		key: "all",
		label: "All Data",
		icon: Database,
		hint: "Total records in database"
	},
	{
		key: "students",
		label: "Students",
		icon: GraduationCap,
		hint: "Type: Student"
	},
	{
		key: "teachers",
		label: "Teachers",
		icon: Users,
		hint: "Type: Teacher"
	},
	{
		key: "institutes",
		label: "Institutes",
		icon: Building2,
		hint: "Type: Institute"
	}
];
function SummaryCards({ data, isLoading }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		"aria-label": "Summary",
		className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4",
		children: CARDS.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "border-border/70 shadow-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex items-center gap-4 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(card.icon, {
						className: "size-5",
						"aria-hidden": "true"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-muted-foreground",
							children: card.label
						}),
						isLoading || !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-1.5 h-7 w-14" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl font-semibold tabular-nums",
							children: data[card.key].toLocaleString()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "sr-only",
							children: card.hint
						})
					]
				})]
			})
		}, card.key))
	});
}
var Tabs = Root2$1;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
var PAGE_SIZE = 10;
var DEFAULTS = {
	tab: "all",
	q: "",
	link: "all",
	download: "all",
	date: "all",
	page: 1,
	sort: "",
	order: ""
};
function ManageDataPage() {
	const { data: user } = useCurrentUser();
	const isAdmin = user?.role === "ADMIN";
	const search = Route.useSearch();
	const navigate = useNavigate({ from: Route.fullPath });
	const [selected, setSelected] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [deleting, setDeleting] = (0, import_react.useState)(null);
	const [bulkUpdating, setBulkUpdating] = (0, import_react.useState)(false);
	const [bulkDeleting, setBulkDeleting] = (0, import_react.useState)(false);
	const setSearch = (patch) => {
		navigate({
			to: ".",
			search: (prev) => ({
				...prev,
				...patch,
				page: patch.page ?? 1
			}),
			replace: true
		});
	};
	const activeType = (0, import_react.useMemo)(() => CATEGORY_TABS.find((t) => t.key === search.tab)?.type ?? null, [search.tab]);
	const listQuery = useQuery(recordsQuery({
		page: search.page,
		pageSize: PAGE_SIZE,
		search: search.q,
		type: activeType,
		linkStatus: search.link,
		downloadStatus: search.download,
		dateAdded: search.date,
		sortBy: search.sort || void 0,
		sortOrder: search.order || void 0
	}));
	const summary = useQuery(summaryQuery());
	const exportMutation = useExportRecords();
	const records = listQuery.data?.items ?? [];
	const total = listQuery.data?.total ?? 0;
	const page = listQuery.data?.page ?? search.page;
	const totalPages = listQuery.data?.totalPages ?? 1;
	const startIndex = (page - 1) * PAGE_SIZE;
	const hasFilters = search.q !== "" || search.link !== "all" || search.download !== "all" || search.date !== "all";
	const resetFilters = () => setSearch({
		q: DEFAULTS.q,
		link: DEFAULTS.link,
		download: DEFAULTS.download,
		date: DEFAULTS.date
	});
	const toggle = (id) => setSelected((prev) => {
		const next = new Set(prev);
		if (next.has(id)) next.delete(id);
		else next.add(id);
		return next;
	});
	const toggleAll = () => setSelected((prev) => {
		const allSelected = records.length > 0 && records.every((r) => prev.has(r.id));
		const next = new Set(prev);
		records.forEach((r) => allSelected ? next.delete(r.id) : next.add(r.id));
		return next;
	});
	const handleSort = (field) => {
		let nextOrder = "asc";
		if (search.sort === field) if (search.order === "asc") nextOrder = "desc";
		else nextOrder = "asc";
		setSearch({
			sort: field,
			order: nextOrder,
			page: 1
		});
	};
	const handleExport = (format) => {
		if (total === 0) {
			toast.error("No records available to export.");
			return;
		}
		const query = {
			page: search.page,
			pageSize: PAGE_SIZE,
			search: search.q,
			type: activeType,
			linkStatus: search.link,
			downloadStatus: search.download,
			dateAdded: search.date,
			sortBy: search.sort || void 0,
			sortOrder: search.order || void 0
		};
		const loadingId = toast.loading(`Exporting records as ${format.toUpperCase()}...`);
		exportMutation.mutate({
			query,
			format
		}, {
			onSuccess: () => {
				toast.success(`${format.toUpperCase()} file exported successfully.`, { id: loadingId });
			},
			onError: (err) => {
				toast.error(err instanceof Error ? err.message : "Export failed", { id: loadingId });
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Manage Data",
		description: "Browse, search and maintain every record imported from your spreadsheets.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					disabled: exportMutation.isPending,
					children: [exportMutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
						className: "mr-2 size-4 animate-spin",
						"aria-hidden": "true"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
						className: "mr-2 size-4",
						"aria-hidden": "true"
					}), "Export"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
				align: "end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
					onClick: () => handleExport("csv"),
					children: "Export as CSV"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
					onClick: () => handleExport("xlsx"),
					children: "Export as Excel"
				})]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/upload-excel",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {
						className: "size-4",
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden sm:inline",
						children: "Upload Excel"
					})]
				})
			})]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCards, {
						data: summary.data,
						isLoading: summary.isPending
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
						value: search.tab,
						onValueChange: (v) => setSearch({ tab: v }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full overflow-x-auto pb-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, {
								"aria-label": "Record categories",
								className: "w-max",
								children: CATEGORY_TABS.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: tab.key,
									className: "whitespace-nowrap",
									children: tab.label
								}, tab.key))
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiltersToolbar, {
						value: {
							q: search.q,
							link: search.link,
							download: search.download,
							date: search.date
						},
						onChange: (patch) => setSearch(patch),
						onReset: resetFilters,
						hasActiveFilters: hasFilters
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"aria-live": "polite",
							children: listQuery.isPending ? "Loading records…" : `${total} record${total === 1 ? "" : "s"} found`
						}), isAdmin && selected.size > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-medium text-foreground",
									children: [selected.size, " selected"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => setBulkUpdating(true),
									children: "Bulk Update"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "destructive",
									size: "sm",
									onClick: () => setBulkDeleting(true),
									children: "Bulk Delete"
								})
							]
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordsTable, {
						records,
						isLoading: listQuery.isPending,
						isError: listQuery.isError,
						errorMessage: listQuery.error ? toApiMessage(listQuery.error) : void 0,
						onRetry: () => void listQuery.refetch(),
						startIndex,
						selected,
						onToggle: toggle,
						onToggleAll: toggleAll,
						onEdit: setEditing,
						onDelete: setDeleting,
						hasFilters,
						onResetFilters: resetFilters,
						sortBy: search.sort,
						sortOrder: search.order,
						onSort: handleSort,
						isAdmin
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TablePagination, {
						page,
						totalPages,
						total,
						startIndex,
						count: records.length,
						onPageChange: (p) => setSearch({ page: p })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditRecordDialog, {
				record: editing,
				onOpenChange: (open) => !open && setEditing(null)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteRecordDialog, {
				record: deleting,
				onOpenChange: (open) => !open && setDeleting(null)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BulkUpdateDialog, {
				isOpen: bulkUpdating,
				onOpenChange: setBulkUpdating,
				selectedIds: selected,
				onSuccess: () => setSelected(/* @__PURE__ */ new Set())
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BulkDeleteDialog, {
				isOpen: bulkDeleting,
				onOpenChange: setBulkDeleting,
				selectedIds: selected,
				onSuccess: () => setSelected(/* @__PURE__ */ new Set())
			})
		]
	});
}
//#endregion
export { ManageDataPage as component };
