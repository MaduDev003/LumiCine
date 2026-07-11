import { useCheckoutStore } from "@/src/store/checkoutStore";
import Chair from "./Chair";

type ChairType = "standard" | "accessible" | "companion";

type Props = {
    accessible: boolean;
    row: string;
};

export default function ChairGrid({ accessible, row }: Props) {
    const seats = useCheckoutStore((state) => state.seats);
    const setSeats = useCheckoutStore((state) => state.setSeats);
    const tickets = useCheckoutStore((state) => state.tickets);

    function handleSeatSelection(seatPosition: string) {
        const selectedSeats = [];
        const seatLimitSelection = tickets.full.quantity + tickets.half.quantity;
        const isSeatsLimitReached = seats.length === seatLimitSelection;
        let isSeatAlreadySelected = false;

        for (const seat of seats) {
            if (seat === seatPosition) {
                isSeatAlreadySelected = true;
                continue;
            }

            selectedSeats.push(seat);
        }

        if (!isSeatAlreadySelected && !isSeatsLimitReached) {
            selectedSeats.push(seatPosition);
        }

        setSeats(selectedSeats);
    }

    const leftTypes: ChairType[] = [
        accessible ? "accessible" : "standard",
        accessible ? "companion" : "standard",
        accessible ? "accessible" : "standard",
        accessible ? "companion" : "standard",
    ];

    const rightTypes: ChairType[] = [
        "standard",
        "standard",
        accessible ? "companion" : "standard",
        accessible ? "accessible" : "standard",
    ];

    return (
        <div className="flex justify-between">
            <div className="rotate-180 flex gap-1 md:gap-2">
                {leftTypes.map((type, seatIndex) => (
                    <Chair
                        key={seatIndex}
                        type={type}
                        position={{
                            seatLetter: row,
                            seatNumber: 4 - seatIndex,
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

                {rightTypes.map((type, seatIndex) => (
                    <Chair
                        key={seatIndex}
                        type={type}
                        position={{
                            seatLetter: row,
                            seatNumber: 8 - seatIndex,
                        }}
                        onClick={handleSeatSelection}
                    />
                ))}
            </div>
        </div>
    );
}