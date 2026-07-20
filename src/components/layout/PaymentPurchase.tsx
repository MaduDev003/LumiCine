"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, CreditCard, CircleX, CircleCheck } from "lucide-react";
import { processPayment, calcItemsTotalPrice, canInstallment } from "@/src/services/paymentService";
import { paymentSchema, PaymentFormData} from "@/src/schemas/paymentSchema";
import { useCheckoutStore } from "@/src/store/checkoutStore";
import PaymentCard from "../ui/PaymentCard";
import ButtonCine from "../ui/ButtonCine";

type PaymentType = "credit" | "debit" | "pix" | null;

export default function PaymentPurchase() {
  const [selectedPayment, setSelectedPayment] = useState<PaymentType>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error">("error");
  const [modalMessage, setModalMessage] = useState("");
  const tickets = useCheckoutStore((state) => state.tickets);
  const lumibar = useCheckoutStore((state) => state.lumibar);
  const totalPrice = calcItemsTotalPrice(tickets, lumibar);
  const router = useRouter();
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      number: "",
      name: "",
      expiry: "",
      cvc: "",
      installment: "1x sem juros",
    },
  });

    function getPaymentClass(payment: PaymentType) {
      const isSelected = selectedPayment === payment;

      return `
        bg-secondary-dark
        w-[85%]
        rounded
        flex
        flex-col
        ${isSelected ? "py-4" : "py-0 h-18"}
        px-4
        gap-4
        ${isSelected ? "hover:bg-secondary-dark" : "hover:bg-white/22"}
        cursor-pointer
        text-left
        transition-all
        duration-700
        ease-out
      `;
    }
  
    async function handlePaymentSelect(payment: PaymentType) {
        const nextPayment =
          selectedPayment === payment ? null : payment;

        setSelectedPayment(nextPayment);

         reset({
            number: "",
            name: "",
            expiry: "",
            cvc: ""
          });
    }

    async function onSubmit(data: PaymentFormData) {
      if (selectedPayment === "credit" && !canInstallment(totalPrice)) {
        setModalType("error");
        setModalMessage(
          "Compras parceladas apenas para valores a partir de R$ 40,00."
        );
        setIsModalOpen(true);
        return;
      }

      setModalType("success");
      setModalMessage("Pagamento realizado com sucesso!");
      setIsModalOpen(true);

      await finishPayment(data);
    }

    async function finishPayment(data: PaymentFormData) {
      await processPayment(data);

      reset({
        number: "",
        name: "",
        expiry: "",
        cvc: ""
      });

      
    }

  return (
    <>
      <div
        className={getPaymentClass("credit")}
        onClick={() => handlePaymentSelect("credit")}
      >
        <div className="flex items-center gap-3 w-full h-full">
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
              className={`transition-transform duration-700 ${
                selectedPayment === "credit"
                  ? "rotate-180"
                  : ""
              }`}
            />
          </div>
        </div>

        {selectedPayment === "credit" && (
          <div onClick={(e) => e.stopPropagation()}>
            <PaymentCard
              isCreditCard={true}
              totalPrice={totalPrice}
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
            />
          </div>
        )}
      </div>

      <div
        className={getPaymentClass("debit")}
        onClick={() => handlePaymentSelect("debit")}
      >
        <div className="flex items-center gap-3 w-full h-full">
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
              className={`transition-transform duration-700 ${
                selectedPayment === "debit"
                  ? "rotate-180"
                  : ""
              }`}
            />
          </div>
        </div>

        {selectedPayment === "debit" && (
          <div onClick={(e) => e.stopPropagation()}>
            <PaymentCard
              isCreditCard={false}
              totalPrice={totalPrice}
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
            />
          </div>
        )}
      </div>

      <ButtonCine
        onClick={handleSubmit(onSubmit)}
        text="Realizar Pagamento"
        className="
          w-60
          h-10
          text-font-dark
          bg-accent
          transition-all
         duration-700
          hover:scale-105
          cursor-pointer
          hover:brightness-110
          hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)]
        "
      />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-secondary-dark rounded-2xl p-8 w-[90%] max-w-md flex flex-col items-center text-center gap-6 border border-white/10">
            {modalType === "error" ? (
              <CircleX size={90} className="text-red-500" strokeWidth={1.8} />
            ) : (
              <CircleCheck size={90} className="text-green-500" strokeWidth={1.8} />
            )}

            {/* Texto */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-font-dark">
                {modalType === "error" ? "Ops! Algo deu errado" : "Sucesso!"}
              </h2>

              <p className="text-font-secondary-dark text-base leading-relaxed">
                {modalMessage}
              </p>
            </div>
            <button
              onClick={() => {
                setIsModalOpen(false);

                if (modalType === "success") {
                  router.push("/checkout/concluded");
                }
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all cursor-pointer ${
                modalType === "error"
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}