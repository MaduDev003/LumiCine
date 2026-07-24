"use client";

import { useState } from "react";
import { useMovieContext } from "@/src/context/MovieContext";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { usePurchasedProductsStore } from "@/src/store/PurchasedProductsStore ";
import CheckoutProgress from "./components/CheckoutProgress";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import MenuListElements from "@/src/components/ui/MenuListElements";
import TicketConcluded from "./components/TicketConcluded";
import LumibarProductsPurchased from "./components/LumibarProductsPurchased";
import { useCheckoutStore } from "@/src/store/checkoutStore";

export default function ConcludedPage() {
    const [menu, setMenu] = useState(false);
    const [currentItem, setCurrentItem] = useState(0);
    const { nowPlayingMoviesData, comingSoonMoviesData } = useMovieContext();
    const seats = useCheckoutStore(state => state.seats)
    const orders = usePurchasedProductsStore((state) => state.orders);

    const currentOrder = orders[orders.length - 1];

    const tickets = currentOrder?.tickets ?? [];
    const lumibar = currentOrder?.lumibar ?? [];

    const totalItems = tickets.length + (lumibar.length > 0 ? 1 : 0);

    const ticket = tickets[
        lumibar.length > 0 ? currentItem - 1 : currentItem
    ];

    function previousItem() {
        if (currentItem > 0) {
            setCurrentItem((prev) => prev - 1);
        }
    }

    function nextItem() {
        if (currentItem < totalItems - 1) {
            setCurrentItem((prev) => prev + 1);
        }
    }

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

                                {seats.length > 0 && (
                                    <CheckoutProgress type="concluded" />
                                )}

                                <div className="w-2/3 flex flex-col gap-6 items-center">
                                    {totalItems > 0 && (
                                        <div className="w-full flex items-center justify-center gap-6">

                                            <button
                                                disabled={currentItem === 0}
                                                onClick={previousItem}
                                                className={`w-14 h-14 flex items-center justify-center rounded-full transition ${
                                                    currentItem > 0
                                                        ? "hover:bg-white/10 cursor-pointer"
                                                        : "opacity-40 cursor-not-allowed"
                                                }`}
                                            >
                                                <ChevronLeft className="w-10 h-10 stroke-1" />
                                            </button>

                                            {lumibar.length > 0 && currentItem === 0 && (
                                                <LumibarProductsPurchased items={lumibar} />
                                            )}

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
                                                disabled={currentItem >= totalItems - 1}
                                                onClick={nextItem}
                                                className={`w-14 h-14 flex items-center justify-center rounded-full transition ${
                                                    currentItem < totalItems - 1
                                                        ? "hover:bg-white/10 cursor-pointer"
                                                        : "opacity-40 cursor-not-allowed"
                                                }`}
                                            >
                                                <ChevronRight className="w-10 h-10 stroke-1" />
                                            </button>

                                        </div>
                                    )}

                                    {totalItems > 0 && (
                                        <div className="flex py-3 gap-3 justify-center items-center">
                                            {Array.from({ length: totalItems }).map((_, index) => (
                                                <span
                                                    key={index}
                                                    className={`h-3 w-3 rounded-full transition-colors ${
                                                        index === currentItem
                                                            ? "bg-white"
                                                            : "bg-tertiary-dark"
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {totalItems === 0 && (
                                        <h1>Nenhuma compra encontrada</h1>
                                    )}
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