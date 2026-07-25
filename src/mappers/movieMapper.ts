import { movieGenres } from "@/src/lib/movieGenres";
import { Movie } from "@/src/types/movieType";
import { MovieResponse } from "@/src/types/movieResponseType";

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
      room: Math.floor(Math.random() * 10),
      cast: movie.cast,
    };
  }
}