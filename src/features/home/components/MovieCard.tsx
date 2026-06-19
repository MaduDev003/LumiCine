type Props = {
  posterImg: string;
  genders: string[];
  movieName: string;
  ageRating: string;
  duration: string;
};

export default function MovieCard(props: Props) {
  return (
    <div className="relative w-44 h-72 rounded-2xl overflow-hidden group">

      <div className="absolute left-0 top-48 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-background-dark" />

      <div className="absolute right-0 top-48 -translate-y-1/2 translate-x-1/2 w-5 h-5 rounded-full bg-background-dark" />

      <div className="h-full flex flex-col">

        <div
          className="h-2/3 flex items-center justify-center text-xs shadow-inner transition-colors"
          style={{
            backgroundImage: `url(${props.posterImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          1
        </div>

        <div className="h-1/3 bg-secondary-dark flex items-center justify-center text-xs shadow-inner transition-colors group-hover:bg-tertiary-dark/50">
          2
        </div>

      </div>

    </div>
  );
}