"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Accessibility, X} from "lucide-react";
import { useMovieContext } from "@/src/context/MovieContext";
import { useCheckoutStore } from "@/src/store/checkoutStore";
import { validateSeatSelection } from "@/src/services/checkout/checkoutValidationService";
import CheckoutProduct from "../components/CheckoutProduct";
import CheckoutProgress from "../components/CheckoutProgress";
import Footer from "@/src/components/layout/Footer";
import Header from "@/src/components/layout/Header";
import ChairGrid from "../components/ChairGrid";
import ButtonCine from "@/src/components/ui/ButtonCine";
import ValidatorModal from "../components/ValidatorModal";
import MenuListElements from "@/src/components/ui/MenuListElements";

export default function SeatsPage() {
    const [menu, setMenu] = useState(false);
    const [isValidatorModalOpen, setIsValidatorModalOpen] = useState(false);
    const [missingSeatSelection, setMissingSeatSelection] = useState<string[]>([]);
    const { nowPlayingMoviesData, comingSoonMoviesData } = useMovieContext();
    const seats = useCheckoutStore((state) => state.seats);
    const canContinue = seats.length === 0 ? false : true;
    const router = useRouter();
    
    function openValidatorModal() {
        const result = validateSeatSelection(seats);

        setMissingSeatSelection(result.missingFields);
        setIsValidatorModalOpen(!result.isValid);

        if (result.isValid) router.push("/checkout/lumiBar")
    }

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
            <Header 
                    setMenu={setMenu} 
                    allMoviesForSearch={[...nowPlayingMoviesData, ...comingSoonMoviesData]}
                    />
                )}
                <main className="mt-3 mb-17">
                    <div className="px-3 flex justify-center pt-8">
                    <div className="w-full max-w-280 mx-auto pb-0 lg:pb-5 flex flex-col gap-4 lg:min-h-200">
                        <CheckoutProgress type="seats"/>
                            <div className="flex flex-col-reverse lg:flex-row gap-8 items-stretch lg:h-220 sm:h-400 lg:mt-4 mt-10">
                            <div className=" flex-2 px-2 gap-7 flex flex-col lg:mt-0 mt-10">
                                {/* LEGENDA */}
                                <div className="bg-secondary-dark w-full h-30 rounded-xl flex gap-2 flex-col py-3 items-center">
                                    <p className="text-font-dark text-[18px]">Legenda</p>
                                    <div className="w-full px-2 flex justify-evenly">
                                        <div className="flex items-center gap-1">
                                            <div className="bg-[#cacaca] h-3 w-3 md:h-4 md:w-4 shrink-0 rounded-full"></div>
                                            <span className="mt-1 text-font-secondary-dark md:text-[15px] text-[8px]">Disponível</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <div className="bg-[#828181] h-3 w-3 md:h-4 md:w-4 shrink-0 rounded-full"></div>
                                            <span className="mt-1 text-font-secondary-dark md:text-[15px] text-[8px]">Ocupado</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <div className="bg-accent h-3 w-3 md:h-4 md:w-4 shrink-0 rounded-full"></div>
                                            <span className="mt-1 text-font-secondary-dark md:text-[15px] text-[8px]">Selecionado</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <div className="bg-[#cacaca] h-3 w-3 md:h-4 md:w-4 shrink-0 rounded-full flex items-center justify-center">
                                                <Accessibility size={16} color="#181717" />
                                            </div>
                                            <span className="mt-1 text-font-secondary-dark md:text-[15px] text-[8px]">Cadeirante</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <div className="bg-[#006BAD] h-3 w-3 md:h-4.5 md:w-4.5 shrink-0 rounded-full flex justify-center items-center">
                                                <p className="font-medium md:text-[9px] text-[5px] mt-0.5 md:mt-0">AC</p>
                                            </div>
                                            <span className="mt-1 text-font-secondary-dark text-[8px] md:text-[15px]">Acompanhante</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Assentos */}
                                {/* TODO: p-3 tá aq , da borda */}
                                <div className="h-full flex flex-col gap-10 border border-secondary-dark rounded-xl p-3">
                                    <div className="bg-tertiary-dark h-4 rounded-b-3xl flex justify-center items-center py-3">
                                        <h3 className="text-background-dark font-medium text-[20px]">Tela</h3>
                                    </div>
                                    <div className="flex flex-col gap-20  ">
                                        <div className="flex flex-col gap-4">
                                            <ChairGrid row="A" accessible={true} />
                                            <ChairGrid row="B" accessible={false}/>
                                            <ChairGrid row="C" accessible={false}/>
                                            <ChairGrid row="D" accessible={false}/>
                                            <ChairGrid row="E" accessible={false}/>
                                        </div>

                                        <div className="flex flex-col gap-4">
                                            <ChairGrid row="F" accessible={true}/>
                                            <ChairGrid row="G" accessible={false}/>
                                            <ChairGrid row="H" accessible={false}/>
                                            <ChairGrid row="I" accessible={false}/>
                                        </div>
                                    </div>
                                    
                                </div>
                            
                                <div className=" w-full flex justify-center items-center mt-5 lg:mt-2">
                                        <ButtonCine 
                                        onClick={() => openValidatorModal()}
                                        text="Continuar" 
                                        className={`
                                        w-50 h-10 text-font-dark
                                        ${canContinue 
                                        ? `
                                            bg-accent
                                            transition-all duration-300
                                            hover:scale-105
                                            cursor-pointer
                                            hover:brightness-110
                                            hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)]
                                        `
                                        : `
                                            bg-tertiary-dark
                                            opacity-50
                                        `
                                        }
                                    `} 
                                    />
                                    </div>
                            </div>
                            <CheckoutProduct 
                                type="seats"
                            />
                        </div>
                    </div>
                    </div>
                </main>
                <Footer />
                {isValidatorModalOpen && (
                    <ValidatorModal invalidFields={missingSeatSelection} setIsValidatorModalOpen={setIsValidatorModalOpen}/>
        )}
        </>
       
    )
}