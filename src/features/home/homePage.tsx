"use client";

import Header from "../../components/layout/Header";
import DateMovieFilter from "./components/DateMovieFilter";
import MovieCard from "./components/MovieCard";
import Button from "../../components/ui/Button";
import AvatarMovie from "../../assets/images/avatar_h_.jpg";
import Avatar from "../../assets/images/avatar.jpg";
import enigma from "../../assets/images/enigma.jpg";
import you from "../../assets/images/you.jpg";
import { ChevronRight, ChevronLeft } from "lucide-react";

const dates = [
  { day: "Seg", date: 29, selectedDate: true },
  { day: "Ter", date: 30, selectedDate: false },
  { day: "Qua", date: 1, selectedDate: false },
  { day: "Qui", date: 2, selectedDate: false },
  { day: "Sex", date: 3, selectedDate: false },
];

const movies = [
  { posterImg: you.src, genders: ["Suspense", "Comédia"], movieName: "You", ageRating: "16", duration: "1h 45m", preSale: false},
  { posterImg: Avatar.src, genders: ["Drama", "Sci-fi"], movieName: "Avatar", ageRating: "L", duration: "2h 12m", preSale: true },
  { posterImg: enigma.src, genders: ["Suspense", "Ação"], movieName: "O Morro Dos Ventos Uivantes", ageRating: "14", duration: "1h 58m", preSale: true },
  { posterImg: you.src, genders: ["Suspense", "Drama"], movieName: "You", ageRating: "18", duration: "1h 45m", preSale: false },
];

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="w-full py-8">
        <div className="px-6 flex justify-center">
          <div className="w-8/12 max-w-4xl">

            {/* Banner */}
            <div
              className="aspect-21/9 rounded-xl relative overflow-hidden shadow-sm bg-cover bg-center"
              style={{
                backgroundImage: `url(${AvatarMovie.src})`,
              }}
            >
              <div className="absolute inset-0 bg-black/85 " />

              {/* CONTEÚDO */}
              <div className="absolute inset-0 z-10">
                <h1 className="absolute top-7 left-10 text-font-dark text-3xl font-medium drop-shadow-md">
                  Avatar
                </h1>

                <p className="absolute top-20 left-10 w-2/5 text-[14px] text-white/60 leading-relaxed drop-shadow-md">
                  Em Pandora, um ex-fuzileiro paraplégico recebe a chance de caminhar novamente por meio de um corpo Avatar. Durante sua missão, ele se aproxima do povo Na'vi e descobre a profunda conexão deles com a natureza. Dividido entre dever e consciência, precisa escolher de que lado ficará.
                </p>

                <Button
                  className="absolute bottom-10 left-10"
                  onClick={() => console.log("Ingresso clicado")}
                  buttonText="Comprar Ingresso"
                />
              </div>
            </div>

            {/* INDICADORES */}
            <div className="flex mt-3 justify-center h-12 gap-2">
              <span className="bg-font-dark h-2 w-8 rounded-full" />
              <span className="bg-tertiary-dark h-2 w-8 rounded-full hover:bg-font-dark transition-colors duration-200" />
              <span className="bg-tertiary-dark h-2 w-8 rounded-full hover:bg-font-dark transition-colors duration-200" />
              <span className="bg-tertiary-dark h-2 w-8 rounded-full hover:bg-font-dark transition-colors duration-200" />
            </div>

            {/* FILTRO DE DATAS */}
            <section className="bg-secondary-dark mt-3 rounded-xl h-24 flex items-center justify-between px-6">
              <button disabled className="text-font-dark/30 cursor-default">
                <ChevronLeft className="w-12 h-12 stroke-1" />
              </button>

              <div className="flex overflow-x-clip scrollbar-hide gap-6">
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
                <ChevronRight className="w-12 h-12 stroke-1" />
              </button>
            </section>
            
            {/* EM BREVE */}
            <section className="mt-12">
                <h1 className="text-4xl text-font-light mb-4">Em Breve</h1>
                <div className="w-full h-90 flex items-center  gap-4 mt-6 rounded-xl overflow-x-auto scrollbar-hide">
                  {movies.map((movie, index) => (
                    <MovieCard
                      key={index}
                      posterImg={movie.posterImg}
                      genders={movie.genders}
                      movieName={movie.movieName}
                      ageRating={movie.ageRating}
                      duration={movie.duration}
                      preSale={movie.preSale}
                    />
                  ))}
                </div>
                <div className="w-full h-90 flex items-center gap-4 mt-6 rounded-xl overflow-x-auto scrollbar-hide">
                  {movies.map((movie, index) => (
                    <MovieCard
                      key={index}
                      posterImg={movie.posterImg}
                      genders={movie.genders}
                      movieName={movie.movieName}
                      ageRating={movie.ageRating}
                      duration={movie.duration}
                      preSale={movie.preSale}
                    />
                  ))}
                
                </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}