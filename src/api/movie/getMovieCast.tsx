import { httpClient } from "../config/httpClient";
import { endpoints } from "../config/endpoints";

export async function getMovieCast(id: number) {
  const { data } = await httpClient.get(
    endpoints.movie.getCast(id)
  );

  return data.results;
}