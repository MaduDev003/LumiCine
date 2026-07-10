import { Accessibility } from "lucide-react";
import { useCheckoutStore } from "@/src/store/checkoutStore";

type Props = {
    type: "standard" | "accessible" | "companion";
    position: {
        seatNumber: number;
        seatLetter: string;
    };
    onClick: (position: string) => void;
};

export default function Chair({ type, position, onClick }: Props) {
    const seats = useCheckoutStore((state) => state.seats);
    const seatPosition = `${position.seatLetter}${position.seatNumber}`;
    const isSeatSelected = seats.includes(seatPosition);

    return (
        <>
            {type === "accessible" && (
                <div
                    onClick={() => onClick(seatPosition)}
                    className={`${isSeatSelected ? "bg-accent" : "bg-[#cacaca]"} w-15 h-10 mt-2 rounded-xl flex items-center justify-center hover:brightness-115 hover:scale-105 cursor-pointer`}
                >
                    <Accessibility 
                        size={24} 
                        className="text-secondary-dark rotate-180" 
                    />
                </div>
            )}

            {type === "companion" && (
                <div
                    onClick={() => onClick(seatPosition)}
                    className="flex items-center hover:brightness-110 hover:scale-105 cursor-pointer"
                >
                    <div className={`${isSeatSelected ? "bg-accent" : "bg-[#006BAD]"} w-1.5 h-8 rounded-full mt-2`} />

                    <div className="relative w-12 flex flex-col items-center gap-1 px-0.5">
                        <div className={`${isSeatSelected ? "bg-accent" : "bg-[#006BAD]"} h-2 w-[90%] rounded-full`} />

                        <div className={`${isSeatSelected ? "bg-accent" : "bg-[#006BAD]"} h-8 w-full rounded-xl flex items-center justify-center`}>
                            <span className="text-white text-[14px] rotate-180">
                                AC
                            </span>
                        </div>
                    </div>

                    <div className={`${isSeatSelected ? "bg-accent" : "bg-[#006BAD]"} w-1.5 h-8 rounded-full mt-2`} />
                </div>
            )}

            {type === "standard" && (
                <div
                    onClick={() => onClick(seatPosition)}
                    className="flex items-center hover:brightness-115 hover:scale-105 cursor-pointer"
                >
                    <div className={`${isSeatSelected ? "bg-accent" : "bg-[#cacaca]"} w-1.5 h-8 rounded-full mt-2`} />

                    <div className="w-12 flex flex-col items-center gap-1 px-0.5">
                        <div className={`${isSeatSelected ? "bg-accent" : "bg-[#cacaca]"} h-2 w-[90%] rounded-full`} />

                        <div className={`${isSeatSelected ? "bg-accent" : "bg-[#cacaca]"} h-8 w-full rounded-xl flex justify-center items-center`}>
                            <span className="text-background-dark text-xl rotate-180">
                                {position.seatNumber}
                            </span>
                        </div>
                    </div>

                    <div className={`${isSeatSelected ? "bg-accent" : "bg-[#cacaca]"} w-1.5 h-8 rounded-full mt-2`} />
                </div>
            )}
        </>
    );
}