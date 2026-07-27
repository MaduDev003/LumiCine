"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Cards from "react-19-credit-card";
import "react-19-credit-card/dist/es/index.css";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { canInstallment } from "@/src/services/paymentService";import { BRFormat } from "@/src/utils/fixValueForBrazilianFormat";;
import { PaymentFormData } from "@/src/schemas/paymentSchema";
import InputForm from "./InputForm";


type Focused = "number" | "name" | "expiry" | "cvc" | "";

interface Props {
  isCreditCard: boolean;
  totalPrice: number;
  register: UseFormRegister<PaymentFormData>;
  errors: FieldErrors<PaymentFormData>;
  watch: UseFormWatch<PaymentFormData>;
  setValue: UseFormSetValue<PaymentFormData>;
}

export default function PaymentCard({
  isCreditCard,
  totalPrice,
  register,
  errors,
  watch,
  setValue,
}: Props) {
  const [focus, setFocus] = useState<Focused>("");
  const [isOpen, setIsOpen] = useState(false);


  const oneInstallment = `1x de R$ ${BRFormat(totalPrice)}`;
  const twoInstallment = `2x de R$ ${BRFormat(totalPrice / 2)}`;
  const initialInstallment =
    !canInstallment(totalPrice)
    ? "Parcelamento disponível para compras a partir de R$ 40,00"
    : oneInstallment;
  const [installment, setInstallment] = useState(initialInstallment);
  
  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    setFocus(e.target.name as Focused);
  }

  function handleInstallment(value: string) {
    setInstallment(value);
    setValue("installment", value);
    setIsOpen(false);
  }

  return (
    <div>
      <Cards
        number={watch("number")}
        name={watch("name")}
        expiry={watch("expiry")}
        cvc={watch("cvc")}
        focused={focus}
      />

      <div className="flex flex-col gap-3 mt-3 px-5">
        <div className="flex flex-col justify-between md:flex-row">
          <InputForm
            label="Número do cartão"
            name="number"
            type="tel"
            placeholder="4111 5555 3782 6011"
            errors={errors}
            register={register}
            onFocus={handleFocus}
          />

          <InputForm
            label="Nome"
            name="name"
            type="text"
            placeholder="Nome como está no cartão"
            errors={errors}
            register={register}
            onFocus={handleFocus}
          />
        </div>

        <div className="flex flex-col justify-between md:flex-row">
          <InputForm
            label="Data de Expiração"
            name="expiry"
            type="text"
            placeholder="MM/YY"
            errors={errors}
            register={register}
            onFocus={handleFocus}
          />

          <InputForm
            label="CVC"
            name="cvc"
            type="tel"
            placeholder="3 Dígitos"
            errors={errors}
            register={register}
            onFocus={handleFocus}
          />
        </div>

        {isCreditCard && (
          <div className="w-full">
            <h3 className="text-[13px] mb-1 text-font-dark">
              Parcelas
            </h3>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="
                w-full
                h-10
                border
                border-tertiary-dark
                rounded-xl
                px-3
                flex
                items-center
                justify-between
                cursor-pointer
              "
            >
              <span>{installment}</span>

              <ChevronDown
                size={20}
                className={`
                  transition-transform
                  duration-300
                  ${ !canInstallment(totalPrice) ? "opacity-40 cursor-not-allowed" : ""}
                  ${isOpen && canInstallment(totalPrice) ? "rotate-180" : ""}
                `}
              />
            </button>

            {isOpen && canInstallment(totalPrice)  && (
              <div
                className="
                  mt-2
                  bg-secondary-dark
                  rounded-xl
                  overflow-hidden
                  border
                  border-tertiary-dark
                "
              >
                <button
                  type="button"
                  onClick={() => handleInstallment(oneInstallment)}
                  className="
                    w-full
                    px-3
                    py-2
                    text-left
                    hover:bg-white/20
                    cursor-pointer
                  "
                >
                  {oneInstallment}
                </button>

                <button
                  type="button"
                  onClick={() => handleInstallment(twoInstallment)}
                  className="
                    w-full
                    px-3
                    py-2
                    text-left
                    hover:bg-white/20
                    cursor-pointer
                  "
                >
                  {twoInstallment}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}