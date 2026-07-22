import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PurchasedTicket } from "../types/PurchasedTicket";


interface PurchasedTicketsStore {
    tickets: PurchasedTicket[];

    setTickets: (
        tickets: PurchasedTicket[]
    ) => void;

    clearTickets: () => void;
}


export const usePurchasedTicketsStore = create<PurchasedTicketsStore>()(
    persist(
        (set) => ({
            tickets: [],

            setTickets: (tickets) =>
                set({
                    tickets,
                }),

            clearTickets: () =>
                set({
                    tickets: [],
                }),
        }),
        {
            name: "purchased-tickets",
        }
    )
);