import Header from "../../components/layout/Header";
import DateMovieFilter from "./components/DateMovieFilter";
import AvatarMovie from "../../assets/images/avatar_h_.jpg";
import { ChevronRight, ChevronLeft } from "lucide-react";

/* TODO: isso será futuramente repensado - no momento é válido para construção do layout e leitura como um todo */
const dates = [
  { day: "Seg", date: 29, selectedDate: true },
  { day: "Ter", date: 30, selectedDate: false },
  { day: "Qua", date: 1, selectedDate: false },
  { day: "Qui", date: 2, selectedDate: false },
  { day: "Sex", date: 3, selectedDate: false },
];

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="w-full py-8">
        <div className="px-6 flex justify-center">
          <div className="w-8/12 max-w-4xl">
            <div className="aspect-21/9 rounded-xl relative overflow-hidden shadow-sm">
              <img
                src={AvatarMovie.src}
                alt="Avatar Movie Poster"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/40 to-transparent" />
            </div>

            <div className="flex mt-3 justify-center h-12 gap-2">
              <span className="bg-font-dark h-2 w-8 rounded-full hover:bg-font-dark transition-colors duration-200"></span>
              <span className="bg-tertiary-dark h-2 w-8 rounded-full hover:bg-font-dark transition-colors duration-200"></span>
              <span className="bg-tertiary-dark h-2 w-8 rounded-full hover:bg-font-dark transition-colors duration-200"></span>
              <span className="bg-tertiary-dark h-2 w-8 rounded-full hover:bg-font-dark transition-colors duration-200"></span>
            </div>

            <section className="bg-secondary-dark mt-3 rounded-xl h-24 flex items-center justify-between px-6">
              <button
                disabled
                className="text-font-dark/30 cursor-default"
              >
                <ChevronLeft className="w-8 h-8 stroke-1" />
              </button>

              <div className="flex overflow-x-clip scrollbar-hide gap-5">
                {dates.map((item) => (
                  <DateMovieFilter
                    key={`${item.day}-${item.date}`}
                    selectedDate={item.selectedDate}
                    day={item.day}
                    date={item.date}
                  />
                ))}
              </div>
              

              <button className="text-font-dark hover:text-white transition-colors duration-200 hover:scale-105 cursor-pointer">
                <ChevronRight className="w-8 h-8 stroke-1" />
              </button>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}