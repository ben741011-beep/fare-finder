import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/_authenticated/app")({
  head: () => ({
    meta: [
      { title: "Dashboard — Flight Price Notifier" },
      { name: "description", content: "Your flight route tracking dashboard." },
      { property: "og:title", content: "Dashboard — Flight Price Notifier" },
      { property: "og:description", content: "Your flight route tracking dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AppShell,
});

function AppShell() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  return (
    <div className="min-h-screen bg-background hero-glow">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Hi {email ?? "…"}
        </h1>
        <div className="mt-8 rounded-2xl border border-dashed border-primary/40 bg-card p-10 text-center">
          <p className="text-lg font-medium text-card-foreground">
            你的航線追蹤儀表板即將上線 — 下一個里程碑會加上訂閱航線的功能。
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Your dashboard is coming soon. Route-subscription will be added in
            the next milestone.
          </p>
        </div>
      </main>
    </div>
  );
}
