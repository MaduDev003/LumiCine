"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";
import pix from "../../assets/icons/pix.svg";

type PaymentType = "credit" | "debit" | "pix" | null;

export default function PaymentPurchase() {
    const [selectedPayment, setSelectedPayment] = useState<PaymentType>(null);

    function handlePaymentSelect(payment: PaymentType) {
        setSelectedPayment(prev => prev === payment ? null : payment);
    }

    function getPaymentClass(payment: PaymentType) {
        const isSelected = selectedPayment === payment;

        return `
            bg-secondary-dark
            w-[85%]
            ${isSelected ? "h-86" : "h-18"}
            rounded
            flex
            ${isSelected ? "items-baseline py-4" : "items-center"}
            px-4
            gap-4
            hover:bg-white/22
            cursor-pointer
            text-left
            transition-all
            duration-300
        `;
    }

    return (
        <>
            <button
                onClick={() => handlePaymentSelect("credit")}
                className={getPaymentClass("credit")}
            >
                {selectedPayment === "credit" ? (
                    <div>
                        <h2 className="text-font-dark text-[20px]">
                            Crédito
                        </h2>

                        <p className="text-font-secondary-dark text-[15px] mt-2">
                            Informe os dados do cartão de crédito.
                        </p>
                    </div>
                ) : (
                    <>
                        <CreditCard 
                            size={26} 
                            color="#FF5900" 
                            fill="#8C380B"
                        />

                        <div>
                            <h2 className="text-font-dark text-[20px]">
                                Cartão de Crédito
                            </h2>

                            <p className="text-font-secondary-dark text-[15px]">
                                Parcelamento em até 2x ( valor mínimo 40 reais )
                            </p>
                        </div>
                    </>
                )}
            </button>


            <button
                onClick={() => handlePaymentSelect("debit")}
                className={getPaymentClass("debit")}
            >
                {selectedPayment === "debit" ? (
                    <div>
                        <h2 className="text-font-dark text-[20px]">
                            Débito
                        </h2>

                        <p className="text-font-secondary-dark text-[15px] mt-2">
                            Informe os dados do cartão de débito.
                        </p>
                    </div>
                ) : (
                    <>
                        <CreditCard 
                            size={26} 
                            color="#FF5900" 
                            fill="#8C380B"
                        />

                        <div>
                            <h2 className="text-font-dark text-[20px]">
                                Cartão de Débito
                            </h2>
                        </div>
                    </>
                )}
            </button>


            <button
                onClick={() => handlePaymentSelect("pix")}
                className={getPaymentClass("pix")}
            >
                {selectedPayment === "pix" ? (
                    <div>
                        <h2 className="text-font-dark text-[20px]">
                            Pix
                        </h2>

                        <p className="text-font-secondary-dark text-[15px] mt-2">
                            Gere o QR Code para realizar o pagamento.
                        </p>
                    </div>
                ) : (
                    <>
                        <img 
                            src={pix.src} 
                            alt="Símbolo do Pix" 
                            className="w-6 h-6"
                        />

                        <div>
                            <h2 className="text-font-dark text-[20px]">
                                Pix
                            </h2>
                        </div>
                    </>
                )}
            </button>
        </>
    )
}