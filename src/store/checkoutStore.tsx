import { create } from "zustand";
import { MovieType } from "../types/movieType";

type ticket = {
    quantity: number,
    type: string,
    value: number
}

interface Session {
  date: Date | null;
  ticket: Array<ticket>;
  language: "Dublado" | "Legendado" | "";
  time: string
}

interface CheckoutStore {
  movie: MovieType | null;
  session: Session;
 

  setMovie: (movie: MovieType) => void;
  setSession: (session: Partial<Session>) => void;

  clearCheckout: () => void;
}

const initialSession: Session = {
  date: null,
  ticket: [],
  language: "",
  time: ""
};

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  movie: null,
  session: initialSession,
  tickets: [],
  seats: [],
  snacks: [],

  setMovie: (movie) => set({ movie }),

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
      session: initialSession
    }),
}));