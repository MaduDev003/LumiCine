import MovieCard from "./MovieCard";
import { MovieType } from "@/src/types/movieType";

type MovieGridProps = {
  isLoading: boolean;
  moviesData: MovieType[];
};

export default function MovieGrid({
  isLoading,
  moviesData
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
                <MovieCard key={movie.id} movie={movie}/>
            ))
        }

    </div>
  );
}