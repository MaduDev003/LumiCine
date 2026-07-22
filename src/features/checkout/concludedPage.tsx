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


export default function ConcludedPage() {
    const [menu, setMenu] = useState(false);
    const [currentItem, setCurrentItem] = useState(0);
    const { nowPlayingMoviesData, comingSoonMoviesData } = useMovieContext();
    const tickets = usePurchasedProductsStore(
        (state) => state.tickets
    );
    const lumibar = usePurchasedProductsStore(
        (state) => state.lumibar
    );


    const hasLumibar = lumibar.length > 0;
    const totalItems = tickets.length + (hasLumibar ? 1 : 0);
    const showingLumibar = hasLumibar && currentItem === 0;
    const ticketIndex = hasLumibar
        ? currentItem - 1
        : currentItem;

    const ticket = tickets[ticketIndex];
    const hasPrevious = currentItem > 0;
    const hasNext = currentItem < totalItems - 1;

    function previousItem() {
        if (hasPrevious) {
            setCurrentItem((prev) => prev - 1);
        }
    }


    function nextItem() {
        if (hasNext) {
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

                                <CheckoutProgress type="concluded" />


                                <div className="w-2/3 flex flex-col gap-6 items-center">

                                    <div className="w-full flex items-center justify-center gap-6">

                                        {totalItems > 0 && (
                                            <>

                                                <button
                                                    disabled={!hasPrevious}
                                                    onClick={previousItem}
                                                    className={`w-14 h-14 flex items-center justify-center rounded-full transition ${hasPrevious ? "hover:bg-white/10 cursor-pointer" : "opacity-40 cursor-not-allowed"}`}
                                                >
                                                    <ChevronLeft className="w-10 h-10 stroke-1" />
                                                </button>


                                                {showingLumibar && (
                                                    <LumibarProductsPurchased
                                                        items={lumibar}
                                                    />
                                                )}


                                                {!showingLumibar && ticket && (
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
                                                    onClick={nextItem}
                                                    className={`w-14 h-14 flex items-center justify-center rounded-full transition ${hasNext ? "hover:bg-white/10 cursor-pointer" : "opacity-40 cursor-not-allowed"}`}
                                                >
                                                    <ChevronRight className="w-10 h-10 stroke-1" />
                                                </button>

                                            </>
                                        )}

                                    </div>


                                    {totalItems > 0 && (
                                        <div className="flex py-3 gap-3 justify-center items-center">

                                            {Array.from({ length: totalItems }).map((_, index) => (
                                                <span
                                                    key={index}
                                                    className={`h-3 w-3 rounded-full transition-colors ${index === currentItem ? "bg-white" : "bg-tertiary-dark"}`}
                                                />
                                            ))}

                                        </div>
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