import { Ticket } from "./TicketsType";

export interface Session {
  date: string;
  ticket: Ticket[];
  language: "Dublado" | "Legendado" | "";
  time: string;
}