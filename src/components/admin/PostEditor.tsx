"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BlogPost } from "@/data/blog";
import { createPostAction, updatePostAction } from "@/app/actions/admin";
import { cn } from "@/lib/utils";
import { ArrowLeft, Save } from "lucide-react";

interface PostEditorProps {
  mode: "create" | "edit";
  initialPost?: BlogPost;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export const PostEditor: React.FC<PostEditorProps> = ({
  mode,
  initialPost,
}) => {
  const router = useRouter();
  const [title, setTitle] = useState(initialPost?.title ?? "");
  const [slug, setSlug] = useState(initialPost?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [summary, setSummary] = useState(initialPost?.summary ?? "");
  const [publishedAt, setPublishedAt] = useState(
    initialPost?.publishedAt ?? new Date().toISOString().slice(0, 10),
  );
  const [tagsInput, setTagsInput] = useState(
    initialPost?.tags.join(", ") ?? "",
  );
  const [published, setPublished] = useState(
    initialPost ? initialPost.published !== false : true,
  );
  const [content, setContent] = useState(initialPost?.content.trim() ?? "");
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slugTouched) {
      setSlug(slugify(val));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim() || !content.trim()) {
      setError("Title, slug, and content are required.");
      return;
    }

    setSaving(true);
    setError(null);

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      const payload = {
        title,
        slug,
        summary,
        content,
        publishedAt,
        tags,
        published,
      };

      const result =
        mode === "create"
          ? await createPostAction(payload)
          : await updatePostAction(initialPost!.id, payload);

      if (!result.ok) {
        throw new Error(result.error || "Failed to save post.");
      }

      const isSubdomain =
        typeof window !== "undefined" &&
        (window.location.hostname.startsWith("admin.kuntl.me") ||
          window.location.hostname.startsWith("admin.localhost"));

      router.push(isSubdomain ? "/" : "/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save post.");
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen w-full max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <div className="mb-6">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 hover:text-green-600 dark:hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to admin
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative border border-neutral-300 dark:border-neutral-800 bg-neutral-100/60 dark:bg-zinc-900/70 p-6 sm:p-10"
      >
        {/* Architectural corner crosshairs */}
        <span
          aria-hidden="true"
          className="absolute -top-2.5 -left-2.5 w-5 h-5 flex items-center justify-center text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none pointer-events-none"
        >
          +
        </span>
        <span
          aria-hidden="true"
          className="absolute -top-2.5 -right-2.5 w-5 h-5 flex items-center justify-center text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none pointer-events-none"
        >
          +
        </span>
        <span
          aria-hidden="true"
          className="absolute -bottom-2.5 -left-2.5 w-5 h-5 flex items-center justify-center text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none pointer-events-none"
        >
          +
        </span>
        <span
          aria-hidden="true"
          className="absolute -bottom-2.5 -right-2.5 w-5 h-5 flex items-center justify-center text-neutral-400 dark:text-neutral-500 font-mono text-xs select-none pointer-events-none"
        >
          +
        </span>

        <div className="space-y-6">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-300 dark:border-neutral-800">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            {mode === "create" ? "New Blog Post" : "Edit Blog Post"}
          </h1>

          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2 text-xs font-mono text-neutral-700 dark:text-neutral-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="accent-green-600 dark:accent-cyan-400 w-4 h-4 cursor-pointer"
              />
              Published
            </label>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-zinc-900 hover:bg-green-700 dark:hover:bg-cyan-400 dark:hover:text-zinc-950 disabled:opacity-50 transition-colors cursor-pointer"
            >
              <Save size={14} />
              {saving ? "Saving..." : mode === "create" ? "Create Post" : "Save Changes"}
            </button>
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="px-4 py-3 text-xs font-mono border border-red-400 dark:border-red-500/60 bg-red-500/10 text-red-700 dark:text-red-300"
          >
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label
              htmlFor="post-title"
              className="block text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-1.5"
            >
              Title
            </label>
            <input
              id="post-title"
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Building CheckMate: Real-Time Chess..."
              className="w-full px-3.5 py-2.5 text-sm bg-white/80 dark:bg-zinc-950/60 border border-neutral-300 dark:border-neutral-700 focus:border-green-600 dark:focus:border-cyan-400 focus:outline-none text-neutral-900 dark:text-neutral-100"
            />
          </div>

          <div>
            <label
              htmlFor="post-slug"
              className="block text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-1.5"
            >
              Slug
            </label>
            <input
              id="post-slug"
              type="text"
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value);
              }}
              placeholder="building-real-time-chess"
              className="w-full px-3.5 py-2.5 text-xs font-mono bg-white/80 dark:bg-zinc-950/60 border border-neutral-300 dark:border-neutral-700 focus:border-green-600 dark:focus:border-cyan-400 focus:outline-none text-neutral-900 dark:text-neutral-100"
            />
          </div>

          <div>
            <label
              htmlFor="post-date"
              className="block text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-1.5"
            >
              Publish Date
            </label>
            <input
              id="post-date"
              type="date"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs font-mono bg-white/80 dark:bg-zinc-950/60 border border-neutral-300 dark:border-neutral-700 focus:border-green-600 dark:focus:border-cyan-400 focus:outline-none text-neutral-900 dark:text-neutral-100"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="post-summary"
              className="block text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-1.5"
            >
              Summary
            </label>
            <textarea
              id="post-summary"
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="A concise 1-2 sentence overview shown on the blog timeline."
              className="w-full px-3.5 py-2.5 text-sm bg-white/80 dark:bg-zinc-950/60 border border-neutral-300 dark:border-neutral-700 focus:border-green-600 dark:focus:border-cyan-400 focus:outline-none text-neutral-900 dark:text-neutral-100"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="post-tags"
              className="block text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-1.5"
            >
              Tags (comma-separated)
            </label>
            <input
              id="post-tags"
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Next.js, WebSockets, Postgres"
              className="w-full px-3.5 py-2.5 text-xs font-mono bg-white/80 dark:bg-zinc-950/60 border border-neutral-300 dark:border-neutral-700 focus:border-green-600 dark:focus:border-cyan-400 focus:outline-none text-neutral-900 dark:text-neutral-100"
            />
          </div>
        </div>

        {/* Content Write / Preview */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="post-content"
              className="text-xs font-mono text-neutral-600 dark:text-neutral-400"
            >
              Content (Markdown)
            </label>
            <div className="flex border border-neutral-300 dark:border-neutral-700 p-0.5 bg-neutral-200/50 dark:bg-zinc-950/50">
              {(["write", "preview"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={cn(
                    "px-2.5 py-1 text-[11px] font-mono capitalize transition-colors cursor-pointer",
                    tab === t
                      ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-zinc-900 font-semibold"
                      : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {tab === "write" ? (
            <textarea
              id="post-content"
              rows={14}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post in Markdown..."
              className="w-full px-4 py-3 text-sm font-mono leading-relaxed bg-white/80 dark:bg-zinc-950/60 border border-neutral-300 dark:border-neutral-700 focus:border-green-600 dark:focus:border-cyan-400 focus:outline-none text-neutral-900 dark:text-neutral-100"
            />
          ) : (
            <div className="min-h-[320px] px-5 py-4 border border-neutral-300 dark:border-neutral-700 bg-white/50 dark:bg-zinc-950/40 space-y-4 text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed">
              {content.trim() ? (
                content
                  .trim()
                  .split("\n\n")
                  .map((paragraph, idx) => {
                    if (paragraph.startsWith("### ")) {
                      return (
                        <h3
                          key={idx}
                          className="text-lg font-bold text-neutral-900 dark:text-neutral-100 pt-2"
                        >
                          {paragraph.replace("### ", "")}
                        </h3>
                      );
                    }
                    return <p key={idx}>{paragraph}</p>;
                  })
              ) : (
                <p className="text-neutral-400 font-mono text-xs">
                  Nothing to preview yet.
                </p>
              )}
            </div>
          )}
        </div>
        </div>
      </form>
    </div>
  );
};
