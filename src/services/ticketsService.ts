import { SeatSelected } from "@/src/types/checkout/seatType";
import { Tickets } from "@/src/types/checkout/ticketsType";
import { Session } from "@/src/types/checkout/sessionType";
import { PurchasedTicket } from "@/src/types/purchasedTicket";
import { PurchasedOrder } from "@/src/types/purchasedOrder";

type MovieInfo = {
    title: string;
    poster: string;
};

type TicketSession = Omit<Session, "ticket">;

type CommonInfo = {
    movie: MovieInfo;
    session: TicketSession;
};

type OrderGrouped = {
    tickets: PurchasedOrder["tickets"];
    lumibar: PurchasedOrder["lumibar"];
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


export function orderPurchasedTicketsByDate(orders: PurchasedOrder[]){
    return orders.reduce<Record<string, OrderGrouped>>(
            (acc, order) => {
                const createdAtDate = new Date(order.createdAt);
                const date = `${createdAtDate.getDate()}/${createdAtDate.getMonth() + 1}/${createdAtDate.getFullYear()}`;
    
                if (!acc[date]) {
                    acc[date] = {
                        tickets: [],
                        lumibar: [],
                    };
                }
    
                acc[date].tickets.push(...order.tickets);
                acc[date].lumibar.push(...order.lumibar);
    
                return acc;
            },
            {}
        );
        

}