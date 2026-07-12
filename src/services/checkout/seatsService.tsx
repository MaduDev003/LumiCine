import { Seat } from "@/src/types/checkout/seatType";
import { Tickets } from "@/src/types/checkout/ticketsType";

export function isSeatValidForPurchase(
  tickets: Tickets,
  seatType: Seat
) {
  const seatLimitSelection =
    tickets.full.quantity + tickets.half.quantity;

  return seatLimitSelection > 1 || seatType === "standard";
}