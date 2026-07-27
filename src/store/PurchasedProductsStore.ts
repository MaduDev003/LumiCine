import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PurchasedOrder } from "@/src/types/PurchasedOrder";


interface PurchasedProductsStore {
    orders: PurchasedOrder[];

    setPurchasedProducts: (
        tickets: PurchasedOrder["tickets"],
        lumibar: PurchasedOrder["lumibar"]
    ) => void;

    clearPurchasedProducts: () => void;
}


export const usePurchasedProductsStore = create<PurchasedProductsStore>()(
    persist(
        (set) => ({
            orders: [],

            setPurchasedProducts: (tickets, lumibar) => {
                set((state) => ({
                    orders: [
                        ...state.orders,
                        {
                            id: crypto.randomUUID(),
                            createdAt: new Date().toISOString(),
                            tickets,
                            lumibar,
                        }
                    ],
                }));
            },

            clearPurchasedProducts: () => {
                set({
                    orders: [],
                });
            },
        }),
        {
            name: "purchased-products",
        }
    )
);