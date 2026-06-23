"use client";
import {useState} from "react";

import MenuListElements from "./components/MenuListElements";
import Header from "../../components/layout/Header";
import DateMovieFilter from "./components/DateMovieFilter";
import MovieCard from "./components/MovieCard";
import Button from "../../components/ui/Button";
import AvatarMovie from "../../assets/images/avatar_h_.jpg";
import Avatar from "../../assets/images/avatar.jpg";
import enigma from "../../assets/images/enigma.jpg";
import you from "../../assets/images/you.jpg";
import { ChevronRight, ChevronLeft, Mail, X } from "lucide-react";

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
   const [menu, setMenu] = useState(false);
  return (
    <>
      {menu && (
      <div className="w-full h-screen flex items-center justify-center relative">
        
        <button
          onClick={() => setMenu(false)}
          className="absolute top-6 right-6 p-2 rounded-full transition-all hover:bg-white/10 hover:backdrop-blur-sm"
        >
          <X className="w-6 h-6 text-font-dark " />
        </button>

        <MenuListElements className="flex-col gap-10 items-center" />

      </div>
    )}

      {menu === false && (
        <>
          <Header menu={menu} setMenu={setMenu}/>
          <main className="w-full py-8">
            <div className="px-6 flex justify-center">
              <div className="w-8/12 max-w-4xl">

                {/* Banner */}
                <div
                  className="aspect-21/9 rounded-xl relative overflow-hidden shadow-sm bg-cover bg-center group"
                  style={{
                    backgroundImage: `url(${AvatarMovie.src})`,
                  }}
                >
                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-black/80 z-0" />

                  {/* CONTEÚDO */}
                  <div className="absolute inset-0 z-10">
                    <h1 className="absolute top-7 left-10 text-font-dark text-3xl font-medium drop-shadow-md">
                      Avatar
                    </h1>

                    <p className="absolute top-20 left-10 w-2/5 text-[15px] text-white/60 leading-relaxed drop-shadow-md">
                      Em Pandora, um ex-fuzileiro paraplégico recebe a chance de caminhar novamente por meio de um corpo Avatar. Durante sua missão, ele se aproxima do povo Na'vi e descobre a profunda conexão deles com a natureza. Dividido entre dever e consciência, precisa escolher de que lado ficará.
                    </p>

                    <Button
                      className="absolute bottom-10 left-10"
                      onClick={() => console.log("Ingresso clicado")}
                      buttonText="Comprar Ingresso"
                    />
                  </div>

                  <div className="absolute bottom-8 right-4 flex gap-2 z-20">
                      <button className="bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full backdrop-blur-xl border border-white/20">
                      <ChevronLeft className="disabled w-8 h-8 text-font-dark/30 cursor-default" />
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full backdrop-blur-xl border cursor-pointer border-white/20">
                      <ChevronRight className="w-8 h-8 text-white" />
                    </button>
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
                <section className="mt-14">
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

                    {/* Banner LumiBar */}
                <div
                  className="aspect-21/9 mt-14 rounded-xl relative overflow-hidden shadow-sm bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${AvatarMovie.src})`,
                  }}
                >
                  <div className="absolute inset-0 bg-black/80 " />

                  <div className="absolute bottom-8 right-4 flex gap-2 z-20">
                      <button className="bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full backdrop-blur-xl border border-white/20">
                      <ChevronLeft className="disabled w-8 h-8 text-font-dark/30 cursor-default" />
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 transition-colors cursor-pointer p-2 rounded-full backdrop-blur-xl border border-white/20">
                      <ChevronRight className="w-8 h-8 text-white" />
                    </button>
                  </div>
                </div>

                {/* INDICADORES */}
                <div className="flex mt-3 justify-center h-12 gap-2">
                  <span className="bg-font-dark h-2 w-8 rounded-full" />
                  <span className="bg-tertiary-dark h-2 w-8 rounded-full hover:bg-font-dark transition-colors duration-200" />
                  <span className="bg-tertiary-dark h-2 w-8 rounded-full hover:bg-font-dark transition-colors duration-200" />
                  <span className="bg-tertiary-dark h-2 w-8 rounded-full hover:bg-font-dark transition-colors duration-200" />
                </div>

                  <section className="mt-6">
                    <h1 className="text-4xl text-font-light mb-4">Em Exibição</h1>
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
          
          <footer className="bg-[#2C2C2C] text-gray-300 py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

              {/* LumiCine */}
              <div>
                <h3 className="text-font-dark text-xl mb-4">LumiCine</h3>

                <p className="mb-4">
                  Sua próxima sessão começa aqui.
                </p>

                <p className="text-sm text-gray-400">
                  Desenvolvido com React • Next.js • Tailwind CSS • TypeScript
                </p>
              </div>

              {/* Sobre */}
              <div>
                <h3 className="text-font-dark text-xl mb-4">
                  Sobre Mim
                </h3>

                <p className="text-sm text-gray-400 leading-relaxed">
                  Desenvolvedora Front-End com interesse em UI/UX, acessibilidade e experiências do usuário.
                </p>
              </div>

              {/* Redes */}
              <div>
                <h3 className="text-font-dark text-xl mb-4">
                  Redes
                </h3>

                <div className="flex flex-col gap-3">

                  <a
                    href="https://www.linkedin.com/in/maria-eduarda-schwarz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    LinkedIn
                  </a>

                  <a
                    href="https://github.com/NinaS23"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    GitHub (Estudante)
                  </a>

                    <a
                    href="https://github.com/MaduDev003"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    GitHub (Atual)
                  </a>

                  <a
                  href="mailto:mariaschwarzdev@gmail.com"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                            bg-white/10 hover:bg-white/20 border border-white/10
                            transition-colors"
                >
                  <Mail size={16} />
                  Enviar e-mail
                </a>

                </div>
              </div>

            </div>

            <div className="mt-16 border-t border-gray-700 pt-6">
              <p className="text-center text-gray-400">
                © 2026 LumiCine. Todos os direitos reservados.
              </p>
            </div>
          </div>
          </footer>
        </>      
      )}

        
     
    

   
    </>
  );
}