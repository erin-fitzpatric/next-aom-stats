"use client";

import { SpinnerWithText } from "../spinner";
import { Card } from "../ui/card";
import { getMythRecs } from "@/server/controllers/mongo-controller";
import Loading from "../loading";
import { useQuery } from "@/utils/useQuery";
import { useCallback } from "react";
import RecTileCondensed from "@/components/recs/rec-tile-condensed";

export default function TopRecordedGames() {
  const getMythRecsCallback = useCallback(
    () => getMythRecs(0, {}, { downloadCount: -1 }),
    [],
  );
  const [{ data: recs, loading: isLoading }, isInitialFetch] = useQuery(
    ["getMythRecs"],
    getMythRecsCallback,
  );

  if (isInitialFetch && isLoading) {
    return <Loading />;
  }

  if (recs && recs.length === 0 && !isInitialFetch) {
    return (
      <div className="flex justify-center mt-4">
        <Card className="p-4 w-full">
          <p className="flex justify-center">No recorded games found!</p>
        </Card>
      </div>
    );
  }

  return (
    <Card className="p-4">
      <h2 className="card-header mb-5">Top Recorded Games</h2>

      {/* Replay Gallery */}
      <div>
        <div className="flex flex-row flex-wrap justify-center gap-2">
          {recs?.map((rec) => (
            <Card
              key={rec.gameGuid}
              className="bg-secondary rounded-lg p-2 flex w-fit"
            >
              <div>
                <RecTileCondensed
                  key={`rec-tile-${rec.gameGuid}`}
                  rec={rec}
                ></RecTileCondensed>
              </div>
            </Card>
          ))}
        </div>
        {isLoading && (
          <div className="flex justify-center mt-4">
            <SpinnerWithText text={"Loading recorded games..."} />
          </div>
        )}
      </div>
    </Card>
  );
}
