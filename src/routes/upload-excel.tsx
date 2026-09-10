import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { UploadWizard } from "@/components/upload/UploadWizard";

export const Route = createFileRoute("/upload-excel")({
  head: () => ({
    meta: [
      { title: "Upload Excel — BlackCube Admin Panel" },
      {
        name: "description",
        content:
          "Import student, teacher and institute records from an Excel or CSV spreadsheet into the BlackCube database.",
      },
      { property: "og:title", content: "Upload Excel — BlackCube Admin Panel" },
      {
        property: "og:description",
        content: "Validate, map and preview spreadsheet rows before importing them into MongoDB.",
      },
    ],
  }),
  component: UploadExcelPage,
});

function UploadExcelPage() {
  return (
    <AppShell
      title="Upload Excel"
      description="Import records from an Excel or CSV spreadsheet into the database."
    >
      <UploadWizard />
    </AppShell>
  );
}
