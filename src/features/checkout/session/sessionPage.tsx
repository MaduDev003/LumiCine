"use client";
import { useState } from "react";
import { ChevronRight, ChevronLeft, Ticket, Minus, Plus, X } from "lucide-react";
import { useCheckoutStore } from "@/src/store/checkoutStore";
import { useMovieContext } from "@/src/context/MovieContext";
import { useDateFilter } from "@/src/hooks/useDateFilters";
import MenuListElements from "@/src/components/ui/MenuListElements";
import CheckoutProgress from "../components/CheckoutProgress";
import Footer from "@/src/components/layout/Footer";
import ButtonCine from "@/src/components/ui/ButtonCine";
import CheckoutProduct  from "../components/CheckoutProduct";
import Header from "@/src/components/layout/Header";

export default function SessionPage() {
    const [menu, setMenu] = useState(false);
    const { nowPlayingMoviesData, comingSoonMoviesData } = useMovieContext();
    const movie = useCheckoutStore((state) => state.movie);
    const session = useCheckoutStore((state) => state.session);
    const setSession = useCheckoutStore((state) => state.setSession);
    const {
      visibleDates,
      hasNext,
      hasPrevious,
      handleNextDateFilter,
      handlePreviousDateFilter,
    } = useDateFilter(15, "session");
      
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
    { !menu &&(
        <>
          <Header setMenu={setMenu} allMoviesForSearch={[...nowPlayingMoviesData, ...comingSoonMoviesData]} />
          <main className="mt-5 mb-10">
            <div className="px-3 flex justify-center pt-8 pb-13">
                  <div className="w-full max-w-275 h-200 mx-auto pb-5  flex flex-col gap-4">
                      <CheckoutProgress type="session"/>
                      <div className="h-full flex">
                        <div className=" flex-2 px-10 gap-13 flex flex-col">
                            <section className="flex gap-6 flex-col">
                                <h1 className="text-xl pt-3">Idioma</h1>
                                <div className="items-center pl-22 flex gap-5">
                                  <button
                                    onClick={() => setSession({ language: "Legendado" })}
                                    className={`h-10 w-25 px-2 rounded transition-colors ${
                                      session.language === "Legendado"
                                        ? "bg-accent"
                                        : "bg-secondary-dark hover:bg-accent"
                                    }`}
                                  >
                                    Legendado
                                  </button>

                                  <button
                                    onClick={() => setSession({ language: "Dublado" })}
                                    className={`h-10 w-25 px-2 rounded transition-colors ${
                                      session.language === "Dublado"
                                        ? "bg-accent"
                                        : "bg-secondary-dark hover:bg-accent"
                                    }`}
                                  >
                                    Dublado
                                  </button>
                              </div>
                            </section>
                            <section className="flex flex-col gap-6">
                                <h1 className="text-xl pt-3">Horários</h1>
                                <div className="pl-7 flex items-center gap-5">
                                  <ChevronLeft
                                    onClick={handlePreviousDateFilter}
                                    className={`w-10 h-10 p-1 stroke-1 rounded-full transition ${
                                      hasPrevious
                                        ? "hover:bg-white/10 cursor-pointer"
                                        : "opacity-40 cursor-not-allowed"
                                    }`}
                                  />

                                  <div className="flex gap-4">
                                    {visibleDates.map((item, index) => (
                                      <button
                                        key={item.fullDate.toISOString()}
                                        onClick={() =>
                                          setSession({
                                            date: item.formattedDate,
                                            time: item.sessions[index],
                                          })
                                        }
                                        className={`w-40 h-25 rounded flex flex-col items-center justify-center transition-colors gap-3 ${
                                          session.date === item.formattedDate
                                            ? "bg-accent"
                                            : "bg-secondary-dark hover:bg-accent"
                                        }`}
                                      >
                                        <h2 className="text-xl">{item.formattedDate}</h2>

                                        <p className="text-[18px] text-font-secondary-dark">
                                          {item.sessions[index]}
                                        </p>
                                      </button>
                                    ))}
                                  </div>
                                  <ChevronRight
                                    onClick={handleNextDateFilter}
                                    className={`w-10 h-10 p-1 stroke-1 rounded-full transition ${
                                      hasNext
                                        ? "hover:bg-white/10 cursor-pointer"
                                        : "opacity-40 cursor-not-allowed"
                                    }`}
                                  />
                                </div>
                            </section>
                            <section className="flex flex-col gap-6">
                              <h1 className="text-xl pt-3">Ingressos</h1>
                              <div className="flex flex-col gap-3 mx-22">
                                <div className="bg-secondary-dark h-22 rounded p-5 flex  items-center justify-between">
                                    <div className="flex gap-4">
                                        <div className="flex items-center">
                                          <Ticket className="animation-trans -rotate-45 stroke-1 fill-tertiary-dark stroke-secondary-dark" size={28}/>
                                        </div>
                                        <div>
                                          <h3>Inteira</h3>
                                          <p className="text-font-secondary-dark">R$ 20,00</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <button
                                        className="w-8 h-8 rounded-full bg-background-dark/60 text-font-dark flex items-center justify-center hover:bg-background-dark/30 transition cursor-pointer"
                                      >
                                        <Plus size={18}/>
                                      </button>

                                      <span className="w-6 text-center text-font-dark font-medium">
                                        0
                                      </span>

                                      <button
                                        className="w-8 h-8 rounded-full bg-background-dark/60 text-font-dark flex items-center justify-center  hover:bg-background-dark/30 transition cursor-pointer"
                                      >
                                        <Minus size={18}/>
                                      </button>
                                  </div>
                                </div>
                                <div className="bg-secondary-dark h-22 rounded p-5 flex  items-center justify-between">
                                    <div className="flex gap-4">
                                        <div className="flex items-center">
                                          <Ticket className="animation-trans -rotate-45 stroke-1 fill-tertiary-dark stroke-secondary-dark" size={28}/>
                                        </div>
                                        <div>
                                          <h3>Meia</h3>
                                          <p className="text-font-secondary-dark">R$10,00</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <button
                                        className="w-8 h-8 rounded-full bg-background-dark/60 text-font-dark flex items-center justify-center  hover:bg-background-dark/30 transition cursor-pointer"
                                      >
                                        <Plus size={18}/>
                                      </button>

                                      <span className="w-6 text-center text-font-dark font-medium">
                                        0
                                      </span>

                                      <button
                                        className="w-8 h-8 rounded-full bg-background-dark/60 text-font-dark flex items-center justify-center  hover:bg-background-dark/30 transition cursor-pointer"
                                      >
                                        <Minus size={18}/>
                                      </button>
                                  </div>
                                </div>
                              </div>
                            </section>
                            <div className="flex justify-center">
                              <ButtonCine text="Continuar" className="bg-accent w-60 text-font-dark 
                                  h-12
                                  transition-all duration-300 
                                  hover:scale-105 cursor-pointer
                                  hover:brightness-110
                                  hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)]" />
                            </div>
                        </div>
                          <CheckoutProduct type="session"/>
                      </div>
                  </div>
              </div>
          </main>
        </>
    )}
    <Footer/>

  </>
  )
}