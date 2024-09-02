"use server";
import { Filters } from "@/types/Filters";
import { listBuildNumbers, queryMythRecs } from "../services/mongo-service";
import { IRecordedGame } from "@/types/RecordedGame";

export async function getMythRecs(
  page: number,
  filters?: Filters,
  sort?: {},
): Promise<IRecordedGame[]> {
  const result = await queryMythRecs(page, filters, sort);
  return result;
}

export async function getBuildNumbers(): Promise<number[]> {
  const result = await listBuildNumbers();
  return result;
}
