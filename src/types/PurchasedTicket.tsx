import { SeatSelected } from "./checkout/seatType";
import { Session } from "./checkout/sessionType";

export type PurchasedTicket = {
    id: string;

    movie: {
        title: string;
        poster: string;
    };

    session: Omit<Session, "ticket">;

    seat: {
        position: string;
        type: SeatSelected["type"];
    };

    ticketType: "half" | "full";

    purchaseDate: string;

    qrCode: string;
};