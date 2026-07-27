import { SeatSelected } from "./checkout/SeatType";
import { Session } from "./checkout/SessionType";

export type PurchasedTicket = {
    id: string;
    movie: {
        title: string;
        poster: string;
        room: number;
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