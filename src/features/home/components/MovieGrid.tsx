import MovieCard from "./MovieCard";
import { MovieType } from "@/src/types/movieType";

type MovieGridProps = {
  isLoading: boolean;
  moviesData: MovieType[];
  isComingSoon: boolean;
};

export default function MovieGrid({
  isLoading,
  moviesData,
  isComingSoon
}: MovieGridProps) {
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 justify-items-center">

      {isLoading &&
            Array.from({ length: 20 }).map((_, i) => (
                <div
                    key={i}
                    className="h-80 w-full bg-gray-300 rounded-xl animate-pulse"
                />
            ))
        }

      {!isLoading &&
            moviesData.map((movie) => (
                <MovieCard
                    key={movie.id}
                    id={movie.id}
                    posterUrl={movie.posterUrl}
                    backdropUrl={movie.backdropUrl}
                    overview={movie.overview}
                    showPeriod={movie.showPeriod}
                    genres={movie.genres}
                    title={movie.title}
                    ageRating={movie.ageRating}
                    duration={movie.duration}
                    preSale={isComingSoon && movie.preSale}
                    type={movie.type}
                />
            ))
        }

    </div>
  );
}