import { getMovies } from "../api/movie/getMovies";
import { getMovieReleaseDates } from "../api/movie/getMovieReleaseDates";
import { MovieMapper } from "../mappers/movieMapper";
import { randomNumber } from "../utils/generateRandomNumbers";

export async function getMoviesData(page: number) {
  const movies = await getMovies(page);

  const moviesWithData = await Promise.all(
    movies.map(async (movie: any) => {
      const releaseData = await getMovieReleaseDates(movie.id);
      const showPeriod = generateMoviePeriod(movie.release_date);
      const preSale = page === 1 ? randomNumber(movie.id) < 0.7 : undefined;

      return MovieMapper.toDomain(
        {
          ...movie,
          age_rating: extractAgeRating(releaseData ?? []),
          pre_sale: preSale,
        },
        showPeriod
      );
    })
  );

  return moviesWithData;
}

export function generateMoviePeriod(releaseDate: string) {
  const startDate = new Date(releaseDate);

  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 3);

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

function filterMovieByDate(date: Date){
  //usar o showPeriod para verificar se está dentro do filtro de data selecionado pelo usuário
  //se estiver, o filme entrará na tela 
  //se não estiver no tempo selecionado, então não entrará na tela 
  //mostrar visualmente a data selecionada - mudando a borda laranja de lugar
  console.log(date);
}