import { getMovies } from "../../api/movie/getMovies";
import { getMovieReleaseDates } from "../../api/movie/getMovieReleaseDates";
import { MovieMapper } from "../../mappers/movieMapper";
import { extractAgeRating } from "../../utils/extractAgeRating";
import { randomNumber } from "../../utils/generateRandomNumbers";
import { MovieResponseType } from "../../types/movieResponseType";

export async function getMoviesData(page: number) {
  const movies = await getMovies(page);

  const listMovies = await Promise.all(
    movies.map(async (movie: any) => {
      const releaseData = await getMovieReleaseDates(movie.id);

      return MovieMapper.toDomain({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        overview: movie.overview,
        genre_ids: movie.genre_ids,
        age_rating: extractAgeRating(releaseData ?? []),
        duration: movie.duration,
        type: page === 1 ? "comingSoon" : "nowPlaying",
        showPeriod: generateMoviePeriod(movie.release_date),
        release_date: movie.release_date,
        backdrop_path: movie.backdrop_path,
        pre_sale: page === 1 ? randomNumber(movie.id) < 0.6 : undefined,
        cast: []
      });
    })
  );

  return listMovies.filter(
    (movie) =>
      movie.overview.trim() 
  );
}

export function generateMoviePeriod(releaseDate: string) {
  const startDate = new Date(releaseDate);

  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 4);

  return {
    startDate,
    endDate,
  };
}

export function filterMovieByDate(
  movies: MovieResponseType[],
  selectedDate: Date
) {
  const selectedTime = selectedDate.getTime();

  return movies.filter((movie) => {
    const startTime = new Date(movie.showPeriod.startDate).getTime();
    const endTime = new Date(movie.showPeriod.endDate).getTime();

    return (
      selectedTime >= startTime &&
      selectedTime <= endTime
    );
  });
}