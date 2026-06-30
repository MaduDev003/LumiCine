import { Movie } from "../domain/classes/movie";
import { movieGenres } from "../lib/movieGenres";
import { MovieResponseType } from "../types/movieResponseType";
import { MoviePeriodType } from "../types/moviePeriodType";

export class MovieMapper {
  public static toDomain(
    movie: MovieResponseType,
    showPeriod: MoviePeriodType
  ): Movie {
    const genres = movie.genre_ids
      .map((id) => movieGenres[id])
      .slice(0, 2);

    return new Movie(
      movie.id,
      movie.title,
      `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
      movie.overview,
      genres,
      movie.age_rating || "?",
      "1h 50m",
      movie.type,
      showPeriod,
      movie.pre_sale
    );
  }
}