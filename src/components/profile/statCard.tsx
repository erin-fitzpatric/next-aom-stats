import { ILeaderboardPlayer } from "@/types/LeaderboardPlayer";
import { LeaderboardTypeNames } from "@/types/LeaderBoard";
import { Card, CardContent } from "../ui/card";
import { formatTimeAgoInMs } from "@/utils/dateHelpers";
import { ArrowUp, ArrowDown } from "lucide-react";

interface IStatCardProps {
  playerStats: ILeaderboardPlayer;
}

export default function StatCard({ playerStats }: IStatCardProps) {
  const {
    leaderboard_id,
    rank,
    rating,
    winPercent,
    wins,
    losses,
    streak,
    lastmatchdate,
  } = playerStats;

  const winPercentFormatted = (Number(winPercent) * 100).toFixed(1);

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-gold">
        {LeaderboardTypeNames[Number(leaderboard_id)]}
      </h2>
      <div className="grid grid-cols-2 md:gap-4">
        <StatItem label="Rank" value={`#${rank}`} />
        <StatItem label="Elo" value={String(rating)} />
        <StatItem
          label="Win Rate"
          value={
            <div className="flex items-center space-x-2">
              <span className="text-xl font-semibold">
                {winPercentFormatted}%
              </span>
              <span className="text-sm text-gray-400 truncate">
                ({String(wins)}W / {String(losses)}L)
              </span>
            </div>
          }
        />
        <StatItem
          label="Streak"
          value={
            <div className="flex items-center space-x-1">
              {Number(streak) > 0 ? (
                <ArrowUp className="text-green-500" size={16} />
              ) : (
                <ArrowDown className="text-red-500" size={16} />
              )}
              <span
                className={
                  Number(streak) > 0 ? "text-green-500" : "text-red-500"
                }
              >
                {Math.abs(Number(streak))}
              </span>
            </div>
          }
        />
      </div>
      <div className="mt-4 text-sm text-gray-400">
        Last match: {formatTimeAgoInMs(Number(lastmatchdate))}
      </div>
    </div>
  );
}

interface StatItemProps {
  label: string;
  value: React.ReactNode;
}

function StatItem({ label, value }: StatItemProps) {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <span className="text-sm text-gray-400 truncate">{label}</span>
      <span className="text-lg font-semibold truncate">{value}</span>
    </div>
  );
}
