"use client";

import React from "react";
import Link from "next/link";
import { BlogPost, MonthGroup, formatPostDate } from "@/data/blog";
import { cn } from "@/lib/utils";

interface BlogTimelineProps {
  groups: MonthGroup[];
  className?: string;
}

const CrossMarker = ({ className }: { className?: string }) => (
  <span
    aria-hidden="true"
    className={cn(
      "absolute w-5 h-5 flex items-center justify-center text-neutral-400 dark:text-neutral-500 font-mono text-xs leading-none pointer-events-none select-none z-20",
      className,
    )}
  >
    +
  </span>
);

export const BlogTimeline: React.FC<BlogTimelineProps> = ({
  groups,
  className,
}) => {
  if (!groups || groups.length === 0) {
    return (
      <div className="w-full py-16 text-center text-neutral-500 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-800 rounded-lg">
        No blog posts published yet. Check back soon!
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative w-full border border-neutral-300 dark:border-neutral-800 bg-neutral-100/50 dark:bg-zinc-900/60 backdrop-blur-xs",
        className,
      )}
    >
      {/* Outer top-left and top-right crosshairs */}
      <CrossMarker className="-top-2.5 -left-2.5" />
      <CrossMarker className="-top-2.5 -right-2.5" />

      {groups.map((monthGroup, groupIndex) => {
        const isFirstGroup = groupIndex === 0;
        const isLastGroup = groupIndex === groups.length - 1;

        return (
          <section
            key={monthGroup.monthKey}
            className={cn(
              "relative flex flex-col md:flex-row w-full",
              !isLastGroup &&
                "border-b border-neutral-300 dark:border-neutral-800",
            )}
          >
            {/* Left Column: Month Name & Post Count */}
            <div
              className={cn(
                "relative w-full md:w-64 lg:w-72 shrink-0",
                "px-6 py-6 sm:px-8 sm:py-8 lg:px-8 lg:py-10 flex flex-col justify-start",
                "border-b md:border-b-0 md:border-r border-neutral-300 dark:border-neutral-800",
                "bg-neutral-50/40 dark:bg-zinc-900/30",
              )}
            >
              {/* Top-right crosshair of left column (at the vertical divider intersection) */}
              {isFirstGroup && (
                <CrossMarker className="hidden md:flex -top-2.5 -right-2.5" />
              )}

              {/* Bottom-right crosshair of left column (at the divider intersection) */}
              <CrossMarker className="hidden md:flex -bottom-2.5 -right-2.5" />

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 font-sans truncate">
                {monthGroup.monthName}
              </h2>

              <p className="text-xs sm:text-sm font-mono text-neutral-500 dark:text-neutral-400 mt-1.5 sm:mt-2">
                {monthGroup.year} · {monthGroup.posts.length}{" "}
                {monthGroup.posts.length === 1 ? "post" : "posts"}
              </p>
            </div>

            {/* Right Column: Timeline track & post articles */}
            <div className="relative flex-1 flex flex-col py-6 sm:py-8 lg:py-10">
              {/* Continuous vertical timeline track line for mobile */}
              <div
                aria-hidden="true"
                className="md:hidden absolute top-0 bottom-0 left-6 w-[1px] bg-neutral-300 dark:bg-neutral-800"
              />

              {monthGroup.posts.map((post: BlogPost, postIndex: number) => {
                const isLastPost = postIndex === monthGroup.posts.length - 1;

                return (
                  <article
                    key={post.id}
                    className={cn(
                      "relative group pl-12 md:pl-10 pr-6 sm:pr-8 lg:pr-10",
                      !isLastPost ? "pb-10 sm:pb-12" : "pb-2",
                    )}
                  >
                    {/* Post Date on top with leading slash, e.g. \ nov 14 */}
                    <time className="block text-[11px] sm:text-xs font-mono text-neutral-400 dark:text-neutral-500 mb-1.5 leading-none select-none tracking-wide">
                      \\ {formatPostDate(post.publishedAt).toLowerCase()}
                    </time>

                    {/* Title row with circular node positioned beside the title */}
                    <div className="relative">
                      {/* Desktop Node: centered on vertical column line (x = 0), beside Title */}
                      <div
                        aria-hidden="true"
                        className={cn(
                          "hidden md:block absolute -left-[45px] top-[7px] w-2.5 h-2.5 rounded-full",
                          "border border-neutral-400 dark:border-neutral-500",
                          "bg-gray-200 dark:bg-zinc-900 ring-4 ring-gray-200 dark:ring-zinc-900",
                          "group-hover:border-green-600 dark:group-hover:border-cyan-400 group-hover:scale-125 transition-all duration-200",
                        )}
                      />

                      {/* Mobile Node: centered on mobile track line at left-6 (x = 24px), beside Title */}
                      <div
                        aria-hidden="true"
                        className={cn(
                          "md:hidden absolute -left-[29px] top-[7px] w-2.5 h-2.5 rounded-full",
                          "border border-neutral-400 dark:border-neutral-500",
                          "bg-gray-200 dark:bg-zinc-900 ring-4 ring-gray-200 dark:ring-zinc-900",
                          "group-hover:border-green-600 dark:group-hover:border-cyan-400 group-hover:scale-125 transition-all duration-200",
                        )}
                      />

                      {/* Post Title */}
                      <Link
                        href={`/blog/${post.slug}`}
                        className="block group-hover:underline underline-offset-4 decoration-1 decoration-neutral-400 dark:decoration-neutral-600"
                      >
                        <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-green-600 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                          {post.title}
                        </h3>
                      </Link>
                    </div>

                    {/* Post Summary */}
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2.5 leading-relaxed max-w-2xl">
                      {post.summary}
                    </p>

                    {/* Metadata: Tags only */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-1 text-xs">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-neutral-300 dark:border-neutral-700/70 rounded px-1.5 py-0.5 text-[11px] text-neutral-600 dark:text-neutral-300/80 bg-neutral-200/50 dark:bg-zinc-800/40"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Crosshairs on horizontal section divider */}
            {!isLastGroup && (
              <>
                <CrossMarker className="-bottom-2.5 -left-2.5" />
                <CrossMarker className="-bottom-2.5 -right-2.5" />
              </>
            )}
          </section>
        );
      })}

      {/* Bottom outer crosshairs */}
      <CrossMarker className="-bottom-2.5 -left-2.5" />
      <CrossMarker className="-bottom-2.5 -right-2.5" />
    </div>
  );
};
