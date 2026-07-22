import { SeatSelected } from "../types/checkout/seatType";
import { Tickets } from "../types/checkout/ticketsType";
import { Session } from "../types/checkout/sessionType";
import { PurchasedTicket } from "../types/PurchasedTicket";

type MovieInfo = {
    title: string;
    poster: string;
};

type TicketSession = Omit<Session, "ticket">;

type CommonInfo = {
    movie: MovieInfo;
    session: TicketSession;
};


export function mountTickets(
    tickets: Tickets,
    seats: SeatSelected[],
    { movie, session }: CommonInfo
): PurchasedTicket[] {

    const purchasedTickets: PurchasedTicket[] = [];

    let halfAvailable = tickets.half.quantity;
    let fullAvailable = tickets.full.quantity;


    for (const seat of seats) {

        let ticketType: "half" | "full";


        if (halfAvailable > 0) {
            ticketType = "half";
            halfAvailable--;

        } else if (fullAvailable > 0) {
            ticketType = "full";
            fullAvailable--;

        } else {
            break;
        }


        purchasedTickets.push({
            id: crypto.randomUUID(),

            movie,

            session,

            seat: {
                position: seat.position,
                type: seat.type,
            },

            ticketType,

            purchaseDate: new Date().toISOString(),

            qrCode: crypto.randomUUID(),
        });
    }


    return purchasedTickets;
}