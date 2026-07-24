import { useState } from "react";
import { useCheckoutStore } from "@/src/store/checkoutStore";
import ValidatorModal from "./ValidatorModal";
import {Seat} from "@/src/types/checkout/seatType";
import Chair from "./Chair";
import { isSeatValidForPurchase} from "@/src/services/checkout/seatsService";
import { calcTicketsTotal } from "@/src/services/checkout/sessionService";


type Props = {
    accessible: boolean;
    row: string;
};

export default function ChairGrid({ accessible, row }: Props) {
    const [isValidatorModalOpen, setIsValidatorModalOpen] = useState(false);
    const seats = useCheckoutStore((state) => state.seats);
    const setSeats = useCheckoutStore((state) => state.setSeats);
    const tickets = useCheckoutStore((state) => state.tickets);

   function handleSeatSelection(seatPosition: string, seatType: Seat) {
        const { totalQuantity } = calcTicketsTotal(tickets);

        if (!isSeatValidForPurchase(tickets, seatType)) {
            setIsValidatorModalOpen(true);
            return;
        }

        const isSeatAlreadySelected = seats.some(
            (seat) => seat.position === seatPosition
        );

        let selectedSeats = seats.filter(
            (seat) => seat.position !== seatPosition
        );

        if (!isSeatAlreadySelected && selectedSeats.length < totalQuantity) {
            selectedSeats.push({
                type: seatType,
                position: seatPosition,
            });
        }

        setSeats(selectedSeats);
    }

    
    const leftTypes: Seat[] = [
        accessible ? "accessible" : "standard",
        accessible ? "companion" : "standard",
        accessible ? "accessible" : "standard",
        accessible ? "companion" : "standard",
    ];

    const rightTypes: Seat[] = [
        "standard",
        accessible ? "companion" : "standard",
        accessible ? "accessible" : "standard",
        accessible ? "accessible" : "standard",
    ];

    return (
        <div className="flex justify-between">
            <div className="rotate-180 flex gap-1 md:gap-2">
                {leftTypes.map((type, index) => (
                    <Chair
                        key={index}
                        type={type}
                        position={{
                            seatLetter: row,
                            seatNumber: 4 - index,
                        }}
                        onClick={handleSeatSelection}
                    />
                ))}

                <div className="w-5 md:w-6 flex items-center justify-center mr-2">
                    <p className="rotate-180 text-font-secondary-dark text-[12px] md:text-xl">
                        {row}
                    </p>
                </div>
            </div>

            <div className="rotate-180 flex gap-1 md:gap-2">
                <div className="w-5 md:w-6 flex items-center justify-center ml-2">
                    <p className="rotate-180 text-font-secondary-dark text-[12px] md:text-xl">
                        {row}
                    </p>
                </div>

                {rightTypes.map((type, index) => (
                    <Chair
                        key={index}
                        type={type}
                        position={{
                            seatLetter: row,
                            seatNumber: 8 - index,
                        }}
                        onClick={handleSeatSelection}
                    />
                ))}
            </div>
            {isValidatorModalOpen && (
                <ValidatorModal invalidFields={["Assento: Este assento possui regras de seleção"]} setIsValidatorModalOpen={setIsValidatorModalOpen}/>
            )}
        </div>
        
    );
}