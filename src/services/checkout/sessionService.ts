import { Tickets } from "@/src/types/checkout/TicketsType";

export function updateTicketQuantity(
    tickets: Tickets,
    type: "half" | "full",
    operationType: "plus" | "minus"
    ) {
      const value = operationType === "plus" ? 1 : -1;

      return {
        ...tickets, 
        [type]: {
            ...tickets[type],
            quantity: Math.max(0, tickets[type].quantity + value)
        }
      }
    
    }

  export function calcTicketsTotal(tickets: Tickets){
   const sumTicketsPrice =  
    tickets.full.price * tickets.full.quantity +
    tickets.half.price * tickets.half.quantity;  

   return {
    totalQuantity: tickets.full.quantity + tickets.half.quantity,
    totalPrice: sumTicketsPrice
   }
  }