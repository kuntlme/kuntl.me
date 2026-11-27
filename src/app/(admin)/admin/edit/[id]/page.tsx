import React from "react";
import { notFound } from "next/navigation";
import { getPostById } from "@/lib/blogStore";
import { PostEditor } from "@/components/admin/PostEditor";

export const dynamic = "force-dynamic";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const post = await getPostById(Number(id));
  if (!post) {
    notFound();
  }

  return <PostEditor mode="edit" initialPost={post} />;
}
