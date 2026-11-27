import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/auth";
import { createPost, getAllPosts } from "@/lib/blogStore";

async function isAuthorized(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminToken(token);
}

export async function GET(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const posts = await getAllPosts();
  return NextResponse.json({ posts });
}

export async function POST(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, slug, summary, content, publishedAt, tags, published, featured } =
      body;

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Title, slug, and content are required." },
        { status: 400 },
      );
    }

    const post = await createPost({
      title: String(title),
      slug: String(slug),
      summary: String(summary || ""),
      content: String(content),
      publishedAt: String(publishedAt || new Date().toISOString().slice(0, 10)),
      tags: Array.isArray(tags) ? tags.map(String) : [],
      published: Boolean(published),
      featured: Boolean(featured),
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to create post.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
