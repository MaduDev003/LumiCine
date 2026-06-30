import { useRouter } from "next/navigation";
import { MovieType } from "@/src/types/movieType";

type Props = {
  movie: MovieType;
};

export default function MovieCard({movie}: Props) {
  const isSmallTitle = movie.title.length <= 23;
  const router = useRouter();

  function renderAgeClassificationColor(ageRating: string) {
    switch (ageRating) {
      case "L":
        return "bg-green-400 group-hover:bg-green-400/70";

      case "10":
        return "bg-blue-400/70 group-hover:bg-blue-400";

      case "12":
        return "bg-yellow-400/70 group-hover:bg-yellow-400";

      case "14":
        return "bg-orange-400/70 group-hover:bg-orange-400";

      case "16":
        return "bg-red-400/70 group-hover:bg-red-400";

      case "18":
        return "bg-black text-white group-hover:bg-black/70";

      default:
        return "bg-gray-500 group-hover:bg-gray-500/70 text-font-dark text-[15px] pt-1";
    }
  }

    

  return (
    <div
      className="
        relative w-56 h-90 rounded-2xl overflow-hidden group cursor-pointer
        transition-transform duration-300 ease-out
        hover:-translate-y-1
        hover:shadow-lg
      "
      onClick={() => router.push(`/movie/${movie.id}`)}
    >
    <div className="absolute left-0 top-56 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-background-dark z-20" />

    <div className="absolute right-0 top-56 -translate-y-1/2 translate-x-1/2 w-6 h-6 rounded-full bg-background-dark z-20" />
    <div className="h-full flex flex-col">
        <div className="h-2/3 shadow-inner transition-colors">
            <div
                className="h-full w-full relative"
                style={{
                backgroundImage: `url(${movie.posterUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                {movie.preSale && (
                <span className="absolute top-0 left-20 bg-accent text-white text-xs px-2 py-1 rounded z-10 shadow-[0_4px_12px_rgba(0,0,0,0.35)]">
                    Pré-venda
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
              className={`${renderAgeClassificationColor(movie.ageRating)} h-6 w-6 flex justify-center items-center mb-10 rounded mr-2 transition-colors`}
            >
              <span>{movie.ageRating}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}