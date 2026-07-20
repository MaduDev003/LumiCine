"use client";

import { useState } from "react";
import { useMovieContext } from "@/src/context/MovieContext";
import Header from "@/src/components/layout/Header";
import LumiBar from "@/src/components/layout/Lumibar";
import Footer from "@/src/components/layout/Footer";
import ButtonCine from "@/src/components/ui/ButtonCine";
import MenuListElements from "@/src/components/ui/MenuListElements";
import { X } from "lucide-react";

export default function LumiBarPrincipal() {
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
                  ...comingSoonMoviesData,
                ]}
              />
              <main className="mt-3 mb-12">
                    <div className="px-3 flex justify-center pt-8 pb-13">
                      <div className="w-full max-w-275 mx-60 pb-5 flex flex-col gap-4 lg:min-h-200">
                        <LumiBar />
                        <div className="flex justify-center items-center ">
                          <ButtonCine text="Comprar" className="bg-accent w-50 h-10 mt-10"/>
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