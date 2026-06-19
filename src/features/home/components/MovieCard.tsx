type Props = {
  posterImg: string;
  genders: string[];
  movieName: string;
  ageRating: string;
  duration: string;
  preSale: boolean;
};

export default function MovieCard(props: Props) {
const isSmallTitle = props.movieName.length <= 18;

  return (
    <div className="relative w-56 h-84 rounded-2xl overflow-hidden group cursor-pointer">
    <div className="absolute left-0 top-56 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-background-dark z-20" />

    <div className="absolute right-0 top-56 -translate-y-1/2 translate-x-1/2 w-6 h-6 rounded-full bg-background-dark z-20" />
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
                <span className="absolute top-0 left-15 bg-accent text-white text-xs px-2 py-1 rounded z-10">
                    Pré-venda
                </span>
                )}
            </div>
        </div>
      <div className="h-1/3 bg-secondary-dark flex flex-col text-xs shadow-inner transition-colors group-hover:bg-tertiary-dark/50 px-2 pt-3">
  
  <h2
    className={`font-medium text-font-dark text-[14px] leading-tight  ${
      isSmallTitle ? "text-center self-center" : "text-left self-start pl-1"
    }`}
  >
    {props.movieName}
  </h2>

  <p className="text-[12px] opacity-80 text-left self-start pl-2 mt-2">
    Duração: {props.duration}
  </p>

</div>
      </div>
    </div>
  );
}