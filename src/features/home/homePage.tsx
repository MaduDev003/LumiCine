"use client";

import {useState, useEffect} from "react";
import MenuListElements from "@/src/components/ui/MenuListElements";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import DateMovieFilter from "./components/DateMovieFilter";
import ButtonCine from "@/src/components/ui/ButtonCine";
import AvatarMovie from "@/src/assets/images/avatar_h_.jpg";
import {loadNowPlayingMovies, loadComingSoonMovies} from "@/src/services/movie/movieService";
import { ChevronRight, ChevronLeft, X, ChevronDown} from "lucide-react";
import MovieGrid from "./components/MovieGrid";
import { ErrorState } from "@/src/components/ui/ErrorState";
import { useDateFilter } from "@/src/hooks/useDateFilters";
import { useMovieContext } from "@/src/context/MovieContext";
import {useRouter} from "next/navigation";
import { useCheckoutStore } from "@/src/store/checkoutStore";

export default function HomePage() {
  const [menu, setMenu] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bannerMovies, setbannerMovies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<"Todos" | "Pré venda">("Todos");
  const currentMovie = bannerMovies[currentIndex];
  const {
    visibleDates,
    hasNext,
    hasPrevious,
    selectedDate,
    setSelectedDate,
    handleNextDateFilter,
    handlePreviousDateFilter,
  } = useDateFilter(60, "home");
  const {
    nowPlayingMoviesData,
    setNowPlayingMoviesData,
    comingSoonMoviesData,
    setComingSoonMoviesData,
  } = useMovieContext();
  const router = useRouter();

 const setMovie = useCheckoutStore((state) => state.setMovie);

  function handlePurchaseTicket(selectedMovie: any) {
    setMovie(selectedMovie);
    router.push("/checkout/session");
  }

  useEffect(() => {
    async function loadMovies() {
      try {
        setIsLoading(true);

        const { movies: comingSoonMovies } = await loadComingSoonMovies(selectedDate, filter);
        const { movies: nowPlayingMovies, bannerMovies: banner } = await loadNowPlayingMovies();

        setbannerMovies(banner);
        setComingSoonMoviesData(comingSoonMovies)
        setNowPlayingMoviesData(nowPlayingMovies);
      } catch(error: any) {
        setError("Não foi possível carregar os filmes...");
      } finally {
        setIsLoading(false);
      }
    }

    loadMovies();
  }, [selectedDate, filter]);

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
          <Header setMenu={setMenu} allMoviesForSearch={[...comingSoonMoviesData, ...nowPlayingMoviesData]}/>
         
          <main className="w-full py-8">
            <div className="px-6 flex justify-center pt-8 pb-20">
              <div className="w-full max-w-275 mx-auto px-6">
                {isLoading || !currentMovie ? (
                    <div className="aspect-video md:aspect-21/9 rounded-xl bg-gray-300 animate-pulse" />
                  ) : (
                    <div
                      className="aspect-video md:aspect-21/9 rounded-xl relative overflow-hidden shadow-sm bg-cover bg-center group"
                      style={{
                        backgroundImage: `url(${currentMovie.backdrop_url})`,
                      }}
                    >
                      <div className="absolute inset-0 bg-black/83 z-0" />
                      <div className="absolute inset-0 z-10">
                        <h1 className="absolute top-6 left-8 lg:top-7 lg:left-10 text-font-dark text-lg md:text-2xl lg:text-3xl font-medium drop-shadow-md">
                          {currentMovie.title}
                        </h1>

                        <p className="absolute top-16 left-8 lg:top-20 lg:left-10 w-3/4 md:w-1/2 lg:w-3/5 text-xs md:text-sm lg:text-[18px] text-white/60 leading-relaxed drop-shadow-md truncate md:whitespace-normal md:overflow-visible">
                          {currentMovie.overview}
                        </p>

                        <ButtonCine
                          className="
                            bg-accent text-font-dark
                            absolute
                            bottom-4 left-8
                            lg:bottom-10 lg:left-10
                            scale-75 md:scale-90 lg:scale-100
                            origin-left
                            h-10 md:h-10 lg:h-12
                            transition-all duration-300 
                            hover:scale-105 cursor-pointer
                            hover:brightness-110
                            hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)]
                          "
                          onClick={() => handlePurchaseTicket(currentMovie)}
                          text="Comprar Ingressos"
                        />
                      </div>

                      {/* SETAS */}
                      <div className="absolute bottom-4 right-4 md:bottom-4 md:right-6 lg:bottom-8 lg:right-4 flex gap-2 z-20">
                        <button
                          className={`
                            p-1.5 md:p-2 rounded-full backdrop-blur-xl border transition-colors
                            ${
                              currentIndex === 0
                                ? "bg-white/5 border-white/10 text-white/20 cursor-not-allowed"
                                : "bg-white/10 border-white/20 text-white/70 hover:bg-white/20 hover:text-white cursor-pointer"
                            }
                          `}
                          onClick={() => setCurrentIndex((prev) => prev - 1)}
                          disabled={currentIndex === 0}
                        >
                          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />
                        </button>

                        <button
                          className={`
                            p-1.5 md:p-2 rounded-full backdrop-blur-xl border transition-colors
                            ${
                              !bannerMovies[currentIndex + 1]
                                ? "bg-white/5 border-white/10 text-white/20 cursor-not-allowed"
                                : "bg-white/10 border-white/20 text-white/70 hover:bg-white/20 hover:text-white cursor-pointer"
                            }
                          `}
                          onClick={() =>  setCurrentIndex((prev) => prev + 1)}
                          disabled={!bannerMovies[currentIndex + 1]}
                        >
                          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />
                        </button>
                      </div>
                    </div>
                  )}
                <div className="flex mt-3 justify-center h-12 gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <span
                      key={i}
                      className={`h-2 w-8 rounded-full transition-colors duration-200 ${
                        i === currentIndex
                          ? "bg-font-dark"
                          : "bg-tertiary-dark hover:bg-font-dark"
                      }`}
                    />
                  ))}
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
                      <div className="flex justify-center gap-3 md:gap-6">
                        {visibleDates.map((date) => (
                          <DateMovieFilter
                            key={`${date.day}-${date.date}`}
                            {...date}
                            onClick={() =>
                              setSelectedDate((prev) =>
                                prev?.getTime() === date.fullDate.getTime()
                                  ? null
                                  : date.fullDate
                              )
                            }
                            selectedDate={
                              selectedDate?.getTime() === date.fullDate.getTime()
                            }
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
               <section className="mt-14">
                <div className="mb-12 flex gap-3 items-center">
                  <h1 className="text-4xl text-font-light">
                    Em Breve
                  </h1>
                  <div className="relative">
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="z-10 flex justify-around items-center bg-accent w-28 h-8 px-3 rounded cursor-pointer hover:bg-accent/90"
                    >
                      <span>{filter}</span>
                      <ChevronDown size={16} className={` transition-all duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}/>
                    </button>

                    {isOpen && (
                      <div className="absolute z-10 mt-1 w-28 bg-secondary-dark rounded shadow-lg overflow-hidden cursor-pointer">
                        <button
                          onClick={() => {
                            setFilter("Todos");
                            setIsOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-accent cursor-pointer"
                        >
                          Todos
                        </button>

                        <button
                          onClick={() => {
                            setFilter("Pré venda");
                            setIsOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-accent cursor-pointer"
                        >
                          Pré venda
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {error ? (
                  <ErrorState
                    title="Ops... algo deu errado"
                    message={error}
                    
                  />
                ) : (
                  <MovieGrid
                    isLoading={isLoading}
                    moviesData={comingSoonMoviesData}
        
                  />
                )}
              </section>


                <section className="mt-25">
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
                      
                    />
                  )}
                </section>
              </div>
            </div>  
          </main>
          
          <Footer />
        </>      
      )}
    </>
  );
}