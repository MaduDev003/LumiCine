import { getMovies } from "../../api/movie/getMovies";
import { getMovieReleaseDates } from "../../api/movie/getMovieReleaseDates";
import { MovieMapper } from "../../mappers/movieMapper";
import { extractAgeRating } from "../../utils/extractAgeRating";
import { MovieResponse } from "../../types/movieResponseType";
import { generateMoviePeriod } from "../dateFiltersService";

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
        show_period: generateMoviePeriod(movie.release_date),
        release_date: movie.release_date ?? "2020-01-01",
        backdrop_path: movie.backdrop_path,
        pre_sale: page === 1 ? isPreSale(movie.release_date) : undefined,
        cast: []
      });
    })
  );

  return listMovies.filter(
    (movie) =>
      movie.overview.trim() 
  );
}

export function filterMovieByDate(
  movies: MovieResponse[],
  selectedDate: Date
) {
  const selectedTime = selectedDate.getTime();

  return movies.filter((movie) => {
    const startTime = new Date(movie.show_period.start_date).getTime();
    const endTime = new Date(movie.show_period.end_date).getTime();

    return (
      selectedTime >= startTime &&
      selectedTime <= endTime
    );
  });
}
 
export function isPreSale(releaseDate: string): boolean {
    const release = new Date(releaseDate);
    const today = new Date();

    const lastMonthDay10 = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      10
    );

    return release < lastMonthDay10;
  }

 export async function loadComingSoonMovies(selectedDate: Date | null, filter: "Todos" | "Pré venda") {
    const comingSoonMovies = await getMoviesData(1);
    let movies = [];
    
    if (!selectedDate) {       
      movies = comingSoonMovies;
    } else {
      const filtered = filterMovieByDate(comingSoonMovies, selectedDate);
     movies = filtered;
    }
    const visibleMovies = comingSoonMovies.filter((movie) => {
      if (filter === "Todos") return true;
      return movie.pre_sale;
    });

    return { movies: visibleMovies }
  }


  export async function loadNowPlayingMovies() {
    const nowPlayingMovies = await getMoviesData(2, );
    const bannerMovies = nowPlayingMovies.slice(0, 4);
    return{
      movies: nowPlayingMovies,
      bannerMovies: bannerMovies
    }
  }  