type Props = {
  selectedDate: boolean;
  day: string;
  fullDate: Date;
  date: number;
  onClick: () => void;
};

export default function DateMovieFilter({
  day,
  date,
  onClick,
  selectedDate
}: Props) {

  return (
      <button
        onClick={onClick}
        className={`
          w-16 sm:w-20 md:w-24
          h-20
          rounded-xl
          relative
          cursor-pointer
          border-2
          ${
            selectedDate
              ? "border-accent"
              : "border-tertiary-dark hover:border-accent transition-colors duration-200"
          }
        `}
      >
      <span className="absolute text-sm top-1.5 left-1/2 -translate-x-1/2">
        {day}
      </span>

      <h3 className="h-full text-xl flex items-center justify-center mt-2">
        {date}
      </h3>
    </button>
  );
}