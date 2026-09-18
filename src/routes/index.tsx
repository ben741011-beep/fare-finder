import { Link } from "react-router";
import { Plane, Bell, Bird } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Reveal } from "@/components/Reveal";

const features = [
  {
    icon: Plane,
    title: "盯緊熱門航線",
    subtitle: "Always-on route watching",
    body: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。",
  },
  {
    icon: Bell,
    title: "達標自動通知",
    subtitle: "Target-price email alerts",
    body: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。",
  },
  {
    icon: Bird,
    title: "隨時取消",
    subtitle: "Cancel anytime",
    body: "月訂閱制，不想用隨時停，沒有綁約。",
  },
];

export function Landing() {
  return (
    <div className="coast-page min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="coast-hero relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:pb-28 lg:pt-20">
          <div className="relative z-10 min-w-0 max-w-xl">
            <Reveal>
              <p className="coast-eyebrow mb-7 inline-flex items-center gap-3 text-sm font-medium tracking-[0.22em] text-primary">
                <span className="coast-eyebrow-line" aria-hidden="true" />
                機票降價通知
              </p>
              <h1 className="coast-display text-4xl leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl">
                Flight Price <span className="text-primary">Notifier</span>
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-9 max-w-lg text-xl font-semibold leading-relaxed text-foreground sm:text-2xl">
                設定航線與目標價，機票降價就通知你
              </p>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
                Set a route and a target price — we email you when the fare drops.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-10">
                <Link
                  to="/sign-in"
                  className="coast-button inline-flex items-center justify-center rounded-full bg-primary px-9 py-4 text-base font-semibold text-primary-foreground transition-all hover:brightness-110 card-glow"
                >
                  Sign in / 登入
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <div className="coast-photo-frame" aria-hidden="true">
              <img src="/sunset-coast.png" alt="" className="coast-photo" fetchPriority="high" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="coast-features mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
        <Reveal>
          <h2 className="coast-display text-center text-3xl tracking-tight sm:text-4xl">
            為什麼選擇 Flight Price Notifier
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 120}>
              <article className="coast-feature-card h-full rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/40">
                <f.icon className="size-8 text-primary" aria-hidden strokeWidth={1.75} />
                <h3 className="mt-4 text-lg font-semibold text-card-foreground">{f.title}</h3>
                <p className="text-sm font-medium text-primary">{f.subtitle}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="coast-footer border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-muted-foreground sm:px-6">
          © 2026 Flight Price Notifier
        </div>
      </footer>
    </div>
  );
}
