import { Movie } from "../domain/classes/movie";
import { movieGenres } from "../lib/movieGenres";
import { MovieType } from "../types/movieType";

export class MovieMapper {
  public static toDomain(movie: MovieType): Movie {
    console.log(movie,' MOVIE')
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