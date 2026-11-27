import { db } from "@/prisma/db";
import { BlogPost } from "@/data/blog";

function slugifyTag(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function formatIsoDate(value: Date | string | null | undefined, fallback: Date): string {
  const date = value ? new Date(value) : fallback;
  return date.toISOString().slice(0, 10);
}

async function ensureDefaultAuthorId(): Promise<number> {
  const existing = await db.orm.public.User.first();
  if (existing) return existing.id;

  const created = await db.orm.public.User.create({
    email: "kuntal@kuntl.me",
    username: "kuntlme",
    name: "Kuntal Majee",
  });
  return created.id;
}

async function syncPostTags(postId: number, tagNames: string[]): Promise<void> {
  await db.orm.public.PostTag.where({ postId }).deleteAll();

  const seen = new Set<string>();
  for (const rawName of tagNames) {
    const name = rawName.trim();
    if (!name) continue;
    const slug = slugifyTag(name);
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);

    let tag = await db.orm.public.Tag.where({ slug }).first();
    if (!tag) {
      tag = await db.orm.public.Tag.create({ name, slug });
    }

    await db.orm.public.PostTag.create({
      postId,
      tagId: tag.id,
    });
  }
}

type DbPostWithTags = Awaited<
  ReturnType<typeof fetchPostsQuery>
>[number];

function fetchPostsQuery() {
  return db.orm.public.Post.include("tags", (pt) => pt.include("tag")).all();
}

function mapPost(row: DbPostWithTags): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    summary: row.summary ?? "",
    content: row.content,
    publishedAt: formatIsoDate(row.publishedAt, new Date(row.createdAt)),
    readingTime: row.readingTime ?? 1,
    tags: row.tags.map((pt) => pt.tag.name),
    featured: row.featured,
    published: row.published,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const rows = await fetchPostsQuery();
  return rows
    .map(mapPost)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const rows = await db.orm.public.Post.where({ published: true })
    .include("tags", (pt) => pt.include("tag"))
    .all();

  return rows
    .map(mapPost)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export async function getPostById(id: number): Promise<BlogPost | null> {
  const row = await db.orm.public.Post.where({ id })
    .include("tags", (pt) => pt.include("tag"))
    .first();

  return row ? mapPost(row) : null;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const row = await db.orm.public.Post.where({ slug })
    .include("tags", (pt) => pt.include("tag"))
    .first();

  return row ? mapPost(row) : null;
}

export interface CreatePostInput {
  title: string;
  slug: string;
  summary: string;
  content: string;
  publishedAt: string;
  tags: string[];
  published?: boolean;
  featured?: boolean;
}

export async function createPost(input: CreatePostInput): Promise<BlogPost> {
  const existing = await db.orm.public.Post.where({
    slug: input.slug.trim(),
  }).first();

  if (existing) {
    throw new Error(`A post with slug "${input.slug}" already exists.`);
  }

  const authorId = await ensureDefaultAuthorId();
  const wordCount = input.content.trim().split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const created = await db.orm.public.Post.create({
    title: input.title.trim(),
    slug: input.slug.trim(),
    summary: input.summary.trim() || null,
    content: input.content,
    published: input.published ?? false,
    featured: input.featured ?? false,
    readingTime,
    authorId,
    publishedAt: input.publishedAt ? new Date(input.publishedAt) : new Date(),
  });

  if (input.tags.length > 0) {
    await syncPostTags(created.id, input.tags);
  }

  const full = await getPostById(created.id);
  if (!full) {
    throw new Error("Failed to load created post.");
  }
  return full;
}

export async function updatePost(
  id: number,
  updates: Partial<CreatePostInput>,
): Promise<BlogPost | null> {
  const existing = await db.orm.public.Post.where({ id }).first();
  if (!existing) return null;

  if (updates.slug) {
    const trimmedSlug = updates.slug.trim();
    const conflict = await db.orm.public.Post.where({
      slug: trimmedSlug,
    }).first();
    if (conflict && conflict.id !== id) {
      throw new Error(`A post with slug "${trimmedSlug}" already exists.`);
    }
  }

  const nextContent = updates.content ?? existing.content;
  const wordCount = nextContent.trim().split(/\s+/).filter(Boolean).length;

  await db.orm.public.Post.where({ id }).update({
    ...(updates.title !== undefined ? { title: updates.title.trim() } : {}),
    ...(updates.slug !== undefined ? { slug: updates.slug.trim() } : {}),
    ...(updates.summary !== undefined
      ? { summary: updates.summary.trim() || null }
      : {}),
    ...(updates.content !== undefined ? { content: updates.content } : {}),
    ...(updates.published !== undefined
      ? { published: updates.published }
      : {}),
    ...(updates.featured !== undefined ? { featured: updates.featured } : {}),
    ...(updates.publishedAt !== undefined
      ? { publishedAt: new Date(updates.publishedAt) }
      : {}),
    readingTime: Math.max(1, Math.ceil(wordCount / 200)),
  });

  if (updates.tags !== undefined) {
    await syncPostTags(id, updates.tags);
  }

  return getPostById(id);
}

export async function deletePost(id: number): Promise<boolean> {
  const existing = await db.orm.public.Post.where({ id }).first();
  if (!existing) return false;

  await db.orm.public.PostTag.where({ postId: id }).deleteAll();
  await db.orm.public.Post.where({ id }).delete();
  return true;
}
