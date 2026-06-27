import { Movie } from "../domain/classes/movie";
import { movieGenres } from "../lib/movieGenres";
import { MovieType } from "../types/movieType";

export class MovieMapper {
  public static toDomain(movie: MovieType): Movie {
    const genres = movie.genre_ids
      .map(id => movieGenres[id])
      .slice(0, 2);
    
    const isPreSale = Math.random() < 0.45;

    return new Movie(
      movie.id,
      movie.title,
      `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
      movie.overview,
      genres,
      movie.age_rating || "?",
      "",
      isPreSale,
    );
  }
}