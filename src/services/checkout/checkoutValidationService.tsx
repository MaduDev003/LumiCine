// services/checkout/checkoutValidationService.ts
import { Tickets } from "../../types/checkout/ticketsType";
import { Session } from "@/src/types/checkout/sessionType";

export function validateSeatSelection(seats: string[]) {
  const missingFields = seats.length === 0
    ? ["Selecione seu(s) assento(s)"]
    : [];

  
  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
}

export function validateSessionSelection(
  session: Session,
  tickets: Tickets
) {
  const missingFields: string[] = [];

  if (!session.language) missingFields.push("Idioma");
  if (!session.time) missingFields.push("Horário");

  if (
    tickets.full.quantity === 0 &&
    tickets.half.quantity === 0
  ) {
    missingFields.push("Ingressos");
  }

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
}