import { useEffect, useState } from 'react';
import Popover from './Popover';

export default function GitHubContributions({ username }) {
  const [weeks, setWeeks] = useState([]);
  const [tooltip, setTooltip] = useState({ isVisible: false, content: '', x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const isDark =
    document.documentElement.classList.contains('dark') ||
    document.documentElement.classList.contains('immersive');

  const [animatedCount, setAnimatedCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
          body: JSON.stringify({
            query: `
                {
                  user(login: "${username}") {
                    contributionsCollection {
                      contributionCalendar {
                        weeks {
                          contributionDays {
                            color
                            contributionCount
                            date
                          }
                        }
                      }
                    }
                  }
                }
              `,
          }),
        });

        const json = await res.json();
        const weeksData =
          json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks || [];
        setWeeks(weeksData.slice(-29));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [username]);

  const totalContributions = weeks.reduce(
    (acc, week) => acc + week.contributionDays.reduce((sum, day) => sum + day.contributionCount, 0),
    0
  );

  useEffect(() => {
    if (!isLoading && totalContributions > 0) {
      setAnimatedCount(0);
      const duration = 1000; // total animation time (ms)
      const steps = 60; // number of updates
      const increment = totalContributions / steps;
      let current = 0;
      let step = 0;

      const interval = setInterval(() => {
        step++;
        current += increment;
        if (step >= steps) {
          clearInterval(interval);
          setAnimatedCount(totalContributions);
        } else {
          setAnimatedCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }
  }, [isLoading, totalContributions]);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="flex items-center gap-2 text-sm font-medium text-black immersive:text-white dark:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-activity w-4 h-4"
          >
            <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>
          </svg>
          GitHub Activity
        </h3>
        {isLoading ? (
          <span className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-github w-3 h-3"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
            <span>Loading...</span>
          </span>
        ) : (
          <span className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-github w-3 h-3"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
            <span>{animatedCount}</span> contributions
          </span>
        )}
      </div>

      <div className="flex items-center justify-center relative">
        {/* Contributions grid */}
        <div className="w-full max-w-[350px]">
          <div className="overflow-x-auto scrollbar-hide pb-1">
            {isLoading ? (
              <div className="flex items-center justify-center w-full h-32">
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  Loading stats...
                </span>
              </div>
            ) : (
              <div className="inline-grid grid-flow-col auto-cols-max gap-[2px]">
                {weeks.map((week, wi) => (
                  <div key={wi} className="grid grid-rows-7 gap-[2px]">
                    {week.contributionDays.map((day, di) => (
                      <div
                        key={di}
                        className={`w-2.5 h-2.5 rounded-[2px] transition-colors cursor-default
          ${isDark && day.contributionCount === 0 ? 'bg-neutral-800' : ''}
          ${!isDark && day.contributionCount === 0 ? 'bg-neutral-100' : ''}`}
                        style={
                          !isDark
                            ? { backgroundColor: day.color } // Light theme → always use GitHub color
                            : day.contributionCount > 0
                            ? { backgroundColor: day.color } // Dark/Immersive with contributions
                            : {}
                        }
                        onMouseMove={(e) => {
                          setTooltip({
                            isVisible: true,
                            x: e.clientX,
                            y: e.clientY,
                            content: `${day.date}: ${day.contributionCount} contributions`,
                          });
                          e.currentTarget.style.transform = 'scale(1.2)';
                        }}
                        onMouseLeave={(e) => {
                          setTooltip({ ...tooltip, isVisible: false });
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tooltip */}
        <Popover
          isVisible={tooltip.isVisible}
          x={tooltip.x}
          y={tooltip.y}
          content={tooltip.content}
        />
      </div>
    </>
  );
}
