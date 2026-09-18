import { Component, useEffect, useState, type ErrorInfo, type ReactNode } from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router";
import { supabase } from "@/integrations/supabase/client";
import { reportLovableError } from "@/lib/lovable-error-reporting";
import { AppShell } from "@/routes/_authenticated/app";
import { AuthPage } from "@/routes/auth";
import { Landing } from "@/routes/index";

const defaultDescription =
  "設定航線與目標價，機票降價就通知你。Set a route and a target price — we email you when the fare drops.";

function DocumentMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const isDashboard = pathname === "/app";
    const isAuth = pathname === "/sign-in" || pathname === "/sign-up" || pathname === "/auth";
    const title = isDashboard
      ? "Dashboard — Flight Price Notifier"
      : isAuth
        ? "Sign in — Flight Price Notifier"
        : "Flight Price Notifier — 機票降價通知";
    const description = isDashboard
      ? "Your flight route tracking dashboard."
      : isAuth
        ? "Sign in or create your Flight Price Notifier account."
        : defaultDescription;

    document.title = title;
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]']) {
      document.querySelector(selector)?.setAttribute("content", description);
    }
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document
      .querySelector('meta[name="twitter:card"]')
      ?.setAttribute("content", isAuth || isDashboard ? "summary" : "summary_large_image");
  }, [pathname]);

  return null;
}

function RequireAuth({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    let active = true;
    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (active) setAuthenticated(Boolean(data.session));
      })
      .catch(() => {
        if (active) setAuthenticated(false);
      });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setAuthenticated(Boolean(session));
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  if (authenticated === null) return null;
  if (!authenticated) return <Navigate to="/sign-in" replace state={{ from: location }} />;
  return children;
}

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

class AppErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  override state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  override componentDidCatch(error: Error, _info: ErrorInfo) {
    console.error(error);
    reportLovableError(error, { boundary: "react_root_error_component" });
  }

  override render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            This page didn't load
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Something went wrong on our end. You can try refreshing or head back home.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Try again
            </button>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Go home
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export function App() {
  return (
    <AppErrorBoundary>
      <DocumentMeta />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/app"
          element={
            <RequireAuth>
              <AppShell />
            </RequireAuth>
          }
        />
        <Route path="/sign-in" element={<AuthPage mode="signin" />} />
        <Route path="/sign-up" element={<AuthPage mode="signup" />} />
        <Route path="/auth" element={<Navigate to="/sign-in" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppErrorBoundary>
  );
}
