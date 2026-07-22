"use client";

import { useState } from "react";
import { useMovieContext } from "@/src/context/MovieContext";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import CheckoutProgress from "./components/CheckoutProgress";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import MenuListElements from "@/src/components/ui/MenuListElements";
import TicketConcluded from "./components/TicketConcluded";
import { usePurchasedTicketsStore } from "@/src/store/purchasedTicketsStore";

export default function ConcludedPage() {
    const [menu, setMenu] = useState(false);
    const [currentTicket, setCurrentTicket] = useState(0);
    const { nowPlayingMoviesData, comingSoonMoviesData } = useMovieContext();
    const tickets = usePurchasedTicketsStore(
        (state) => state.tickets
    );
    const ticket = tickets[currentTicket];
    const hasPrevious = tickets[currentTicket - 1];
    const hasNext = tickets[currentTicket + 1];

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

                                <div className="w-2/3 flex flex-col gap-6 items-center">
                                    <div className="w-full flex items-center justify-center gap-6">
                                        <button
                                            disabled={!hasPrevious}
                                            onClick={() =>
                                                hasPrevious && setCurrentTicket((prev) => prev - 1)
                                            }
                                            className={`
                                                w-14 h-14 flex items-center justify-center
                                                rounded-full transition
                                                ${
                                                    hasPrevious
                                                        ? "hover:bg-white/10 cursor-pointer"
                                                        : "opacity-40 cursor-not-allowed"
                                                }
                                            `}
                                        >
                                            <ChevronLeft className="w-10 h-10 stroke-1" />
                                        </button>

                                        {ticket && (
                                            <TicketConcluded
                                                key={ticket.id}
                                                posterUrl={ticket.movie.poster}
                                                movieTitle={ticket.movie.title}
                                                date={ticket.session.date}
                                                time={ticket.session.time}
                                                seatPosition={ticket.seat.position}
                                                ticketType={ticket.ticketType}
                                            />
                                        )}

                                        <button
                                            disabled={!hasNext}
                                            onClick={() =>
                                                hasNext && setCurrentTicket((prev) => prev + 1)
                                            }
                                            className={`
                                                w-14 h-14 flex items-center justify-center
                                                rounded-full transition
                                                ${
                                                    hasNext
                                                        ? "hover:bg-white/10 cursor-pointer"
                                                        : "opacity-40 cursor-not-allowed"
                                                }
                                            `}
                                        >
                                            <ChevronRight className="w-10 h-10 stroke-1" />
                                        </button>
                                    </div>

                                    <div className="flex py-3 gap-3 justify-center items-center">
                                        {tickets.map((ticket, index) => (
                                            <span
                                                key={ticket.id}
                                                className={`h-3 w-3 rounded-full ${
                                                    index === currentTicket
                                                        ? "bg-white"
                                                        : "bg-tertiary-dark"
                                                }`}
                                            />
                                        ))}
                                    </div>
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