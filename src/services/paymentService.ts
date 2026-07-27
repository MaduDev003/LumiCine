import QRCode from "qrcode";
import { PaymentFormData } from "@/src/schemas/paymentSchema";
import { Tickets } from "@/src/types/checkout/TicketsType";
import { Lumibar } from "@/src/types/checkout/LumiBarType";
import { sumLumibarProducts } from "./checkout/lumiBarService";
import { calcTicketsTotal } from "./checkout/sessionService";

export async function processPayment(data: PaymentFormData) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    success: true,
    transactionId: crypto.randomUUID(),
    paidAt: new Date().toISOString(),
  };
}


export function calcItemsTotalPrice(tickets: Tickets, foods: Lumibar[]): number {
   const {totalPrice} = calcTicketsTotal(tickets);

    return Number((totalPrice + sumLumibarProducts(foods).price));
}


export function canInstallment(totalPrice: number) {
  return totalPrice >= 40;
}

