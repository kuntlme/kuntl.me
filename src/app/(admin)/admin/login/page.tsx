"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/app/actions/admin";
import { Eye, EyeOff, Lock, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mainSiteOrigin, setMainSiteOrigin] = useState("");

  useEffect(() => {
    if (window.location.host.startsWith("admin.")) {
      setMainSiteOrigin(
        `${window.location.protocol}//${window.location.host.replace(/^admin\./, "")}`,
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Please enter the admin password.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const result = await loginAction(password);

      if (!result.ok) {
        setError(result.error || "Authentication failed.");
        setLoading(false);
        return;
      }

      const isSubdomain =
        typeof window !== "undefined" &&
        (window.location.hostname.startsWith("admin.kuntl.me") ||
          window.location.hostname.startsWith("admin.localhost"));

      router.push(isSubdomain ? "/" : "/admin");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <a
            href={`${mainSiteOrigin}/`}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 hover:text-green-600 dark:hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to portfolio
          </a>
        </div>

        <div className="relative border border-neutral-300 dark:border-neutral-800 bg-neutral-100/70 dark:bg-zinc-900/80 p-8 sm:p-10">
          {/* Architectural corner crosshairs */}
          <span
            aria-hidden="true"
            className="absolute -top-2.5 -left-2.5 w-5 h-5 flex items-center justify-center text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none"
          >
            +
          </span>
          <span
            aria-hidden="true"
            className="absolute -top-2.5 -right-2.5 w-5 h-5 flex items-center justify-center text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none"
          >
            +
          </span>
          <span
            aria-hidden="true"
            className="absolute -bottom-2.5 -left-2.5 w-5 h-5 flex items-center justify-center text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none"
          >
            +
          </span>
          <span
            aria-hidden="true"
            className="absolute -bottom-2.5 -right-2.5 w-5 h-5 flex items-center justify-center text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none"
          >
            +
          </span>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 flex items-center justify-center border border-neutral-300 dark:border-neutral-700 bg-neutral-200/60 dark:bg-zinc-800/80 text-green-600 dark:text-cyan-400">
              <Lock size={15} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Admin Access
            </h1>
          </div>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-8">
            Enter your password to manage blog posts and drafts.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  autoFocus
                  autoComplete="current-password"
                  placeholder="Enter admin password"
                  className={cn(
                    "w-full px-3.5 py-2.5 pr-10 text-sm font-mono bg-white/80 dark:bg-zinc-950/70",
                    "border transition-colors focus:outline-none",
                    error
                      ? "border-red-500 dark:border-red-500/80"
                      : "border-neutral-300 dark:border-neutral-700 focus:border-green-600 dark:focus:border-cyan-400",
                    "text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600",
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {error && (
                <p
                  role="alert"
                  className="mt-2 text-xs font-mono text-red-600 dark:text-red-400"
                >
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold",
                "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-zinc-900",
                "hover:bg-green-700 dark:hover:bg-cyan-400 dark:hover:text-zinc-950",
                "disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer",
              )}
            >
              {loading ? "Verifying..." : "Unlock Admin"}
              {!loading && <ArrowRight size={15} />}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
