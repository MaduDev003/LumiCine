import { getMovies } from "../api/movie/getMovies";
import { getMovieReleaseDates } from "../api/movie/getMovieReleaseDates";
import { MovieMapper } from "../mappers/movieMapper";


export async function getMoviesData(page: number) {
  const movies = await getMovies(page);

  const moviesWithData = await Promise.all(
    movies.map(async (movie: any) => {
      const releaseData = await getMovieReleaseDates(movie.id);
  
      return {
        ...movie,
        age_rating: extractAgeRating(releaseData ?? []),
      };
    })
  );

  const formatedMovies = moviesWithData
    .map(MovieMapper.toDomain);

  return formatedMovies;
}

function extractAgeRating(movieDetails: any): string {
  const br = movieDetails.find(
    (item: any) => item.iso_3166_1 === "BR"
  );

  return br?.release_dates?.[0]?.certification?.trim() ?? "";
}