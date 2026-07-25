import { create } from "zustand";
import { Movie } from "@/src/types/movieType";
import { persist } from "zustand/middleware";
import { Tickets } from "@/src/types/checkout/ticketsType";
import { Session } from "@/src/types/checkout/sessionType";
import { Lumibar } from "@/src/types/checkout/lumiBarType";
import { SeatSelected } from "@/src/types/checkout/seatType";

interface CheckoutStore {
  movie: Movie | null;
  session: Session;
  tickets: Tickets;
  seats: SeatSelected[];
  lumibar: Lumibar[];

 
  setMovie: (movie: Movie) => void;
  setSession: (session: Partial<Session>) => void;
  setTickets: (tickets: Tickets) => void;
  setSeats: (seats: SeatSelected[]) => void;
  setLumibar: (lumibar: Lumibar[]) => void;
  clearCheckout: () => void;
}

const initialSession: Session = {
  date: "",
  ticket: [],
  language: "",
  time: "",
};

const initialTickets: Tickets = {
  half: {
    quantity: 0,
    price: 10,
  },
  full: {
    quantity: 0,
    price: 20,
  },
};

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set) => ({
      movie: null,
      session: initialSession,
      tickets: initialTickets,
      seats: [],
      lumibar: [],

      setMovie: (movie) => set({ movie }),
      setTickets: (tickets) => set({ tickets }),
      setSession: (session) =>
        set((state) => ({
          session: {
            ...state.session,
            ...session,
          },
        })),
      setSeats: (seats) => set({ seats }),
      setLumibar: (lumibar) => set({lumibar}),

      clearCheckout: () =>
        set({
          movie: null,
          session: initialSession,
          tickets: initialTickets,
          seats: [],
          lumibar: []
        }),
    }),
    {
      name: "checkout-storage",
    }
  )
);