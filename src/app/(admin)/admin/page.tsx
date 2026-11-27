import React from "react";
import { getAllPosts } from "@/lib/blogStore";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const posts = await getAllPosts();
  return <AdminDashboard initialPosts={posts} />;
}
