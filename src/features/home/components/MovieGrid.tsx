import MovieCard from "./MovieCard";

type Movie = {
  id: string | number;
  posterUrl: string;
  genres: string[];
  title: string;
  ageRating: string;
  preSale: boolean;
};

type MovieGridProps = {
  isLoading: boolean;
  moviesData: Movie[];
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
                    posterImg={movie.posterUrl}
                    genders={movie.genres}
                    movieName={movie.title}
                    ageRating={movie.ageRating}
                    duration={"1h 30m"}
                    preSale={isComingSoon && movie.preSale}
                />
            ))
        }

    </div>
  );
}