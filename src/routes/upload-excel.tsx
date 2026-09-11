import { redirect } from "@tanstack/react-router";
import { authKeys } from "@/features/auth/queries";
import { getMe } from "@/services/auth-service";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { UploadWizard } from "@/components/upload/UploadWizard";

export const Route = createFileRoute("/upload-excel")({
  beforeLoad: async ({ context: { queryClient } }) => {
    // Skip auth check during SSR — the server cannot access browser HttpOnly cookies.
    // Auth will be verified client-side after hydration.
    if (typeof window === "undefined") return;
    if (!localStorage.getItem("auth_token")) {
      throw redirect({ to: "/sign-in", replace: true });
    }
    try {
      await queryClient.ensureQueryData({
        queryKey: authKeys.currentUser,
        queryFn: getMe,
      });
    } catch {
      throw redirect({ to: "/sign-in", replace: true });
    }
  },
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
