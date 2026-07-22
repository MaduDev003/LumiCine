import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PurchasedTicket } from "../types/PurchasedTicket";
import { Lumibar } from "../types/checkout/lumiBarType";

interface PurchasedProductsStore {
    tickets: PurchasedTicket[];
    lumibar: Lumibar[];

    setPurchasedProducts: (
        tickets: PurchasedTicket[],
        lumibar: Lumibar[]
    ) => void;

    clearPurchasedProducts: () => void;
}

export const usePurchasedProductsStore = create<PurchasedProductsStore>()(
    persist(
        (set) => ({
            tickets: [],
            lumibar: [],

            setPurchasedProducts: (tickets, lumibar) => {
                set({
                    tickets,
                    lumibar,
                });
            },

            clearPurchasedProducts: () => {
                set({
                    tickets: [],
                    lumibar: [],
                });
            },
        }),
        {
            name: "purchased-products",
        }
    )
);