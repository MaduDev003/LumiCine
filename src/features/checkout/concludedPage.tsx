"use client"

import { useState } from "react";
import { useMovieContext } from "@/src/context/MovieContext";
import { LucideScanQrCode } from "lucide-react";
import CheckoutProgress from "./components/CheckoutProgress";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import { useCheckoutStore } from "@/src/store/checkoutStore";

export default function ConcludedPage() {
  const [menu, setMenu] = useState(false);
  const { nowPlayingMoviesData, comingSoonMoviesData } = useMovieContext();

  const movie = useCheckoutStore((state) => state.movie);
  const seats = useCheckoutStore((state) => state.seats);
  const session = useCheckoutStore((state) => state.session);
  const initialTime = session.time.slice(0,5);

  return (
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

            <div
              className="
                relative w-80 rounded-3xl overflow-hidden
                bg-secondary-dark shadow-2xl
                transition-all duration-300 ease-out
                hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]
              "
            >
              <div className="absolute left-0 top-[38%] -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-background-dark z-20" />
              <div className="absolute right-0 top-[38%] -translate-y-1/2 translate-x-1/2 w-7 h-7 rounded-full bg-background-dark z-20" />

              <div
                className="relative h-48"
                style={{
                  backgroundImage: `url(${movie?.backdrop_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              >
                <div className="absolute inset-0 bg-black/25" />
              </div>

              <div className="px-5 py-6 flex flex-col gap-5 justify-center items-center">

                <h2 className="text-white font-bold text-[18px]">
                    {movie?.title}
                  </h2>
                <div className="w-full border-t border-dashed border-white/20"></div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                  <div className="bg-background-dark/40 rounded-xl p-3">
                    <p className="text-font-dark/50 text-[10px] uppercase tracking-[0.2em] mb-1">
                      Data e Hora
                    </p>
                    <p className="text-font-dark font-semibold text-sm">
                      {session?.date || "20 Jul"} • {initialTime || "19:30"}
                    </p>
                  </div>

                  <div className="bg-background-dark/40 rounded-xl p-3 text-right">
                    <p className="text-font-dark/50 text-[10px] uppercase tracking-[0.2em] mb-1">
                      Sala
                    </p>
                    <p className="text-font-dark font-semibold text-sm">5</p>
                  </div>

                  <div className="bg-background-dark/40 rounded-xl p-3">
                    <p className="text-font-dark/50 text-[10px] uppercase tracking-[0.2em] mb-1">
                      Assentos
                    </p>
                    <p className="text-font-dark font-semibold text-sm">
                      {seats?.join(", ") || "F12"}
                    </p>
                  </div>

                  <div className="bg-background-dark/40 rounded-xl p-3 text-right">
                    <p className="text-font-dark/50 text-[10px] uppercase tracking-[0.2em] mb-1">
                      Ingresso
                    </p>
                    <p className="text-font-dark font-semibold text-sm">Inteira</p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 pt-2">
                  <div className="bg-white rounded-2xl p-5 shadow-lg">
                    <LucideScanQrCode size={88} className="text-black" />
                  </div>

                  <p className="text-font-dark/60 text-xs text-center leading-relaxed max-w-55">
                    Apresente este QR Code na entrada da sala
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}