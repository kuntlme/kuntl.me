import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/container";
import { LeftLine, RightLine, VerticleLine } from "@/components/lines";
import { formatPostDate } from "@/data/blog";
import { getPostBySlug } from "@/lib/blogStore";
import { cn } from "@/lib/utils";
import { ArrowLeft, Tag } from "lucide-react";

export const dynamic = "force-dynamic";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Kuntal Majee`,
    description: post.summary,
  };
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className={cn("relative w-full mx-auto pb-20 sm:pb-36")}>
      <Container className="relative px-4 sm:px-6 pt-32 flex flex-col justify-start items-center">
        {/* Navigation link */}
        <div className="w-full mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-green-600 dark:hover:text-cyan-400 font-mono transition-colors group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to timeline
          </Link>
        </div>

        {/* Article Container */}
        <article className="w-full border border-neutral-300 dark:border-neutral-800 bg-neutral-100/40 dark:bg-zinc-900/40 p-6 sm:p-10 md:p-14 relative">
          {/* Architectural corner crosses */}
          <span className="absolute -top-2.5 -left-2.5 w-5 h-5 flex items-center justify-center text-neutral-400 dark:text-neutral-500 font-mono text-xs leading-none select-none">
            +
          </span>
          <span className="absolute -top-2.5 -right-2.5 w-5 h-5 flex items-center justify-center text-neutral-400 dark:text-neutral-500 font-mono text-xs leading-none select-none">
            +
          </span>
          <span className="absolute -bottom-2.5 -left-2.5 w-5 h-5 flex items-center justify-center text-neutral-400 dark:text-neutral-500 font-mono text-xs leading-none select-none">
            +
          </span>
          <span className="absolute -bottom-2.5 -right-2.5 w-5 h-5 flex items-center justify-center text-neutral-400 dark:text-neutral-500 font-mono text-xs leading-none select-none">
            +
          </span>

          {/* Article Header */}
          <header className="border-b border-neutral-300 dark:border-neutral-800 pb-8 mb-8">
            <div className="flex flex-wrap items-center gap-4 text-[11px] sm:text-xs font-mono text-neutral-400 dark:text-neutral-500 mb-4 select-none tracking-wide">
              <span className="inline-flex items-center gap-1.5">
                \ {formatPostDate(post.publishedAt).toLowerCase()}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 leading-tight mb-4">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl">
              {post.summary}
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 border border-neutral-300 dark:border-neutral-700 rounded px-2 py-0.5 text-xs text-neutral-600 dark:text-neutral-300 bg-neutral-200/50 dark:bg-zinc-800/50"
                >
                  <Tag size={12} className="opacity-70" />
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Article Body */}
          <div className="prose dark:prose-invert max-w-none text-neutral-800 dark:text-neutral-200 leading-relaxed text-base sm:text-lg space-y-6">
            {post.content.trim().split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("### ")) {
                return (
                  <h3
                    key={index}
                    className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 pt-4"
                  >
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              if (paragraph.includes("\n1. ") || paragraph.startsWith("1. ")) {
                const items = paragraph.split("\n").filter(Boolean);
                return (
                  <ol key={index} className="list-decimal pl-6 space-y-2">
                    {items.map((item, i) => (
                      <li key={i}>{item.replace(/^\d+\.\s*/, "")}</li>
                    ))}
                  </ol>
                );
              }
              if (paragraph.includes("\n- ") || paragraph.startsWith("- ")) {
                const items = paragraph.split("\n").filter(Boolean);
                return (
                  <ul key={index} className="list-disc pl-6 space-y-2">
                    {items.map((item, i) => (
                      <li key={i}>{item.replace(/^-\s*/, "")}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={index} className="leading-relaxed text-neutral-700 dark:text-neutral-300">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </article>

        <LeftLine />
        <RightLine />
      </Container>
      <VerticleLine className="" />
    </div>
  );
};

export default BlogPostPage;
