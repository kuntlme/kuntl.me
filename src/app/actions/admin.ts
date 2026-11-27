"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import {
  ADMIN_COOKIE_NAME,
  SESSION_DURATION_MS,
  signAdminToken,
  verifyAdminPassword,
  verifyAdminToken,
} from "@/lib/auth";
import {
  CreatePostInput,
  createPost,
  deletePost,
  getPostById,
  updatePost,
} from "@/lib/blogStore";
import { BlogPost } from "@/data/blog";

async function requireAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const valid = await verifyAdminToken(token);
  if (!valid) {
    throw new Error("Unauthorized");
  }
}

export async function loginAction(
  password: string,
): Promise<{ ok: boolean; error?: string }> {
  if (!process.env.ADMIN_PASSWORD) {
    return {
      ok: false,
      error: "ADMIN_PASSWORD is not configured on the server.",
    };
  }

  if (!verifyAdminPassword(password)) {
    return { ok: false, error: "Incorrect password. Please try again." };
  }

  const token = await signAdminToken();
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: Math.floor(SESSION_DURATION_MS / 1000),
  });

  return { ok: true };
}

export async function logoutAction(): Promise<{ ok: boolean }> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return { ok: true };
}

export async function createPostAction(
  input: CreatePostInput,
): Promise<{ ok: boolean; post?: BlogPost; error?: string }> {
  try {
    await requireAdminSession();

    if (!input.title?.trim() || !input.slug?.trim() || !input.content?.trim()) {
      return {
        ok: false,
        error: "Title, slug, and content are required.",
      };
    }

    const post = await createPost(input);
    revalidatePath("/admin");
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    return { ok: true, post };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Failed to create post.",
    };
  }
}

export async function updatePostAction(
  id: number,
  updates: Partial<CreatePostInput>,
): Promise<{ ok: boolean; post?: BlogPost; error?: string }> {
  try {
    await requireAdminSession();
    const existing = await getPostById(id);
    const updated = await updatePost(id, updates);

    if (!updated) {
      return { ok: false, error: "Post not found." };
    }

    revalidatePath("/admin");
    revalidatePath("/blog");
    if (existing?.slug) {
      revalidatePath(`/blog/${existing.slug}`);
    }
    revalidatePath(`/blog/${updated.slug}`);
    return { ok: true, post: updated };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Failed to update post.",
    };
  }
}

export async function togglePublishAction(
  id: number,
  published: boolean,
): Promise<{ ok: boolean; post?: BlogPost; error?: string }> {
  return updatePostAction(id, { published });
}

export async function deletePostAction(
  id: number,
): Promise<{ ok: boolean; error?: string }> {
  try {
    await requireAdminSession();
    const existing = await getPostById(id);
    const deleted = await deletePost(id);

    if (!deleted) {
      return { ok: false, error: "Post not found." };
    }

    revalidatePath("/admin");
    revalidatePath("/blog");
    if (existing?.slug) {
      revalidatePath(`/blog/${existing.slug}`);
    }
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Failed to delete post.",
    };
  }
}
