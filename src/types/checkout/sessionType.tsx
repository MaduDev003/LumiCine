import { Ticket } from "./ticketsType";

export interface Session {
  date: string;
  ticket: Ticket[];
  language: "Dublado" | "Legendado" | "";
  time: string;
}