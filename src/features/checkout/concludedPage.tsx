"use client"

import { useState } from "react";
import { useMovieContext } from "@/src/context/MovieContext";
import CheckoutProgress from "./components/CheckoutProgress";
import CheckoutProduct from "./components/CheckoutProduct";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";

export default function ConcludedPage() {
    const [menu, setMenu] = useState(false);
    const { nowPlayingMoviesData, comingSoonMoviesData } = useMovieContext();

    return (
        <>
            <Header 
                setMenu={setMenu} 
                allMoviesForSearch={[
                    ...nowPlayingMoviesData, 
                    ...comingSoonMoviesData
                ]}
            />
            <main className="mt-3 md:mb-10 mb-17">
                <div className="px-3 flex justify-center pt-8">
                    <div className="w-full max-w-280 mx-auto pb-0 lg:pb-5 flex flex-col gap-4 lg:min-h-200">
                        <CheckoutProgress type="concluded"/>
                        <div className="flex flex-col-reverse lg:flex-row gap-8 items-stretch lg:h-220 sm:h-400 lg:mt-4 mt-10">
                            <div className="flex-2 gap-10 flex flex-col lg:mt-0 mt-10 items-center">
                                <h2>Tickets</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}