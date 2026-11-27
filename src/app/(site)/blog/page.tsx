import React from "react";
import Container from "@/components/container";
import { LeftLine, RightLine, VerticleLine } from "@/components/lines";
import { BlogTimeline } from "@/components/BlogTimeline";
import { getGroupedPostsByMonth } from "@/data/blog";
import { getPublishedPosts } from "@/lib/blogStore";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog & Engineering Notes | Kuntal Majee",
  description:
    "Hand-written articles on full-stack web development, real-time architectures, distributed systems, and modern database modeling.",
};

const BlogPage = async () => {
  const posts = await getPublishedPosts();
  const monthGroups = getGroupedPostsByMonth(posts);

  return (
    <div className={cn("relative w-full mx-auto pb-16 sm:pb-32")}>
      <Container className="relative px-4 sm:px-6 pt-32 max-w-5xl flex flex-col justify-start items-center">
        {/* Header Section */}
        <div className="w-full mb-12 sm:mb-16">
          <h1 className="mb-3 text-5xl sm:text-7xl text-center sm:text-start text-transparent text-outline font-bold w-full">
            Blog & Notes
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg text-center sm:text-start max-w-2xl leading-relaxed">
            Hand-written essays, architectural teardowns, and practical logs from building distributed applications, real-time engines, and developer tools.
          </p>
        </div>

        {/* Month-based Timeline Grid */}
        <div className="w-full">
          <BlogTimeline groups={monthGroups} />
        </div>

        <LeftLine />
        <RightLine />
      </Container>
      <VerticleLine className="" />
    </div>
  );
};

export default BlogPage;
