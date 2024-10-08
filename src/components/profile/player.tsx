import { MappedTeam } from "@/app/api/matchHistory/matchHelpers";
import { majorGodIndexToData } from "@/types/MajorGods";
import { MatchHistoryMap } from "@/types/MatchHistory";
import Image from "next/image";
import { Card } from "@/components/ui/card";

interface IProps {
  player: MappedTeam;
  matchHistoryMap: MatchHistoryMap;
  handleNameClick: (row: number) => void;
  gameMode: string;
  isActivePlayer: boolean;
}

export default function Player({
  player,
  matchHistoryMap,
  handleNameClick,
  gameMode,
  isActivePlayer,
}: IProps) {
  const isCustom = gameMode === "CUSTOM";
  const { portraitPath, name: civName } = majorGodIndexToData(
    Number(player.civilization_id),
  );
  const isWinner = player.resulttype === 1;
  const ratingChangeColor = isWinner ? "primary" : "red-500";

  return (
    <Card className="p-1 grid grid-cols-[25px,6fr] items-center w-full">
      {/* Civ Image */}
      <Image
        src={portraitPath}
        alt={civName}
        width={24}
        height={24}
        layout="fixed"
        className={`shrink-0 rounded-full border-2 w-6 h-6 border-${ratingChangeColor}`}
      />
      {/* Player Name and Rating */}
      <div className="flex justify-between items-center">
        <div
          className={`text-base cursor-pointer overflow-hidden truncate text-${ratingChangeColor} mr-1`}
          onClick={() => handleNameClick(player.profile_id)}
          title={player.playerName}
        >
          {player.playerName} {isActivePlayer ? "✨" : ""}
        </div>
        {!isCustom && (
          <div className="text-xs font-light ">
            {matchHistoryMap[player.profile_id]?.[0]?.newrating}
          </div>
        )}
      </div>
    </Card>
  );
}
