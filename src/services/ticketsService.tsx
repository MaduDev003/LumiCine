import { SeatSelected } from "../types/checkout/seatType";
import { Tickets } from "../types/checkout/ticketsType";
import { Session } from "../types/checkout/sessionType";

type MovieInfo = {
    title?: string;
    poster?: string;
};

type TicketSession = Omit<Session, "tickets">;

type CommonInfo = {
    movie: MovieInfo;
    session: TicketSession;
};

export type CheckoutTicket = {
    seat: string;
    seatType: SeatSelected["type"];
    ticketType: "half" | "full";
    movie: MovieInfo;
    session: TicketSession;
};

export function mountTickets(
    tickets: Tickets,
    seats: SeatSelected[],
    { movie, session }: CommonInfo
): CheckoutTicket[] {

    const mountedTickets: CheckoutTicket[] = [];

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

        mountedTickets.push({
            seat: seat.position,
            seatType: seat.type,
            ticketType,
            movie,
            session,
        });
    }

    return mountedTickets;
}