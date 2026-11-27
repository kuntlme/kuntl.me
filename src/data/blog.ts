export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  summary: string;
  content: string;
  publishedAt: string; // ISO date string: YYYY-MM-DD
  readingTime: number; // in minutes
  tags: string[];
  featured?: boolean;
  published?: boolean;
}

export interface MonthGroup {
  monthKey: string; // e.g. "2026-11"
  monthName: string; // e.g. "November"
  year: number; // e.g. 2026
  posts: BlogPost[];
}

export const blogPosts: BlogPost[] = [];

export function getGroupedPostsByMonth(
  posts: BlogPost[] = blogPosts,
): MonthGroup[] {
  const sorted = [...posts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const groupMap = new Map<string, MonthGroup>();

  for (const post of sorted) {
    const date = new Date(post.publishedAt);
    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const monthKey = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;

    if (!groupMap.has(monthKey)) {
      groupMap.set(monthKey, {
        monthKey,
        monthName: monthNames[monthIndex],
        year,
        posts: [],
      });
    }

    groupMap.get(monthKey)!.posts.push(post);
  }

  return Array.from(groupMap.values());
}

export function formatPostDate(dateString: string): string {
  const date = new Date(dateString);
  const monthAbbr = date.toLocaleDateString("en-US", { month: "short" });
  const day = date.getDate();
  return `${monthAbbr} ${day}`;
}
