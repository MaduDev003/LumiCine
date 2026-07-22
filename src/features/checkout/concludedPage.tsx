"use client";

import { useState } from "react";
import { useMovieContext } from "@/src/context/MovieContext";
import { mountTickets } from "@/src/services/ticketsService";
import { useCheckoutStore } from "@/src/store/checkoutStore";
import { X } from "lucide-react";
import CheckoutProgress from "./components/CheckoutProgress";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import MenuListElements from "@/src/components/ui/MenuListElements";
import TicketConcluded from "./components/TicketConcluded";


export default function ConcludedPage() {
    const [menu, setMenu] = useState(false);
    const { nowPlayingMoviesData, comingSoonMoviesData } = useMovieContext();
    const movie = useCheckoutStore((state) => state.movie);
    const seats = useCheckoutStore((state) => state.seats);
    const tickets = useCheckoutStore((state) => state.tickets);
    const session = useCheckoutStore((state) => state.session);

    const mountedTickets = mountTickets(tickets, seats, {
        movie: {
            title: movie?.title,
            poster: movie?.backdrop_url
        },
        session
    });

    console.log(mountedTickets);

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
                                    {mountedTickets.map((ticket) => (
                                        <TicketConcluded
                                            key={ticket.seat}
                                            posterUrl={ticket.movie.poster}
                                            movieTitle={ticket.movie.title}
                                            date={ticket.session.date}
                                            time={ticket.session.time}
                                            seatPosition={ticket.seat}
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