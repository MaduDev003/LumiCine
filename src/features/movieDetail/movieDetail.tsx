"use client";

import { useState } from "react";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import { X } from "lucide-react";
import MenuListElements from "../../components/ui/MenuListElements";
import Button from "@/src/components/ui/Button";
import {renderAgeClassificationColor} from "../../utils/renderAgeClassificationColor";
import { MovieType } from "@/src/types/movieType";

export default function MovieDetail({ movie }: { movie: MovieType }) {
  const [menu, setMenu] = useState(false);
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
                <Header setMenu={setMenu} />
                <main className="mt-8">
                    <div className="w-full max-w-275 mx-auto px-6 flex gap-2 mb-10">
                           <div className="w-105 flex flex-col rounded-2xl gap-6 p-5">
                                    <div
                                        className="h-[82%] rounded-xl  shadow-[0_25px_60px_rgba(0,0,0,0.45)]"
                                        style={{
                                        backgroundImage: `url(${movie.poster_url})`,
                                        backgroundPosition: "center",
                                        backgroundSize: "cover",
                                        backgroundRepeat: "no-repeat",
                                        }}
                                    />

                                    <Button
                                        text="Comprar Ingressos"
                                        className="h-14 w-full bg-accent text-font-dark font-semibold rounded-xl transition-all duration-300 hover:brightness-110 hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)]"
                                        onClick={() => console.log("Comprar Ingressos clicado", movie.id)}
                                    />
                            </div>

                            <div className="w-105 flex-1 rounded-lg p-6 flex flex-col gap-4">
                                <section>
                                    <h1 className="text-[18px] text-font-dark mb-4">
                                        Título
                                    </h1>
                                    <p className="text-font-dark/80 leading-relaxed">
                                        {movie.title}
                                    </p>
                                </section>
                                <div className="w-full bg-tertiary-dark/50 h-0.5 rounded-full"></div>
                                <section>
                                    <h1 className="text-[18px] text-font-dark mb-4">
                                        Sinopse
                                    </h1>
                                    <p className="text-font-dark/80 leading-relaxed">
                                        {movie.overview}
                                    </p>
                                </section>
                                <div className="w-full bg-tertiary-dark/50 h-0.5 rounded-full"></div>
                                 <section>
                                    <h1 className="text-[18px] text-font-dark mb-4">
                                        Data de Lançamento
                                    </h1>
                                    <p className="text-font-dark/80 leading-relaxed">
                                        {movie.release_date}
                                    </p>
                                </section>
                                <div className="w-full bg-tertiary-dark/50 h-0.5 rounded-full"></div>
                                 <section>
                                    <h1 className="text-[18px] text-font-dark mb-4">
                                       Atores
                                    </h1>
                                    <div className="leading-relaxed">
                                        {movie.cast.map((actor, index) => (
                                            <div key={index} className="text-font-dark/85 flex gap-1">
                                                <span>{actor.name}</span>
                                                <span className="text-font-dark/70">como</span>
                                                <span>{actor.character}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                                <div className="w-full bg-tertiary-dark/50 h-0.5 rounded-full"></div>
                                 <section>
                                    <h1 className="text-[18px] text-font-dark mb-4">
                                       Gêneros
                                    </h1>
                                     <div className="flex justify-between mt-auto">
                                        <div className="flex gap-2 h-6 items-center">
                                            {movie.genres.map((genre, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-[#2C2C2C] group-hover:bg-background-dark/60 h-5 flex p-4 rounded-2xl justify-center items-center"
                                                >
                                                <span>{genre}</span>
                                                </div>
                                            ))}
                                            </div>

                                            <div
                                                className={`${renderAgeClassificationColor(movie.age_rating)} h-6 w-6 flex justify-center items-center mb-10 rounded mr-2 transition-colors`}
                                            >
                                            <span>{movie.age_rating}</span>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                </main>
                <Footer />
            </>
        )}
      
    </>
  );
}