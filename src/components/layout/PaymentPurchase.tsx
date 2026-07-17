"use client";

import { useState } from "react";
import { ChevronDown, CreditCard } from "lucide-react";
import pix from "../../assets/icons/pix.svg";
import PaymentCard from "../ui/PaymentCard";

type PaymentType = "credit" | "debit" | "pix" | null;

export default function PaymentPurchase() {
    const [selectedPayment, setSelectedPayment] = useState<PaymentType>(null);

    function handlePaymentSelect(payment: PaymentType) {
        setSelectedPayment((prev) => (prev === payment ? null : payment));
    }

    function getPaymentClass(payment: PaymentType) {
        const isSelected = selectedPayment === payment;

        return `
            bg-secondary-dark
            w-[85%]
            ${isSelected ? "h-auto" : "h-18"}
            rounded
            flex
            flex-col
            ${isSelected ? "py-4" : "justify-center"}
            px-4
            gap-4
            ${isSelected ? "hover:bg-secondary-dark" : "hover:bg-white/22"}
            cursor-pointer
            text-left
            transition-all
            duration-300
        `;
    }

    return (
        <>
            {/* Crédito */}
            <div
                className={getPaymentClass("credit")}
                onClick={() => handlePaymentSelect("credit")}
            >
                <div className="flex items-center gap-3 w-full">
                    <CreditCard
                        size={26}
                        color="#FF5900"
                        fill="#8C380B"
                    />

                    <div className="flex w-full justify-between items-center">
                        <div>
                            <h2
                                className={`text-font-dark ${
                                    selectedPayment === "credit"
                                        ? "text-[16px]"
                                        : "text-[20px]"
                                }`}
                            >
                                Cartão de Crédito
                            </h2>

                            <p className="text-font-secondary-dark text-[15px]">
                                Parcelamento em até 2x (valor mínimo de R$ 40)
                            </p>
                        </div>

                        <ChevronDown
                            size={20}
                            className={`transition-transform duration-300 ${
                                selectedPayment === "credit"
                                    ? "rotate-180"
                                    : ""
                            }`}
                        />
                    </div>
                </div>

                {selectedPayment === "credit" && (
                    <div onClick={(e) => e.stopPropagation()}>
                        <PaymentCard isCreditCard={true} />
                    </div>
                )}
            </div>

            {/* Débito */}
            <div
                className={getPaymentClass("debit")}
                onClick={() => handlePaymentSelect("debit")}
            >
                <div className="flex items-center gap-3 w-full">
                    <CreditCard
                        size={26}
                        color="#FF5900"
                        fill="#8C380B"
                    />

                    <div className="flex w-full justify-between items-center">
                        <div>
                            <h2
                                className={`text-font-dark ${
                                    selectedPayment === "debit"
                                        ? "text-[16px]"
                                        : "text-[20px]"
                                }`}
                            >
                                Cartão de Débito
                            </h2>

                            <p className="text-font-secondary-dark text-[15px]">
                                Informe os dados do cartão de débito.
                            </p>
                        </div>

                        <ChevronDown
                            size={20}
                            className={`transition-transform duration-300 ${
                                selectedPayment === "debit"
                                    ? "rotate-180"
                                    : ""
                            }`}
                        />
                    </div>
                </div>

                {selectedPayment === "debit" && (
                    <div onClick={(e) => e.stopPropagation()}>
                        <PaymentCard isCreditCard={false} />
                    </div>
                )}
            </div>

            {/* Pix */}
            <div
                className={getPaymentClass("pix")}
                onClick={() => handlePaymentSelect("pix")}
            >
                <div className="flex items-center gap-3 w-full">
                    <img
                        src={pix.src}
                        alt="Símbolo do Pix"
                        className="w-6 h-6"
                    />

                    <div className="flex w-full justify-between items-center">
                        <div>
                            <h2 className="text-font-dark text-[20px]">
                                Pix
                            </h2>
                        </div>

                        <ChevronDown
                            size={20}
                            className={`transition-transform duration-300 ${
                                selectedPayment === "pix"
                                    ? "rotate-180"
                                    : ""
                            }`}
                        />
                    </div>
                </div>

                {selectedPayment === "pix" && (
                    <div onClick={(e) => e.stopPropagation()}>
                        <p className="text-font-secondary-dark text-[15px]">
                            Gere o QR Code para realizar o pagamento.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}