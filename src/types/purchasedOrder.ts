import { PurchasedTicket } from "./purchasedTicket";
import { Lumibar } from "./checkout/lumiBarType";

export interface PurchasedOrder {
    id: string;
    createdAt: string;
    tickets: PurchasedTicket[];
    lumibar: Lumibar[];
}