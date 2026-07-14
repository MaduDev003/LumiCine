import {useState, useEffect} from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { lumiBarProducts } from "@/src/data/lumibarProducts";
import { renderItemsPerPage } from "@/src/utils/renderItensPerPage";
import SnackCard from "../ui/snackCard";

export default function LumiBar() {
    const [startIndex, setStartIndex] = useState(0);
    const [screenWidth, setScreenWidth] = useState(0);
    const {drinks, snacks} = lumiBarProducts;
    const limitItensPerPageSize = renderItemsPerPage(
        screenWidth,
        "lumibar"
    );
    const endSnacks = startIndex + limitItensPerPageSize;
    const hasPrevious = startIndex > 0;
    const hasNext = endSnacks < snacks.length;

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
    function handlePrevious() {
        if (hasPrevious) {
            setStartIndex(prev => 
                prev - limitItensPerPageSize
            );
        }
    }


    function handleNext() {
        if (hasNext) {
            setStartIndex(prev => 
                prev + limitItensPerPageSize
            );
        }
    }
  return (
    <div className="flex flex-col  gap-14">
        <section className="w-full">
            <h1 className="text-2xl mb-2">Comidas</h1>
            <div className="flex justify-center items-center gap-5">
                <ChevronLeft 
                     onClick={handlePrevious}
                    className={`
                        w-10 h-10 p-1 stroke-1 rounded-full transition ${
                        hasPrevious
                            ? "hover:bg-white/10 cursor-pointer"
                            : "opacity-40 cursor-not-allowed"
                    }`}
                />
                <div className="flex gap-5">
                    {snacks.map((snack, index) => {
                        if (
                            //0 //-1
                           index >= startIndex &&
                            index < endSnacks
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
                  onClick={handleNext}
                    className={`
                        w-10 h-10 p-1 stroke-1 rounded-full transition ${
                        hasNext
                            ? "hover:bg-white/10 cursor-pointer"
                            : "opacity-40 cursor-not-allowed"
                    }`}
                />
            </div>
        </section>
        <section className="w-full">
            <h1 className="text-2xl mb-2">Bebidas</h1>
            <div className="flex justify-around">
                {drinks.map((drink, index) => (
                    <SnackCard 
                        key={index}
                        name={drink.name}
                        description={drink.description}
                        image={drink.image}
                        price={drink.price}
                    />
                  ))}
            </div>
        </section>
    </div>
  );
}