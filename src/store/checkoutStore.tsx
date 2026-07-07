import { create } from "zustand";
import { MovieType } from "../types/movieType";
import { persist } from "zustand/middleware";

type Ticket = {
  quantity: number;
  price: number;
};

type Tickets = {
  half: Ticket;
  full: Ticket;
};

interface Session {
  date: string;
  ticket: Ticket[];
  language: "Dublado" | "Legendado" | "";
  time: string;
}

interface CheckoutStore {
  movie: MovieType | null;
  session: Session;
  tickets: Tickets;

  setMovie: (movie: MovieType) => void;
  setSession: (session: Partial<Session>) => void;
  setTickets: (tickets: Tickets) => void;

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

      setMovie: (movie) => set({ movie }),

      setTickets: (tickets) => set({ tickets }),

      setSession: (session) =>
        set((state) => ({
          session: {
            ...state.session,
            ...session,
          },
        })),

      clearCheckout: () =>
        set({
          movie: null,
          session: initialSession,
          tickets: initialTickets,
        }),
    }),
    {
      name: "checkout-storage",
    }
  )
);