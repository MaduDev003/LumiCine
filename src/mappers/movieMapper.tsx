import { movieGenres } from "../lib/movieGenres";
import { Movie } from "../types/movieType";
import { MovieResponse } from "../types/movieResponseType";

export class MovieMapper {
  public static toDomain(movie: MovieResponse): Movie {
    const genres = movie.genre_ids
      .map((id) => movieGenres[id])
      .slice(0, 2);

      return {
      id: movie.id,
      title: movie.title,
      poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      overview: movie.overview,
      genres,
      age_rating: movie.age_rating || "?",
      duration: "1h 50m",
      type: movie.type,
      show_period: movie.show_period,
      release_date: movie.release_date,
      backdrop_url: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
      pre_sale: movie.pre_sale,
      cast: movie.cast,
    };
  }
}