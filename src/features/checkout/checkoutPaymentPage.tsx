"use client"

import { useState } from "react";
import { useMovieContext } from "@/src/context/MovieContext";
import { X } from "lucide-react";
import CheckoutProgress from "./components/CheckoutProgress";
import ResumePurchase from "../../components/ui/ResumePurchase";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import PaymentPurchase from "@/src/components/layout/PaymentPurchase";
import MenuListElements from "@/src/components/ui/MenuListElements";


export default function CheckoutPaymentPage() {
    const [menu, setMenu] = useState(false);
    const { nowPlayingMoviesData, comingSoonMoviesData } = useMovieContext();

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
                allMoviesForSearch={[
                    ...nowPlayingMoviesData, 
                    ...comingSoonMoviesData
                ]}
            />
            <main className="mt-3 md:mb-10 mb-17">
                <div className="px-3 flex justify-center pt-8">
                    <div className="w-full max-w-280 mx-auto pb-0 lg:pb-5 flex flex-col gap-4 lg:min-h-200">
                        <CheckoutProgress type="payment"/>
                        <div className="flex flex-col-reverse lg:flex-row gap-8 items-stretch lg:h-220 sm:h-400 lg:mt-4 mt-10">
                            <div className="flex-2 gap-10 flex flex-col lg:mt-0 mt-10 items-center">
                                <PaymentPurchase />
                            </div>
                            <ResumePurchase />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
            </>
         )}

            
        </>
    )
}