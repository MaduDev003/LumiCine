export default function MovieCard() {
  return (
    <div className="relative w-44 h-72 bg-pink-600 rounded-2xl overflow-hidden">
      <div className="absolute left-0 top-48 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-background-dark" />

      <div className="absolute right-0 top-48 -translate-y-1/2 translate-x-1/2 w-5 h-5 rounded-full bg-background-dark" />

      <div className="h-full flex flex-col">

        <div className="h-2/3 bg-amber-500 flex items-center justify-center text-xs">
          1
        </div>

        <div className="h-1/3 bg-blue-500 flex items-center justify-center text-xs">
          2
        </div>

      </div>

    </div>
  );
}