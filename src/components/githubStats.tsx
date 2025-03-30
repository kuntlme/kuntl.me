'use client';
import GitHubCalendar from 'react-github-calendar';

interface Contribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export const GithubStats = () => {
  const selectLastTwoMonths = (contributions: Contribution[]) => {
    const today = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(today.getMonth() - 3);
    
    return contributions.filter((day: Contribution) => {
      return new Date(day.date) >= threeMonthsAgo;
    });
  };

  return (
    <div className="flex flex-col items-center p-4 text-gray-300 border border-slate-600 rounded-md w-auto">
      <GitHubCalendar 
        username="Kuntalmajee2557"
        colorScheme="dark"
        fontSize={16}
        blockSize={12}
        transformData={selectLastTwoMonths}
        hideColorLegend={true}
        hideTotalCount={true}
      />
    </div>
  );
};