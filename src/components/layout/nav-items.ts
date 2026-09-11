import { BarChart3, Database, Megaphone, UploadCloud, History, FileKey2 } from "lucide-react";

export const getNavItems = (role?: "ADMIN" | "VIEWER") => {
  const items = [
    { to: "/", label: "Dashboard", icon: BarChart3 },
    { to: "/manage-data", label: "Manage Data", icon: Database },
  ];

  if (role === "ADMIN") {
    items.push({ to: "/upload-excel", label: "Upload Excel", icon: UploadCloud });
    items.push({ to: "/import-history", label: "Import History", icon: History });
    items.push({ to: "/audit-log", label: "Audit Log", icon: FileKey2 });
  }

  items.push({ to: "/social-ads", label: "Social & Ads", icon: Megaphone });
  return items;
};
