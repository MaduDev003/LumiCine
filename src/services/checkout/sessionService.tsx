import { Tickets } from "@/src/types/checkout/ticketsType";

export   function updateTicketQuantity(
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