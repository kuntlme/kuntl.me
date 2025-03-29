"use client";
import { useEffect, useState } from "react";
import { Users, GitCommit, FolderGit, Star, UserCircle } from "lucide-react";

interface GitHubStats {
  followers: number;
  commits: number;
  public_repos: number;
  stars: number;
}

const GithubInfo = () => {
  const [stats, setStats] = useState<GitHubStats | null>(null);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        // Fetch basic user info
        const userResponse = await fetch(
          "https://api.github.com/users/Kuntalmajee2557"
        );
        const userData = await userResponse.json();

        // Fetch repositories to calculate total stars
        const reposResponse = await fetch(
          "https://api.github.com/users/Kuntalmajee2557/repos"
        );
        const reposData = await reposResponse.json();
        const totalStars = reposData.reduce(
          (acc: number, repo: any) => acc + repo.stargazers_count,
          0
        );

        setStats({
          followers: userData.followers,
          commits: 0,
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
    <div className="flex flex-col gap-1 justify-center items-center border border-slate-600 rounded-md">
      <div className="w-full justify-start items-start">
        <div className="flex justify-end items-center gap-2 w-2/3 bg-zinc-800 py-1 px-3 rounded-r-md">
          <Users className="w-5 h-5 text-gray-400" />
          <span className="text-gray-300">
            {stats?.followers || "..."} followers
          </span>
        </div>
      </div>

      <div className="w-full flex justify-end items-start">
        <div className="flex justify-start items-center gap-2 w-2/3 bg-zinc-800 py-1 px-3 rounded-l-md">
          <GitCommit className="w-5 h-5 text-gray-400" />
          <span className="text-gray-300">
            {stats?.commits || "..."} commits
          </span>
        </div>
      </div>

      <div className="w-full flex justify-start items-start">
        <div className="flex justify-end items-center gap-2 w-2/3 bg-zinc-800 py-1 px-3 rounded-r-md">
          <FolderGit className="w-5 h-5 text-gray-400" />
          <span className="text-gray-300">
            {stats?.public_repos || "..."} repositories
          </span>
        </div>
      </div>

      <div className="w-full flex justify-end items-start">
        <div className="flex justify-start items-center gap-2 w-2/3 bg-zinc-800 py-1 px-3 rounded-l-md">
          <Star className="w-5 h-5 text-gray-400" />
          <span className="text-gray-300">{stats?.stars || "..."} stars</span>
        </div>
      </div>
    </div>
  );
};

export default GithubInfo;
