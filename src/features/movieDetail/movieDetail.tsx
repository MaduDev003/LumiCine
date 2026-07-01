"use client";

import { useState } from "react";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import { X } from "lucide-react";
import MenuListElements from "../../components/ui/MenuListElements";
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
                    <div className="px-6 flex justify-center pt-8 pb-20">
                    <div className="w-full max-w-275 mx-auto px-6 flex h-screen">
                        <div className="flex-1 bg-pink-400">1</div>
                        <div className="flex-1 bg-blue-400">2</div>
                    </div>
                    </div>
                </main>

                <Footer />
            </>
        )}
      
    </>
  );
}