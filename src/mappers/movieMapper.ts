import { Movie } from "../domain/classes/movie";
import { movieGenres } from "../lib/movieGenres";
import { TmdbMovie } from "../types/movieTypes";

export class MovieMapper {
  public static toDomain(movie: TmdbMovie): Movie {
    return new Movie(
      movie.id,
      movie.title,
      `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
      movie.overview,
      movie.genre_ids.map(id => movieGenres[id]),
      movie.age_rating,
      "",
      false
    );
  }
}