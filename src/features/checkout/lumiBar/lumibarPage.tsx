"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import {X} from "lucide-react";
import { useMovieContext } from "@/src/context/MovieContext";
import MenuListElements from "@/src/components/ui/MenuListElements";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import CheckoutProgress from "../components/CheckoutProgress";
import CheckoutProduct from "../components/CheckoutProduct";
import LumiBar from "@/src/components/layout/Lumibar";
import ButtonCine from "@/src/components/ui/ButtonCine";

export default function CheckoutLumiBar(){
    const [menu, setMenu] = useState(false);
    const { nowPlayingMoviesData, comingSoonMoviesData } = useMovieContext();
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
                <Header 
                    setMenu={setMenu} 
                    allMoviesForSearch={[...nowPlayingMoviesData, ...comingSoonMoviesData]}
                />
                <main className="mt-3 md:mb-0 mb-17 lg:mb-40">
                    <div className="px-3 flex justify-center pt-8">
                        <div className="w-full max-w-280 mx-auto pb-0 lg:pb-5 flex flex-col gap-4 lg:min-h-200">
                            <CheckoutProgress type="lumiBar"/>
                                <div className="flex flex-col-reverse lg:flex-row gap-8 items-stretch lg:h-220 sm:h-400 lg:mt-4 mt-10">
                                <div className="flex-2 gap-7 flex flex-col lg:mt-0 mt-10">
                                    <LumiBar />
                                    <div className="lg:flex lg:flex-col lg:justify-end lg:items-center h-full mt-10 flex justify-center">
                                        <ButtonCine 
                                        onClick={() => router.push("/checkout/payment")}
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
        )}
           
        </>
    )
}