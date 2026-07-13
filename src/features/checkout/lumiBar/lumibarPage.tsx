"use client"
import { useState } from "react";
import { useMovieContext } from "@/src/context/MovieContext";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import CheckoutProgress from "../components/CheckoutProgress";
import CheckoutProduct from "../components/CheckoutProduct";
import LumiBar from "@/src/components/layout/Lumibar";
import ButtonCine from "@/src/components/ui/ButtonCine";

export default function CheckoutLumiBar(){
    const [menu, setMenu] = useState(false);
    const { nowPlayingMoviesData, comingSoonMoviesData } = useMovieContext();
    return (
        <>
             <Header 
                setMenu={setMenu} 
                allMoviesForSearch={[...nowPlayingMoviesData, ...comingSoonMoviesData]}
            />
             <main className="mt-3 md:mb-0 mb-17 lg:mb-17">
                <div className="px-3 flex justify-center pt-8">
                    <div className="w-full max-w-280 mx-auto pb-0 lg:pb-5 flex flex-col gap-4 lg:min-h-200">
                        <CheckoutProgress type="lumiBar"/>
                            <div className="flex flex-col-reverse lg:flex-row gap-8 items-stretch lg:h-220 sm:h-400 lg:mt-4 mt-10">
                            <div className="flex-2 gap-7 flex flex-col lg:mt-0 mt-10">
                                <LumiBar />
                                <div className="lg:flex lg:flex-col lg:justify-end lg:items-center h-full mt-10 flex justify-center">
                                    <ButtonCine 
                                        text="Continuar" 
                                        className="
                                            w-50 h-10 text-font-dark
                                            bg-accent
                                            transition-all duration-300
                                            hover:scale-105
                                            cursor-pointer
                                            hover:brightness-110
                                            hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)]    
                                        "
                                    />
                                </div>
                            </div>
                            <CheckoutProduct 
                                type="lumiBar"
                            />
                        </div>
                       
                    </div>
                </div>
              </main>
            <Footer/>
        </>
    )
}