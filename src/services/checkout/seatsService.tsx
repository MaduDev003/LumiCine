import { Tickets } from "@/src/types/checkout/ticketsType";
import { Seat } from "@/src/types/checkout/seatType";

export function isSeatValidForPurchase(
  tickets: Tickets,
  seatType: Seat
) {
  const totalTickets =
    tickets.full.quantity + tickets.half.quantity;

  const hasOnlyOneTicket = totalTickets === 1;


  if (hasOnlyOneTicket && seatType === "companion") {
    return false;
  }

  return true;
}