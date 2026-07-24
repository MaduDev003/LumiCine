"use client"

import { useState } from "react";
import { useMovieContext } from "@/src/context/MovieContext";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import { usePurchasedProductsStore } from "@/src/store/PurchasedProductsStore ";
import TicketConcluded from "@/src/features/checkout/components/TicketConcluded";
import LumibarProductsPurchased from "@/src/features/checkout/components/LumibarProductsPurchased";
import { orderPurchasedTicketsByDate } from "@/src/services/ticketsService";

export default function MyTicketsPage() {
    const [menu, setMenu] = useState(false);
    const { nowPlayingMoviesData, comingSoonMoviesData } = useMovieContext();
    const { orders } = usePurchasedProductsStore();
    const ordersByDate = orderPurchasedTicketsByDate(orders);

    return (
        <div className="min-h-screen flex flex-col">
            {!menu && (
                <>
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
                                <h1 className="text-2xl">Sem ingressos</h1>
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
                </>
            )}
        </div>
    );
}