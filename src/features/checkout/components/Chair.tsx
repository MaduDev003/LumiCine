import { Accessibility } from "lucide-react";

type Props = {
    type: "standard" | "accessible" | "companion";
    position: {
        seatNumber: number,
        seatLetter: string
    };
    onClick: (position: string) => void;
};

export default function Chair({ type, position, onClick }: Props) {
    return (
        <>
            {type === "accessible" && (
                <div 
                    onClick={() => onClick(`${position.seatLetter}${position.seatNumber}`)}
                    className="w-15 h-10 mt-2 bg-[#cacaca] rounded-xl flex items-center justify-center  hover:brightness-115 hover:scale-105 cursor-pointer"
                >
                    <Accessibility size={24} className="text-secondary-dark rotate-180" />
                </div>
            )}

            {type === "companion" && (
                <div className="flex items-center hover:brightness-110 hover:scale-105 cursor-pointer">
                    <div className="bg-[#006BAD] w-1.5 h-8 rounded-full mt-2" />

                    <div className="relative w-12 flex flex-col items-center gap-1 px-0.5">
                        <div className="bg-[#006BAD] h-2 w-[90%] rounded-full" />

                        <div className="bg-[#006BAD] h-8 w-full rounded-xl flex items-center justify-center">
                            <span className="text-white text-[14px] rotate-180">
                                AC
                            </span>
                        </div>
                    </div>

                    <div className="bg-[#006BAD] w-1.5 h-8 rounded-full mt-2" />
                </div>
            )}

            {type === "standard" && (
                <div className="flex items-center  hover:brightness-115 hover:scale-105 cursor-pointer">
                    <div className="bg-[#cacaca] w-1.5 h-8 rounded-full mt-2" />

                    <div className="w-12 flex flex-col items-center gap-1 px-0.5">
                        <div className="bg-[#cacaca] h-2 w-[90%] rounded-full" />
                        <div className="bg-[#cacaca] h-8 w-full rounded-xl flex justify-center items-center" >
                            <span className="text-background-dark text-xl  rotate-180">{position.seatNumber}</span>
                        </div>
                    </div>

                    <div className="bg-[#cacaca] w-1.5 h-8 rounded-full mt-2" />
                </div>
            )}
        </>
    );
}