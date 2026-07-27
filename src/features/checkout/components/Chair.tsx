import { Accessibility } from "lucide-react";
import { useCheckoutStore } from "@/src/store/checkoutStore";
import {Seat} from "@/src/types/checkout/SeatType";
type Props = {
    type: Seat;
    position: {
        seatNumber: number;
        seatLetter: string;
    };
    onClick: (position: string, seatType: Seat) => void;
};

export default function Chair({ type, position, onClick }: Props) {
    const seats = useCheckoutStore((state) => state.seats);
    const seatPosition = `${position.seatLetter}${position.seatNumber}`;
    const isSeatSelected = seats.some(
    (seat) => seat.position === seatPosition
    );

    return (
            <>
                {type === "accessible" && (
                    <div
                    onClick={() => onClick(seatPosition, "accessible")}
                    className={`
                            ${isSeatSelected ? "bg-accent" : "bg-[#cacaca]"}
                            w-5 h-5 rounded-full
                            md:w-15 md:h-10 md:rounded-xl
                            flex items-center justify-center
                            hover:brightness-115 hover:scale-105 cursor-pointer
                    `}
                    >
                    <Accessibility
                        size={12}
                        stroke={isSeatSelected ? "#e6e3e3" :"#181717" }
                        className="text-secondary-dark md:w-6 md:h-6"
                        style={{ transform: "rotate(180deg)" }}
                    />
                    </div>
                )}

                {type === "companion" && (
                    <div
                    onClick={() => onClick(seatPosition, "companion")}
                    className="flex items-center hover:brightness-110 hover:scale-105 cursor-pointer"
                    >
                    <div
                        className={`
                            ${isSeatSelected ? "bg-accent" : "bg-[#006BAD]"}
                            hidden md:block
                            w-1.5 h-8 rounded-full mt-2
                        `}
                    />
                    <div className="w-5 md:w-12 flex flex-col items-center md:gap-1 md:px-0.5">
                        <div
                            className={`
                                ${isSeatSelected ? "bg-accent" : "bg-[#006BAD]"}
                                hidden md:block
                                h-2 w-[90%] rounded-full
                        `}
                        />
                        <div
                            className={`
                                ${isSeatSelected ? "bg-accent" : "bg-[#006BAD]"}
                                w-5 h-5 rounded-full
                                md:w-full md:h-8 md:rounded-xl
                                flex items-center justify-center
                        `}
                        >
                        <span
                            className="text-white text-[7px] md:text-[14px]"
                            style={{ transform: "rotate(180deg)" }}
                        >
                            AC
                        </span>
                        </div>
                    </div>
                    <div
                        className={`
                            ${isSeatSelected ? "bg-accent" : "bg-[#006BAD]"}
                            hidden md:block
                            w-1.5 h-8 rounded-full mt-2
                        `}
                    />
                    </div>
                )}

                {type === "standard" && (
                    <div
                        onClick={() => onClick(seatPosition, "standard")}
                        className="flex items-center hover:brightness-115 hover:scale-105 cursor-pointer"
                    >
                    <div
                        className={`
                            ${isSeatSelected ? "bg-accent" : "bg-[#cacaca]"}
                            hidden md:block
                            w-1.5 h-8 rounded-full mt-2
                        `}
                    />
                    <div className="w-5 md:w-12 flex flex-col items-center md:gap-1 md:px-0.5">
                        <div
                        className={`
                            ${isSeatSelected ? "bg-accent" : "bg-[#cacaca]"}
                            hidden md:block
                            h-2 w-[90%] rounded-full
                        `}
                        />
                        <div
                        className={`
                            ${isSeatSelected ? "bg-accent" : "bg-[#cacaca]"}
                            w-5 h-5 rounded-full
                            md:w-full md:h-8 md:rounded-xl
                            flex justify-center items-center
                        `}
                        >
                        <span
                            className={`
                                ${isSeatSelected ? "text-font-dark" : "text-background-dark"}  text-[10px] md:text-xl `}
                            style={{ transform: "rotate(180deg)" }}
                        >
                            {position.seatNumber}
                        </span>
                        </div>
                    </div>
                    <div
                        className={`
                            ${isSeatSelected ? "bg-accent" : "bg-[#cacaca]"}
                            hidden md:block
                            w-1.5 h-8 rounded-full mt-2
                        `}
                    />
                    </div>
                )}
                </>
    );
}