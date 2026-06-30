import { getMovieDetails } from "@/src/api/movie/getMovieDetails";
import { getMovieReleaseDates } from "@/src/api/movie/getMovieReleaseDates";
import { getMovieCast } from "@/src/api/movie/getMovieCast";
import { MovieMapper } from "@/src/mappers/movieMapper";
import { extractAgeRating } from "@/src/utils/extractAgeRating";
import { generateMoviePeriod } from "../movie/movieService";
import { randomNumber } from "@/src/utils/generateRandomNumbers";

export async function getMovieById(id: number, type: "comingSoon" | "nowPlaying") {
  const [data, releaseData, castResponse] = await Promise.all([
    getMovieDetails(id),
    getMovieReleaseDates(id),
    getMovieCast(id),
  ]);
  const castMembers = [];

   for(const castMember of castResponse){
        if(castMembers.length === 6) break;
        castMembers.push(castMember);
  }
 
  return MovieMapper.toDomain({
    id: id,
    title: data.title,
    poster_path: data.poster_path,
    backdrop_path: data.backdrop_path,
    overview: data.overview,
    genre_ids: data.genres.map((g: any) => g.id),
    age_rating: extractAgeRating(releaseData ?? []),
    duration: `${data.runtime ?? 0}min`,
    type,
    showPeriod: generateMoviePeriod(data.release_date),
    pre_sale: type === "comingSoon" ? randomNumber(id) < 0.6 : undefined,
    release_date: data.release_date,
    cast: [],
  });
}