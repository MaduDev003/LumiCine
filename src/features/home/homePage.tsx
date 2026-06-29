"use client";

import {useState, useEffect} from "react";
import MenuListElements from "./components/MenuListElements";
import Header from "../../components/layout/Header";
import DateMovieFilter from "./components/DateMovieFilter";
import Button from "../../components/ui/Button";
import AvatarMovie from "../../assets/images/avatar_h_.jpg";
import { getMoviesData } from "@/src/services/movieService";
import { ChevronRight, ChevronLeft, Mail, X } from "lucide-react";
import MovieGrid from "./components/MovieGrid";
import { ErrorState } from "@/src/components/ui/ErrorState";
import { useDateFilter } from "@/src/hooks/useDateFilters";

export default function HomePage() {
  const [menu, setMenu] = useState(false);
  const [comingSoonMoviesData, setComingSoonMoviesData] = useState<any[]>([]);
  const [nowPlayingMoviesData, setNowPlayingMoviesData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const {
    visibleDates,
    hasNext,
    hasPrevious,
    selectedDate,
    setSelectedDate,
    handleNextDateFilter,
    handlePreviousDateFilter,
  } = useDateFilter();
  

  async function loadMovies() {
  try {
    setIsLoading(true);

    const comingSoonMovies = await getMoviesData(1);
    setComingSoonMoviesData(comingSoonMovies);

    const nowPlayingMovies = await getMoviesData(2);
    setNowPlayingMoviesData(nowPlayingMovies);
  } catch {
    setError("Não foi possível carregar os filmes...");
  } finally {
    setIsLoading(false);
  }
  }

  useEffect(() => {
    loadMovies();
  }, []);

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
            <div className="px-6 flex justify-center pt-8 pb-20">
             <div className="w-full max-w-275 mx-auto px-6">
            {/* Banner */}
                <div
                  className="aspect-video md:aspect-21/9 rounded-xl relative overflow-hidden shadow-sm bg-cover bg-center group"
                  style={{
                    backgroundImage: `url(${AvatarMovie.src})`,
                  }}
                >
          {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/80 z-0" />
            {/* CONTEÚDO */}
                  <div className="absolute inset-0 z-10">
                    <h1 className="absolute top-6 left-8 lg:top-7 lg:left-10 text-font-dark text-lg md:text-2xl lg:text-3xl font-medium drop-shadow-md">
                      Avatar
                    </h1>

                    <p className="absolute top-16 left-8 lg:top-20 lg:left-10 w-3/4 md:w-1/2 lg:w-2/5 text-xs md:text-md lg:text-[18px] text-white/60 leading-relaxed drop-shadow-md">
                      Em Pandora, um ex-fuzileiro paraplégico recebe a chance de caminhar
                      novamente por meio de um corpo Avatar. Durante sua missão, ele se
                      aproxima do povo Na'vi e descobre a profunda conexão deles com a
                      natureza. Dividido entre dever e consciência, precisa escolher de que
                      lado ficará.
                    </p>
                    <Button
                      className="
                        absolute
                        bottom-4 left-8
                        lg:bottom-10 lg:left-10
                        scale-75 md:scale-90 lg:scale-100
                        origin-left
                        h-10 md:h-10 lg:h-12
                      "
                      onClick={() => console.log('Ingresso clicado')}
                      buttonText="Comprar Ingresso"
                    />
                  </div>
                  {/* SETAS */}
                  <div className="absolute bottom-4 right-4 md:bottom-4 md:right-6 lg:bottom-8 lg:right-4 flex gap-2 z-20">
                    <button className="bg-white/10 hover:bg-white/20 transition-colors p-1.5 md:p-2 rounded-full backdrop-blur-xl border border-white/20">
                      <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-font-dark/30 cursor-default" />
                    </button>

                    <button className="bg-white/10 hover:bg-white/20 transition-colors p-1.5 md:p-2 rounded-full backdrop-blur-xl border border-white/20">
                      <ChevronRight className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white" />
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
                <section className="bg-secondary-dark p-5 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={handlePreviousDateFilter}
                      disabled={!hasPrevious}
                      className={
                        !hasPrevious
                          ? "text-font-dark/30 cursor-default"
                          : "text-font-dark hover:text-white transition-colors duration-200 hover:scale-105 cursor-pointer"
                      }
                    >
                      <ChevronLeft className="w-12 h-12 stroke-1" />
                    </button>

                    <div className="overflow-x-clip scrollbar-hide">
                      <div className="flex gap-6">
                          {visibleDates.map((date) => (
                            <DateMovieFilter
                              key={`${date.day} - ${date.date}`}
                              {...date}
                              onClick={() => setSelectedDate(date.fullDate)}
                              selectedDate={selectedDate === date.fullDate}
                            />
                          ))}
                        </div>
                    </div>

                    <button
                      onClick={handleNextDateFilter}
                      disabled={!hasNext}
                      className={
                        hasNext
                          ? "text-font-dark hover:text-white transition-colors duration-200 hover:scale-105 cursor-pointer"
                          : "text-font-dark/30 cursor-default"
                      }
                    >
                      <ChevronRight className="w-12 h-12 stroke-1" />
                    </button>
                  </div>
                </section>
                
                {/* EM BREVE */}
               <section className="mt-14">
                <h1 className="text-4xl text-font-light mb-12">
                  Em Breve
                </h1>

                {error ? (
                  <ErrorState
                    title="Ops... algo deu errado"
                    message={error}
                    
                  />
                ) : (
                  <MovieGrid
                    isLoading={isLoading}
                    moviesData={comingSoonMoviesData}
                    isComingSoon={true}
                  />
                )}
              </section>

                    {/* Banner LumiBar */}
                <div
                  className="aspect-21/9 mt-16 rounded-xl relative overflow-hidden shadow-sm bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${AvatarMovie.src})`,
                  }}
                >
                  <div className="absolute inset-0 bg-black/80 " />

                  <div className="absolute bottom-4 right-4 md:bottom-4 md:right-6 lg:bottom-8 lg:right-4 flex gap-2 z-20">
                    <button className="bg-white/10 hover:bg-white/20 transition-colors p-1.5 md:p-2 rounded-full backdrop-blur-xl border border-white/20">
                      <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-font-dark/30 cursor-default" />
                    </button>

                    <button className="bg-white/10 hover:bg-white/20 transition-colors p-1.5 md:p-2 rounded-full backdrop-blur-xl border border-white/20">
                      <ChevronRight className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white" />
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
                  <h1 className="text-4xl text-font-light mb-12">
                    Em Exibição
                  </h1>

                  {error ? (
                    <ErrorState
                      title="Ops... algo deu errado"
                      message={error}
                      
                    />
                  ) : (
                    <MovieGrid
                      isLoading={isLoading}
                      moviesData={nowPlayingMoviesData}
                      isComingSoon={false}
                    />
                  )}
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