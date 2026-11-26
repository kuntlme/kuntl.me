"use client";
import { useEffect, useState } from "react";
import { Users, GitCommit, FolderGit, Star } from "lucide-react";

interface GitHubStats {
  followers: number;
  commits: number;
  public_repos: number;
  stars: number;
}

interface GitHubRepo {
  stargazers_count: number;
  // Add other repo properties if needed
  id: number;
  name: string;
}

interface GitHubEvent {
  type: string;
  payload: {
    commits: { message: string }[];
  };
}

const GithubInfo = () => {
  const [stats, setStats] = useState<GitHubStats | null>(null);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
      const headers: Record<string, string> = token
        ? { Authorization: `token ${token}` }
        : {};

      try {
        console.log("GitHub token present:", !!token);

        // Fetch basic user info
        const userResponse = await fetch(
          "https://api.github.com/users/kuntlme",
          headers ? { headers } : undefined,
        );
        console.log("User response status:", userResponse.status);
        if (!userResponse.ok) {
          const errorText = await userResponse.text();
          throw new Error(`GitHub API error: ${userResponse.status} - ${errorText}`);
        }
        const userData = await userResponse.json();
        console.log("User data:", userData);

        // Fetch repositories to calculate total stars
        const reposResponse = await fetch(
          "https://api.github.com/users/kuntlme/repos?per_page=100",
          headers ? { headers } : undefined,
        );
        console.log("Repos response status:", reposResponse.status);
        if (!reposResponse.ok) {
          const errorText = await reposResponse.text();
          throw new Error(`Repos API error: ${reposResponse.status} - ${errorText}`);
        }
        const reposData: GitHubRepo[] = await reposResponse.json();
        const totalStars = Array.isArray(reposData)
          ? reposData.reduce(
              (acc: number, repo: GitHubRepo) => acc + repo.stargazers_count,
              0,
            )
          : 0;
        console.log("Total stars:", totalStars);

        // Fetch user events to calculate total commits
        const eventsResponse = await fetch(
          "https://api.github.com/users/untlme/events/public",
          headers ? { headers } : undefined,
        );
        console.log("Events response status:", eventsResponse.status);
        if (!eventsResponse.ok) {
          const errorText = await eventsResponse.text();
          throw new Error(`Events API error: ${eventsResponse.status} - ${errorText}`);
        }
        const eventsData: GitHubEvent[] = await eventsResponse.json();
        const totalCommits = Array.isArray(eventsData)
          ? eventsData
              .filter((event: GitHubEvent) => event.type === "PushEvent")
              .reduce(
                (acc: number, event: GitHubEvent) =>
                  acc + event.payload.commits.length,
                0,
              )
          : 0;
        console.log("Total commits:", totalCommits);

        setStats({
          followers: userData.followers,
          commits: totalCommits,
          public_repos: userData.public_repos,
          stars: totalStars,
        });
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
      }
    };

    fetchGitHubStats();
  }, []);

  return (
    <div className="flex flex-col gap-1 justify-center items-center border border-zinc-400 dark:border-slate-600 rounded-md hover:border-green-600 dark:hover:border-cyan-400 hover:scale-105 duration-300">
      <div className="w-full justify-start items-start">
        <div className="flex justify-end items-center gap-2 w-2/3 bg-gray-300 dark:bg-zinc-800 py-1 px-3 rounded-r-md">
          <Users className="w-5 h-5 text-zinc-700 dark:text-gray-400" />
          <span className="text-zinc-700 dark:text-gray-300">
            {stats ? stats.followers : "..."} followers
          </span>
        </div>
      </div>

      <div className="w-full flex justify-end items-start">
        <div className="flex justify-start items-center gap-2 w-2/3 bg-gray-300 dark:bg-zinc-800 py-1 px-3 rounded-l-md">
          <GitCommit className="w-5 h-5 text-zinc-700 dark:text-gray-400" />
          <span className="text-zinc-700 dark:text-gray-300">
            {stats ? stats.commits : "..."} commits
          </span>
        </div>
      </div>

      <div className="w-full flex justify-start items-start">
        <div className="flex justify-end items-center gap-2 w-2/3 bg-gray-300 dark:bg-zinc-800 py-1 px-3 rounded-r-md">
          <FolderGit className="w-5 h-5 text-zinc-700 dark:text-gray-400" />
          <span className="text-zinc-700 dark:text-gray-300">
            {stats ? stats.public_repos : "..."} repositories
          </span>
        </div>
      </div>

      <div className="w-full flex justify-end items-start">
        <div className="flex justify-start items-center gap-2 w-2/3 bg-gray-300 dark:bg-zinc-800 py-1 px-3 rounded-l-md">
          <Star className="w-5 h-5 text-zinc-700 dark:text-gray-400" />
          <span className="text-zinc-700 dark:text-gray-300">
            {stats ? stats.stars : "..."} stars
          </span>
        </div>
      </div>
    </div>
  );
};

export default GithubInfo;
