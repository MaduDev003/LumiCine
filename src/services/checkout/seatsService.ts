import { Tickets } from "@/src/types/checkout/ticketsType";
import { Seat } from "@/src/types/checkout/seatType";
import { calcTicketsTotal } from "./sessionService";

export function isSeatValidForPurchase(
  tickets: Tickets,
  seatType: Seat
) {
  const {totalQuantity} = calcTicketsTotal(tickets);

    
  const hasOnlyOneTicket = totalQuantity === 1;

  if(tickets.half.quantity === 0 && seatType === "companion"){
    return false;
  }
  
  if (hasOnlyOneTicket && seatType === "companion" ) {
    return false;
  }

  return true;
}
