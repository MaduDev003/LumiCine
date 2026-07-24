import { httpClient } from "@/src/api/config/httpClient";
import { endpoints } from "@/src/api/config/endpoints";

export async function getMovieReleaseDates(id: number) {
  const { data } = await httpClient.get(
    endpoints.movie.getReleaseDates(id)
  );

  return data.results;
}