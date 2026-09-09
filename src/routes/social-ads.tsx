import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/social-ads")({
  head: () => ({
    meta: [
      { title: "Social & Ads — BlackCube Admin Panel" },
      {
        name: "description",
        content: "Campaign and social outreach tools for the BlackCube admin panel.",
      },
      { property: "og:title", content: "Social & Ads — BlackCube Admin Panel" },
      {
        property: "og:description",
        content: "Campaign and social outreach tools for the BlackCube admin panel.",
      },
    ],
  }),
  component: SocialAdsPage,
});

function SocialAdsPage() {
  return (
    <AppShell title="Social & Ads" description="Outreach campaigns built on your imported records.">
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center gap-3 px-6 py-20 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Megaphone className="size-6" aria-hidden="true" />
          </span>
          <h2 className="text-base font-semibold">Campaign tools are coming soon</h2>
          <p className="max-w-md text-sm text-muted-foreground">
            This area will let you launch social and advertising campaigns against the audiences you
            build in Manage Data.
          </p>
        </CardContent>
      </Card>
    </AppShell>
  );
}
