import { httpClient } from "@/src/api/config/httpClient";
import { endpoints } from "@/src/api/config/endpoints";

export async function getMovieCast(id: number) {
  const { data } = await httpClient.get(
    endpoints.movie.getCast(id)
  );

  return data.cast;
}