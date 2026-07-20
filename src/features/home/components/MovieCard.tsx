import { useRouter } from "next/navigation";
import { Movie } from "@/src/types/movieType";
import {renderAgeClassificationColor} from "../../../utils/renderAgeClassificationColor";

type Props = {
  movie: Movie;
};

export default function MovieCard({movie}: Props) {
  const isSmallTitle = movie.title.length <= 23;
  const router = useRouter();

  return (
    <div
      className="
        relative w-56 h-90 rounded-2xl overflow-hidden group cursor-pointer
        transition-transform duration-300 ease-out
        hover:-translate-y-1
        hover:shadow-lg
      "
      onClick={() => router.push(`/movie/${movie.id}?type=${movie.type}`)}
    >
    <div className="absolute left-0 top-56 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-background-dark z-20" />

    <div className="absolute right-0 top-56 -translate-y-1/2 translate-x-1/2 w-6 h-6 rounded-full bg-background-dark z-20" />
    <div className="h-full flex flex-col">
        <div className="h-2/3 shadow-inner transition-colors">
            <div
                className="h-full w-full relative"
                style={{
                backgroundImage: `url(${movie.poster_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />

                {movie.pre_sale && movie.type === "comingSoon" && (
                <span className="absolute top-0 left-20 bg-accent text-white text-xs px-2 py-1 rounded z-10 shadow-[0_4px_12px_rgba(0,0,0,0.35)]">
                   <p className="text-[15px]">Pré-venda</p> 
                </span>
                )}
            </div>
        </div>
        <div className="h-1/3 bg-secondary-dark flex flex-col gap-3 text-xs shadow-inner transition-colors group-hover:bg-tertiary-dark/50 px-2 pt-3">
          <h2
            className={`min-h-6 font-medium text-font-dark text-[14px] leading-tight ${
              isSmallTitle ? "text-center" : "text-left pl-1"
            }`}
          >
            {movie.title}
          </h2>

          <p className="text-[14px] opacity-80 text-left self-start pl-1 mt-2">
            Duração: {movie.duration}
          </p>
            
         <div className="flex justify-between mt-auto">
            <div className="flex gap-2 h-6 items-center">
              {movie.genres.map((genre, index) => (
                <div
                  key={index}
                  className="bg-background-dark group-hover:bg-background-dark/60 h-5 flex justify-center px-2 py-0.5 rounded-2xl"
                >
                  <span>{genre}</span>
                </div>
              ))}
            </div>

            <div
              className={`${renderAgeClassificationColor(movie.age_rating)} h-6 w-6 flex justify-center items-center mb-10 rounded mr-2 transition-colors`}
            >
              <span>{movie.age_rating}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}