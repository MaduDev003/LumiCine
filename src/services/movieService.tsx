import { getMovies } from "../api/movie/getMovies";
import { getMovieReleaseDates } from "../api/movie/getMovieReleaseDates";
import { MovieMapper } from "../mappers/movieMapper";
import { randomNumber } from "../utils/generateRandomNumbers";
import { MovieType } from "../types/movieType";

export async function getMoviesData(page: number) {
  const movies = await getMovies(page);

  const moviesWithData = await Promise.all(
    movies.map(async (movie: any) => {
      const releaseData = await getMovieReleaseDates(movie.id);
      const showPeriod = generateMoviePeriod(movie.release_date);
      const preSale = page === 1 ? randomNumber(movie.id) < 0.7 : undefined;
      const movieType = page === 1 ? "comingSoon" : "nowPlaying"

      return MovieMapper.toDomain(
        {
          ...movie,
          age_rating: extractAgeRating(releaseData ?? []),
          type: movieType,
          pre_sale: preSale,
        },
        showPeriod,
      );
    })
  );

  const validMovies = moviesWithData.filter((movie) => {
    return (
      movie.overview?.trim() &&
      movie.backdropPath &&
      movie.title
    );
  });

  return validMovies;
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

function extractAgeRating(movieDetails: any): string {
  const br = movieDetails.find(
    (item: any) => item.iso_3166_1 === "BR"
  );

  return br?.release_dates?.[0]?.certification?.trim() ?? "";
}

export function filterMovieByDate(
  movies: MovieType[],
  selectedDate: Date
) {
  const selectedTime = selectedDate.getTime();

  return movies.filter((movie) => {
    const startTime = new Date(movie.showPeriod.startDate).getTime();
    const endTime = new Date(movie.showPeriod.endDate).getTime();

    return selectedTime >= startTime && selectedTime <= endTime;
  });
}
