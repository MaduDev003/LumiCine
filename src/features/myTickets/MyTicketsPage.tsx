"use client"

import { useState } from "react";
import { useMovieContext } from "@/src/context/MovieContext";
import { usePurchasedProductsStore } from "@/src/store/PurchasedProductsStore";
import { orderPurchasedTicketsByDate } from "@/src/services/ticketsService";
import { useRouter } from "next/navigation";
import {X,ArrowRight, TicketX} from "lucide-react";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import TicketConcluded from "@/src/features/checkout/components/TicketConcluded";
import LumibarProductsPurchased from "@/src/features/checkout/components/LumibarProductsPurchased";
import MenuListElements from "@/src/components/ui/MenuListElements";

export default function MyTicketsPage() {
    const [menu, setMenu] = useState(false);
    const { nowPlayingMoviesData, comingSoonMoviesData } = useMovieContext();
    const { orders } = usePurchasedProductsStore();
    const ordersByDate = orderPurchasedTicketsByDate(orders);
    const router = useRouter();
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

     
        
            {!menu && (
                <>
                <div className="min-h-screen flex flex-col">
                    <Header
                        setMenu={setMenu}
                        allMoviesForSearch={[
                            ...nowPlayingMoviesData,
                            ...comingSoonMoviesData
                        ]}
                    />
                    <main className="min-h-150 flex flex-col items-center pt-10 pb-5">
                        <div className="w-full max-w-5xl min-h-150">
                            {Object.keys(ordersByDate).length === 0 && (
                                <div className="mx-auto mt-20 flex max-w-lg flex-col items-center rounded-3xl border border-zinc-800 bg-zinc-900/50 px-8 py-16 text-center shadow-lg">
                                <div className="mb-6 rounded-full bg-accent/10 p-5">
                                    <TicketX className="h-12 w-12 text-accent" />
                                </div>

                                <h2 className="text-2xl font-bold text-font-dark">
                                    Você ainda não possui ingressos
                                </h2>

                                <p className="mt-3 max-w-sm text-font-secondary-dark">
                                    Explore os filmes em cartaz e garanta seu próximo ingresso.
                                </p>

                                <button
                                    onClick={() => router.push("/")}
                                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-white transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 active:scale-95"
                                >
                                    Explorar filmes
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                                </div>
                            )}
                            {Object.entries(ordersByDate).map(([date, order]) => (
                                <div key={date} className="mb-10 text-xl px-5">
                                    <h1>
                                        Compra efetuada: {date}
                                    </h1>
                                    <div className="flex flex-wrap gap-5 mt-5 justify-center">
                                        {order.tickets.map((ticket) => (
                                            <TicketConcluded
                                                key={ticket.id}
                                                room={ticket.movie.room}
                                                posterUrl={ticket.movie.poster}
                                                movieTitle={ticket.movie.title}
                                                date={ticket.session.date}
                                                time={ticket.session.time}
                                                seatPosition={ticket.seat.position}
                                                ticketType={ticket.ticketType}
                                            />
                                        ))}
                                        {order.lumibar.length > 0 && (
                                            <LumibarProductsPurchased items={order.lumibar} />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                    <Footer />    
                </div>
                </>
            )}
        </>
    );
}