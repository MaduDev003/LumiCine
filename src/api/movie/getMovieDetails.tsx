import { httpClient } from "@/src/api/config/httpClient";
import { endpoints } from "@/src/api/config/endpoints";

export async function getMovieDetails(id: number) {
  const { data } = await httpClient.get(
   `${endpoints.movie.getById(id)}?language=pt-BR`
  );

  return data;
}