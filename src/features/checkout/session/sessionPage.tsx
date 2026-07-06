"use client";
import { useCheckoutStore } from "@/src/store/checkoutStore";
import CheckoutProgress from "../components/checkoutProgress";
import { ChevronRight, ChevronLeft, Ticket, Minus, Plus } from "lucide-react";
import Footer from "@/src/components/layout/Footer";
export default function SessionPage() {
  
    const movie = useCheckoutStore((state) => state.movie);
  return (
    <>
    <main className="mt-15 mb-6">
       <div className="px-3 flex justify-center pt-8 pb-20">
            <div className="w-full max-w-275 h-200 mx-auto pb-5  flex flex-col gap-4">
                <CheckoutProgress step="session"/>
                <div className="h-full flex">
                  <div className=" flex-2 px-10 gap-4 flex flex-col">
                      <section className="flex gap-4 flex-col">
                          <h1 className="text-xl pt-3">Idioma</h1>
                          <div className="items-center pl-22 flex gap-5">
                            <button className="bg-secondary-dark h-10 px-2 rounded">Legendado</button>
                            <button  className="bg-secondary-dark h-10 w-25 px-2 rounded">Dublado</button>
                          </div>
                      </section>
                      <section className="flex flex-col gap-4">
                           <h1 className="text-xl pt-3">Horários</h1>
                           <div className="pl-5 flex gap-5 items-center">
                                <ChevronLeft className="w-12 h-12 stroke-1" />
                                <div className="flex gap-4">
                                  <button className="bg-secondary-dark w-40 h-25 rounded flex flex-col gap-3 items-center justify-center">
                                    <h2>19 Fev</h2>
                                    <p>13:30 - 15:00</p>
                                  </button>
                                  <button className="bg-secondary-dark w-40 h-25 rounded flex flex-col gap-3 items-center justify-center">
                                    <h2>19 Fev</h2>
                                    <p>13:30 - 15:00</p>
                                  </button>
                                  <button className="bg-secondary-dark w-40 h-25 rounded flex flex-col gap-3 items-center justify-center">
                                    <h2>19 Fev</h2>
                                    <p>13:30 - 15:00</p>
                                  </button>
                                </div>
                                <ChevronRight className="w-12 h-12 stroke-1" />
                           </div>
                      </section>
                      <section className="flex flex-col gap-4">
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
                                  className="w-8 h-8 rounded-full bg-tertiary-dark/60 text-font-dark flex items-center justify-center hover:bg-tertiary-dark transition cursor-pointer"
                                >
                                  <Plus size={18}/>
                                </button>

                                <span className="w-6 text-center text-font-dark font-medium">
                                  1
                                </span>

                                <button
                                  className="w-8 h-8 rounded-full bg-tertiary-dark/60 text-font-dark flex items-center justify-center hover:bg-tertiary-dark transition cursor-pointer"
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
                                  className="w-8 h-8 rounded-full bg-tertiary-dark/60 text-font-dark flex items-center justify-center hover:bg-tertiary-dark transition cursor-pointer"
                                >
                                  <Plus size={18}/>
                                </button>

                                <span className="w-6 text-center text-font-dark font-medium">
                                  1
                                </span>

                                <button
                                  className="w-8 h-8 rounded-full bg-tertiary-dark/60 text-font-dark flex items-center justify-center hover:bg-tertiary-dark transition cursor-pointer"
                                >
                                  <Minus size={18}/>
                                </button>
                            </div>
                          </div>
                        </div>
                      </section>
                  </div>
                  <div className="bg-yellow-400 flex-1">2</div>
                </div>
            </div>
        </div>
    </main>
    <Footer/>
  </>
  )
}