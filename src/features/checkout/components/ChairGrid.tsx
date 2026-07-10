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

    function handleSeatSelection(seatPosition: string) {
        if (seats.includes(seatPosition)) {
            setSeats(seats.filter((seat) => seat !== seatPosition));
        } else {
            setSeats([...seats, seatPosition]);
        }
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
            <div className="rotate-180 flex gap-3">
                {leftTypes.map((type, seatIndex) => (
                    <Chair
                        key={seatIndex}
                        type={type}
                        position={{
                            seatLetter: row,
                            seatNumber: 4 - seatIndex ,
                        }}
                        onClick={handleSeatSelection}
                    />
                ))}

                <div className="flex items-center">
                    <p className="rotate-180 text-font-secondary-dark text-xl pr-2">
                        {row}
                    </p>
                </div>
            </div>

            <div className="rotate-180 flex gap-3">
                <div className="flex items-center">
                    <p className="rotate-180 text-font-secondary-dark text-xl pl-2">
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