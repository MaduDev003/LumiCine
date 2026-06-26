import { getMovies } from "../api/movie/getMovies";
import { getMovieReleaseDates } from "../api/movie/getMovieReleaseDates";
import { MovieMapper } from "../mappers/movieMapper";

function extractAgeRating(movieDetails: any): string {
  const br = movieDetails.find(
    (item: any) => item.iso_3166_1 === "BR"
  );

  return br?.release_dates?.[0]?.certification?.trim() ?? "";
}

export async function getMoviesData() {
  const movies = await getMovies();

  const moviesWithData = await Promise.all(
    movies.map(async (movie: any) => {
      const releaseData = await getMovieReleaseDates(movie.id);

      return {
        ...movie,
        ageRating: extractAgeRating(releaseData ?? []),
      };
    })
  );

  const moviess = moviesWithData
    .slice(0, 12);
    console.log(moviess, 'hehe')
}