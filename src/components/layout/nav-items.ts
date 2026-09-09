import { BarChart3, Database, Megaphone, UploadCloud } from "lucide-react";

export const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: BarChart3 },
  { to: "/manage-data", label: "Manage Data", icon: Database },
  { to: "/upload-excel", label: "Upload Excel", icon: UploadCloud },
  { to: "/social-ads", label: "Social & Ads", icon: Megaphone },
] as const;
