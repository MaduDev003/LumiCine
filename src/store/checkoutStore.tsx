import { create } from "zustand";
import { Movie } from "../types/movieType";
import { persist } from "zustand/middleware";
import { Tickets } from "../types/checkout/ticketsType";
import { Session } from "../types/checkout/sessionType";

interface CheckoutStore {
  movie: Movie | null;
  session: Session;
  tickets: Tickets;
  seats: string[];

  setMovie: (movie: Movie) => void;
  setSession: (session: Partial<Session>) => void;
  setTickets: (tickets: Tickets) => void;
  setSeats: (seats: string[]) => void;
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

      clearCheckout: () =>
        set({
          movie: null,
          session: initialSession,
          tickets: initialTickets,
          seats: [],
        }),
    }),
    {
      name: "checkout-storage",
    }
  )
);