"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BlogPost, formatPostDate } from "@/data/blog";
import {
  deletePostAction,
  logoutAction,
  togglePublishAction,
} from "@/app/actions/admin";
import { cn } from "@/lib/utils";
import {
  Plus,
  LogOut,
  ExternalLink,
  Pencil,
  Trash2,
  Search,
  Check,
  X,
  Eye,
  EyeOff,
} from "lucide-react";

interface AdminDashboardProps {
  initialPosts: BlogPost[];
}

type FilterTab = "all" | "published" | "drafts";

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  initialPosts,
}) => {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [filter, setFilter] = useState<FilterTab>("all");
  const [search, setSearch] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mainSiteOrigin, setMainSiteOrigin] = useState("");

  useEffect(() => {
    if (window.location.host.startsWith("admin.")) {
      setMainSiteOrigin(
        `${window.location.protocol}//${window.location.host.replace(/^admin\./, "")}`,
      );
    }
  }, []);

  const counts = useMemo(() => {
    const published = posts.filter((p) => p.published !== false).length;
    return {
      all: posts.length,
      published,
      drafts: posts.length - published,
    };
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const isPublished = post.published !== false;
      if (filter === "published" && !isPublished) return false;
      if (filter === "drafts" && isPublished) return false;

      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        post.title.toLowerCase().includes(q) ||
        post.slug.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [posts, filter, search]);

  const handleTogglePublish = async (post: BlogPost) => {
    setBusyId(post.id);
    setError(null);
    const nextPublished = !(post.published !== false);

    try {
      const result = await togglePublishAction(post.id, nextPublished);
      if (!result.ok || !result.post) {
        throw new Error(result.error || "Failed to update status.");
      }

      setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? result.post! : p)),
      );
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update post.");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id: number) => {
    setBusyId(id);
    setError(null);

    try {
      const result = await deletePostAction(id);
      if (!result.ok) {
        throw new Error(result.error || "Failed to delete post.");
      }

      setPosts((prev) => prev.filter((p) => p.id !== id));
      setConfirmDeleteId(null);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete post.");
    } finally {
      setBusyId(null);
    }
  };

  const handleLogout = async () => {
    await logoutAction();
    const isSubdomain =
      typeof window !== "undefined" &&
      (window.location.hostname.startsWith("admin.kuntl.me") ||
        window.location.hostname.startsWith("admin.localhost"));
    router.push(isSubdomain ? "/login" : "/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen w-full max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* Top Bar */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-neutral-300 dark:border-neutral-800">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Admin Console
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Manage your hand-written blog posts, drafts, and timeline entries.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={`${mainSiteOrigin}/blog`}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-green-600 dark:hover:border-cyan-400 hover:text-green-700 dark:hover:text-cyan-400 transition-colors"
          >
            <ExternalLink size={14} />
            View Blog
          </a>

          <Link
            href="/admin/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-zinc-900 hover:bg-green-700 dark:hover:bg-cyan-400 dark:hover:text-zinc-950 transition-colors"
          >
            <Plus size={14} />
            New Post
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono border border-neutral-300 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400 hover:border-red-400 dark:hover:border-red-500/60 transition-colors cursor-pointer"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </header>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6">
        <div className="flex items-center gap-1 border border-neutral-300 dark:border-neutral-800 p-1 bg-neutral-100/60 dark:bg-zinc-950/40 w-fit">
          {(
            [
              { key: "all", label: `All (${counts.all})` },
              { key: "published", label: `Published (${counts.published})` },
              { key: "drafts", label: `Drafts (${counts.drafts})` },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilter(tab.key)}
              className={cn(
                "px-3 py-1.5 text-xs font-mono transition-colors cursor-pointer",
                filter === tab.key
                  ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-zinc-900 font-semibold"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts or tags..."
            className="w-full pl-9 pr-3 py-2 text-xs font-mono bg-white/70 dark:bg-zinc-950/50 border border-neutral-300 dark:border-neutral-800 focus:border-green-600 dark:focus:border-cyan-400 focus:outline-none text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
          />
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-6 px-4 py-3 text-xs font-mono border border-red-400 dark:border-red-500/60 bg-red-500/10 text-red-700 dark:text-red-300"
        >
          {error}
        </div>
      )}

      {/* Posts List Frame */}
      <div className="relative border border-neutral-300 dark:border-neutral-800 bg-neutral-100/50 dark:bg-zinc-900/60">
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

        {filteredPosts.length === 0 ? (
          <div className="py-16 px-6 text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              {search.trim()
                ? "No posts match your search."
                : "No posts in this view yet."}
            </p>
            <Link
              href="/admin/new"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-zinc-900 hover:bg-green-700 dark:hover:bg-cyan-400 transition-colors"
            >
              <Plus size={14} />
              Write your first post
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-neutral-300 dark:divide-neutral-800">
            {filteredPosts.map((post) => {
              const isPublished = post.published !== false;
              const isConfirming = confirmDeleteId === post.id;
              const isBusy = busyId === post.id;

              return (
                <div
                  key={post.id}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 hover:bg-neutral-200/40 dark:hover:bg-zinc-800/30 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-mono border",
                          isPublished
                            ? "border-green-600/40 dark:border-cyan-400/40 text-green-700 dark:text-cyan-300 bg-green-500/10 dark:bg-cyan-400/10"
                            : "border-amber-600/40 dark:border-amber-400/40 text-amber-700 dark:text-amber-300 bg-amber-500/10",
                        )}
                      >
                        <span
                          className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            isPublished
                              ? "bg-green-600 dark:bg-cyan-400"
                              : "bg-amber-500",
                          )}
                        />
                        {isPublished ? "Published" : "Draft"}
                      </span>

                      <time className="text-[11px] font-mono text-neutral-500 dark:text-neutral-500">
                        \ {formatPostDate(post.publishedAt).toLowerCase()}
                      </time>

                      <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-600 truncate">
                        /blog/{post.slug}
                      </span>
                    </div>

                    <Link
                      href={`/admin/edit/${post.id}`}
                      className="block group"
                    >
                      <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-green-600 dark:group-hover:text-cyan-400 transition-colors truncate">
                        {post.title}
                      </h2>
                    </Link>

                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="border border-neutral-300 dark:border-neutral-700/70 rounded px-1.5 py-0.5 text-[11px] text-neutral-600 dark:text-neutral-400 bg-neutral-200/40 dark:bg-zinc-800/40"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Row Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => handleTogglePublish(post)}
                      title={isPublished ? "Move to Drafts" : "Publish Post"}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-green-600 dark:hover:border-cyan-400 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {isPublished ? <EyeOff size={13} /> : <Eye size={13} />}
                      {isPublished ? "Unpublish" : "Publish"}
                    </button>

                    <Link
                      href={`/admin/edit/${post.id}`}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:border-green-600 dark:hover:border-cyan-400 transition-colors"
                    >
                      <Pencil size={13} />
                      Edit
                    </Link>

                    {isPublished && (
                      <a
                        href={`${mainSiteOrigin}/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${post.title}`}
                        className="p-1.5 border border-neutral-300 dark:border-neutral-700 text-neutral-500 hover:text-green-600 dark:hover:text-cyan-400 hover:border-green-600 dark:hover:border-cyan-400 transition-colors"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}

                    {isConfirming ? (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() => handleDelete(post.id)}
                          aria-label="Confirm delete"
                          className="p-1.5 bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer"
                        >
                          <Check size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(null)}
                          aria-label="Cancel delete"
                          className="p-1.5 border border-neutral-300 dark:border-neutral-700 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors cursor-pointer"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(post.id)}
                        aria-label={`Delete ${post.title}`}
                        className="p-1.5 border border-neutral-300 dark:border-neutral-700 text-neutral-500 hover:text-red-600 dark:hover:text-red-400 hover:border-red-400 dark:hover:border-red-500/60 transition-colors cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
