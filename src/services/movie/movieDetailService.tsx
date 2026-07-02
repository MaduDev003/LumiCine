import { getMovieDetails } from "@/src/api/movie/getMovieDetails";
import { getMovieReleaseDates } from "../../api/movie/getMovieReleaseDates";
import { getMovieCast } from "@/src/api/movie/getMovieCast";
import { MovieMapper } from "@/src/mappers/movieMapper";
import { extractAgeRating } from "../../utils/extractAgeRating";
import { generateMoviePeriod } from "../dateFiltersService";

export async function getMovieById(id: number, type: "comingSoon" | "nowPlaying") {
  const [data, releaseData, castResponse] = await Promise.all([
    getMovieDetails(id),
    getMovieReleaseDates(id),
    getMovieCast(id),
  ]);
  const castMembers = [];
  let index = 0;

   for(const castMember of castResponse){
        if(castMembers.length === 4) break;
        castMembers.push({
          id: index,
          name: castMember.name,
          character: castMember.character
        });
        index++;
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
    show_period: generateMoviePeriod(data.release_date),
    pre_sale: data.pre_sale,
    release_date: data.release_date,
    cast: castMembers,
  });
}