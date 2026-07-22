"use client";

import { useState } from "react";
import { useMovieContext } from "@/src/context/MovieContext";
import { X } from "lucide-react";
import CheckoutProgress from "./components/CheckoutProgress";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import MenuListElements from "@/src/components/ui/MenuListElements";
import TicketConcluded from "./components/TicketConcluded";
import { usePurchasedTicketsStore } from "@/src/store/purchasedTicketsStore";


export default function ConcludedPage() {
    const [menu, setMenu] = useState(false);
    const { nowPlayingMoviesData, comingSoonMoviesData } = useMovieContext();
    const tickets = usePurchasedTicketsStore(
      state => state.tickets
  );

    return (
        <>
            {menu && (
                <div className="w-full h-screen flex items-center justify-center relative">
                    <button
                        onClick={() => setMenu(false)}
                        className="absolute top-6 right-6 p-2 rounded-full transition-all hover:bg-white/10 hover:backdrop-blur-sm"
                    >
                        <X className="w-6 h-6 text-font-dark" />
                    </button>

                    <MenuListElements className="flex-col gap-10 items-center" />
                </div>
            )}

            {!menu && (
                <>
                    <Header
                        setMenu={setMenu}
                        allMoviesForSearch={[
                            ...nowPlayingMoviesData,
                            ...comingSoonMoviesData,
                        ]}
                    />

                    <main className="mt-3 mb-30">
                        <div className="px-3 flex justify-center pt-8">
                            <div className="w-full max-w-280 mx-auto flex flex-col gap-6 items-center">
                                <CheckoutProgress type="concluded" />

                                <div className="flex flex-wrap gap-6 justify-center">
                                    {tickets.map((ticket) => (
                                        <TicketConcluded
                                            key={ticket.id}
                                            posterUrl={ticket.movie.poster}
                                            movieTitle={ticket.movie.title}
                                            date={ticket.session.date}
                                            time={ticket.session.time}
                                            seatPosition={ticket.seat.position}
                                            ticketType={ticket.ticketType}
                                        />
                                    ))}
                                </div>

                            </div>
                        </div>
                    </main>

                    <Footer />
                </>
            )}
        </>
    );
}