"use client"

import { useState } from "react";
import { useMovieContext } from "@/src/context/MovieContext";
import CheckoutProgress from "./components/CheckoutProgress";
import CheckoutProduct from "./components/CheckoutProduct";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import PaymentPurchase from "@/src/components/layout/PaymentPurchase";
import ButtonCine from "@/src/components/ui/ButtonCine";

export default function PaymentPage() {
    const [menu, setMenu] = useState(false);
    const { nowPlayingMoviesData, comingSoonMoviesData } = useMovieContext();
    const canContinue = false;

    return (
        <>
            <Header 
                setMenu={setMenu} 
                allMoviesForSearch={[
                    ...nowPlayingMoviesData, 
                    ...comingSoonMoviesData
                ]}
            />
            <main className="mt-3 md:mb-0 mb-17">
                <div className="px-3 flex justify-center pt-8">
                    <div className="w-full max-w-280 mx-auto pb-0 lg:pb-5 flex flex-col gap-4 lg:min-h-200">
                        <CheckoutProgress type="payment"/>
                        <div className="flex flex-col-reverse lg:flex-row gap-8 items-stretch lg:h-220 sm:h-400 lg:mt-4 mt-10">
                            <div className="flex-2 gap-10 flex flex-col lg:mt-0 mt-10 items-center">
                                <PaymentPurchase />
                                <ButtonCine 
                                    text="Realizar Pagamento" 
                                    className={`
                                        w-60 h-10 text-font-dark
                                        ${
                                            canContinue 
                                            ? `
                                                bg-accent
                                                transition-all duration-300
                                                hover:scale-105
                                                cursor-pointer
                                                hover:brightness-110
                                                hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)]
                                            `
                                            : `
                                                bg-tertiary-dark
                                                opacity-50
                                            `
                                        }
                                    `}
                                />
                            </div>
                            <CheckoutProduct 
                                type="lumiBar"
                            />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}