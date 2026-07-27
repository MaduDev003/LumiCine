import { PurchasedTicket } from "./PurchasedTicket";
import { Lumibar } from "./checkout/LumiBarType";

export interface PurchasedOrder {
    id: string;
    createdAt: string;
    tickets: PurchasedTicket[];
    lumibar: Lumibar[];
}