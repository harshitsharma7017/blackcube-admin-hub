# BlackCube Manage Data Panel — Frontend Build

A production-quality admin panel front end for managing people records imported from Excel/CSV files, built to the PRD, architecture, and UX/UI specs.

## What gets built

**Pages**

- Dashboard — overview with counts and quick links.
- Manage Data — the main screen: summary cards, category tabs, search + filters, data table, pagination, edit and delete dialogs.
- Upload Excel — multi-step import wizard (choose file → validate → map columns → preview → confirm).
- Social & Ads — placeholder page so navigation is complete.

**Manage Data screen**

- Summary cards: All Data, Students, Teachers, Institutes with live counts.
- Tabs: All Data, Students, Teachers, Mentors, Job Seekers, Institutes, Others.
- Search by name, email or phone.
- Filters: Link Status, Download Status, Date Added, plus Reset.
- Table columns: checkbox, S.N., Name, Email, Phone, Address, Organisation, Type, Link Status, Download Status, Added On, Action.
- Row actions: Update (validated form) and Delete (confirmation naming the record).
- Result count line and pagination with correct serial numbering across pages.

**Upload wizard**

- Drag-and-drop or browse; accepts .xlsx, .xls, .csv with a size limit.
- Parses the file, normalises headers, lets the admin map spreadsheet columns to the canonical fields.
- Row-by-row validation with a clear per-row error list, valid-row preview, then confirmed import.
- After import, the Manage Data screen and counts refresh automatically.

**States and quality**

- Loading skeletons that hold layout, empty state pointing to Upload Excel, no-results state with Reset Filters, success toasts, readable errors with retry.
- Responsive: full sidebar on desktop, compact on tablet, drawer navigation and scrollable table region on mobile; no horizontal page overflow.
- Accessible: semantic labels, keyboard navigation, visible focus, accessible dialogs, status shown with text and icon rather than colour alone.

## Technical notes

- Data layer is a typed mock service behind an API-shaped abstraction: `listRecords`, `getSummary`, `updateRecord`, `deleteRecord`, `parseImportFile`, `commitImport` — all async, paginated and filtered server-style, with simulated latency and error paths. Records persist in browser storage so a refresh keeps imported data, matching the acceptance criteria while there is no server.
- Swapping to the future Express + Mongoose REST API means replacing the service implementations with Axios calls against the same typed DTOs; query keys, hooks and components stay unchanged.
- TanStack Query owns fetching, caching and invalidation; Zod owns record and row validation; SheetJS (`xlsx`) parses workbooks and CSV in the browser.
- Routing uses TanStack Router, which is the router this project is fixed to; the requested React Router is not supported here. Route files map one-to-one to the pages above, each with its own page metadata.
- Design system: a premium dark-slate admin theme with semantic status tokens defined in the stylesheet, no hardcoded colours in components.

## Verification

Production build must compile clean, and each acceptance check is exercised: refresh keeps imported records, counts match stored data, every tab filters correctly, search and filters run through the service query layer, invalid rows get actionable feedback, mapping and preview precede import, update/delete only alter the UI after a successful service response, and pagination numbering stays correct.
