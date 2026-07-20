import { Session } from "@/src/types/checkout/sessionType";
import { Tickets } from "@/src/types/checkout/ticketsType";

export function validateSeatSelection(seats: string[], totalSeatsPermitted: number) {
  const missingFields = []

  if(seats.length < totalSeatsPermitted){
    const remainingSeats = totalSeatsPermitted - seats.length;

    missingFields.push(
      `Selecione ${seats.length >= 1 ? "mais" : ""} ${remainingSeats} assento${remainingSeats > 1 ? "s" : ""}.`
    );
  }

  
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