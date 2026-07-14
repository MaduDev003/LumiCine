"use client";

import { useState } from "react";
import { useMovieContext } from "@/src/context/MovieContext";
import Header from "@/src/components/layout/Header";
import LumiBar from "@/src/components/layout/Lumibar";
import Footer from "@/src/components/layout/Footer";
import ButtonCine from "@/src/components/ui/ButtonCine";

export default function LumiBarPrincipal() {
  const [menu, setMenu] = useState(false);
  const { nowPlayingMoviesData, comingSoonMoviesData } = useMovieContext();

  return (
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
  );
}