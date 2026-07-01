"use client";

import { useState } from "react";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import { X } from "lucide-react";
import MenuListElements from "../../components/ui/MenuListElements";
import Button from "@/src/components/ui/Button";
import AvatarMovie from "../../assets/images/avatar_h_.jpg";

export default function MovieDetail({ movie }: any) {
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
                <Header menu={menu} setMenu={setMenu} />

                <main className="w-full py-8">
                    <div className="w-full max-w-275 mx-auto px-6 flex gap-2 mb-10">
                            <div className="w-100 flex flex-col gap-4">
                                <div
                                className="h-130 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.55)]"
                                style={{
                                    backgroundImage: `url(${AvatarMovie.src})`,
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                }}
                                />

                                <Button
                                text="Comprar Ingressos"
                                className="bg-accent text-font-dark h-16"
                                onClick={() => console.log("Comprar Ingressos clicado")}
                                />
                            </div>

                            <div className="flex-1 rounded-lg p-6">
                                2
                            </div>
                            </div>
                </main>

                <Footer />
            </>
        )}
      
    </>
  );
}