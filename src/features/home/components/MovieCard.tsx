type Props = {
  posterImg: string;
  genders: string[];
  movieName: string;
  ageRating: string;
  duration: string;
  preSale: boolean;
};

export default function MovieCard(props: Props) {

  return (
    <div className="relative w-44 h-72 rounded-2xl overflow-hidden group">
    <div className="absolute left-0 top-48 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-background-dark z-20" />

    <div className="absolute right-0 top-48 -translate-y-1/2 translate-x-1/2 w-5 h-5 rounded-full bg-background-dark z-20" />
    <div className="h-full flex flex-col">
        <div className="h-2/3 shadow-inner transition-colors">
            <div
                className="h-full w-full relative"
                style={{
                backgroundImage: `url(${props.posterImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                {props.preSale && (
                <span className="absolute top-0 left-10 bg-accent text-white text-xs px-2 py-1 rounded z-10">
                    Pré-venda
                </span>
                )}
            </div>
        </div>
        <div className="h-1/3 bg-secondary-dark flex items-center justify-center text-xs shadow-inner transition-colors group-hover:bg-tertiary-dark/50">
          2
        </div>
      </div>
    </div>
  );
}