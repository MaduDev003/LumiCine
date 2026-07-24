"use client"

import {useState, useEffect} from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { renderItemsPerPage } from "@/src/utils/renderItensPerPage";
import { getPagination } from "@/src/services/paginationService";
import { lumiBarProducts } from "@/src/data/lumibarProducts";
import SnackCard from "../ui/snackCard";

export default function LumiBar() {
    const [startSnacksIndex, setStartSnacksIndex] = useState(0);
    const [startDrinksIndex, setStartDrinksIndex] = useState(0);
    const [screenWidth, setScreenWidth] = useState(0);
    const {drinks, snacks} = lumiBarProducts;
    
    const limitItensPerPageSize = renderItemsPerPage(
        screenWidth,
        "lumibar"
    );
    const snacksPagination = getPagination({
        startIndex: startSnacksIndex,
        itemsPerPage: limitItensPerPageSize,
        totalItems: snacks.length,
    });
    const drinksPagination = getPagination({
        startIndex: startDrinksIndex,
        itemsPerPage: limitItensPerPageSize,
        totalItems: drinks.length,
    });

    function handlePrevious(type: "drinks" | "snacks") {
          if (type === "snacks" && snacksPagination.hasPrevious) {
            setStartSnacksIndex(prev => prev - limitItensPerPageSize);
        }

        if (type === "drinks" && drinksPagination.hasPrevious) {
            setStartDrinksIndex(prev => prev - limitItensPerPageSize);
        }
        
    }

    function handleNext(type: "snacks" | "drinks") {
        if (type === "snacks" && snacksPagination.hasNext) {
            setStartSnacksIndex(prev => prev + limitItensPerPageSize);
        }

        if (type === "drinks" && drinksPagination.hasNext) {
            setStartDrinksIndex(prev => prev + limitItensPerPageSize);
        }
    }

    useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerWidth);
        }

        handleResize();

        window.addEventListener(
            "resize",
            handleResize
        );

        return () => {
            window.removeEventListener(
            "resize",
            handleResize
            );
        };
    }, []);

  return (
    <div className="flex flex-col  gap-14">
        <section className="w-full">
            <h1 className="text-2xl mb-2">Comidas</h1>
            <div className="flex justify-center items-center gap-5">
                <ChevronLeft 
                    onClick={() => handlePrevious("snacks")}
                    className={`
                        w-10 h-10 p-1 stroke-1 rounded-full transition ${
                         snacksPagination.hasPrevious
                            ? "hover:bg-white/10 cursor-pointer"
                            : "opacity-40 cursor-not-allowed"
                    }`}
                />
                <div className="flex gap-5">
                    {snacks.map((snack, index) => {
                        if (
                           index >= startSnacksIndex &&
                            index < snacksPagination.endIndex
                        ) {
                            return (
                                <SnackCard
                                    key={snack.id}
                                    name={snack.name}
                                    description={snack.description}
                                    image={snack.image}
                                    price={snack.price}
                                />
                            );
                        }
                    })}
                </div>
                <ChevronRight  
                  onClick={() => handleNext("snacks")}
                    className={`
                        w-10 h-10 p-1 stroke-1 rounded-full transition ${
                        snacksPagination.hasNext
                            ? "hover:bg-white/10 cursor-pointer"
                            : "opacity-40 cursor-not-allowed"
                    }`}
                />
            </div>
        </section>
          <section className="w-full">
            <h1 className="text-2xl mb-2">Bebidas</h1>
            <div className="flex justify-center items-center gap-5">
                <ChevronLeft 
                    onClick={() => handlePrevious("drinks")}
                    className={`
                        w-10 h-10 p-1 stroke-1 rounded-full transition ${
                       drinksPagination.hasPrevious
                            ? "hover:bg-white/10 cursor-pointer"
                            : "opacity-40 cursor-not-allowed"
                    }`}
                />
                <div className="flex gap-5">
                    {drinks.map((snack, index) => {
                        if (

                           index >= startDrinksIndex &&
                            index < drinksPagination.endIndex
                        ) {
                            return (
                                <SnackCard
                                    key={snack.id}
                                    name={snack.name}
                                    description={snack.description}
                                    image={snack.image}
                                    price={snack.price}
                                />
                            );
                        }
                    })}
                </div>
                <ChevronRight  
                  onClick={() => handleNext("drinks")}
                    className={`
                        w-10 h-10 p-1 stroke-1 rounded-full transition ${
                        drinksPagination.hasNext
                            ? "hover:bg-white/10 cursor-pointer"
                            : "opacity-40 cursor-not-allowed"
                    }`}
                />
            </div>
        </section>
    </div>
  );
}