"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { useCheckoutStore } from "@/src/store/checkoutStore";
import { sumLumibarProducts } from "@/src/services/checkout/lumiBarService";
import { calcItemsTotalPrice } from "@/src/services/paymentService";
import { BRFormat } from "@/src/utils/fixValueForBrazilianFormat";

import ButtonCine from "../../../components/ui/ButtonCine";
import DivisionBar from "@/src/components/ui/DivisorBar";

export default function CheckoutProduct() {
  const [isConfirmDeletionModalOpen, setIsConfirmDeletionModalOpen] =
    useState(false);

  const movie = useCheckoutStore((state) => state.movie);
  const seats = useCheckoutStore((state) => state.seats);
  const session = useCheckoutStore((state) => state.session);
  const tickets = useCheckoutStore((state) => state.tickets);
  const lumibar = useCheckoutStore((state) => state.lumibar);
  const clearCheckout = useCheckoutStore((state) => state.clearCheckout);

  const router = useRouter();

  const hasSessionInfo =
  !!session.language ||
  !!session.date ||
  !!session.time;

  console.log("hasSeatsInfo", seats)
  console.log(hasSessionInfo, "hasSessionInfo")
  console.log("haslumibar:", lumibar)

  function calcItemsQuantity() {
    const ticketsSum = tickets.full.quantity + tickets.half.quantity;

    return ticketsSum + sumLumibarProducts(lumibar).quantity;
  }

  return (
    <>
      <div
        className="
          w-full
          lg:flex-1
          bg-secondary-dark
          p-4
          rounded-xl
          flex
          flex-col
          h-fit
        "
      >
        <div className="flex justify-between mb-2">
          <h1>Resumo do Pedido</h1>

          <Trash2
            onClick={() => setIsConfirmDeletionModalOpen(true)}
            size={18}
            className="hover:stroke-red-500 cursor-pointer transition"
          />
        </div>
        {movie && (
          <>
            <DivisionBar />

            <section className="flex flex-col gap-3 my-3">
              <div className="flex flex-col justify-center items-center gap-3">
                <img
                  className="w-27 rounded"
                  src={movie?.poster_url}
                  alt={movie?.title}
                />

                <h2 className="text-font-dark text-[19px]">
                  {movie?.title}
                </h2>
              </div>
            </section>
          </>
        )}

        {hasSessionInfo && (
          <>
            <DivisionBar />

            <section className="my-5">
              {session.language && (
                <div className="flex justify-between">
                  <p className="text-font-secondary-dark">Idioma</p>
                  <p className="text-font-dark">{session.language}</p>
                </div>
              )}

              {session.date && (
                <div className="flex justify-between mt-3">
                  <p className="text-font-secondary-dark">Data</p>
                  <p className="text-font-dark">{session.date}</p>
                </div>
              )}

              {session.time && (
                <div className="flex justify-between mt-3">
                  <p className="text-font-secondary-dark">Horário</p>
                  <p className="text-font-dark">{session.time}</p>
                </div>
              )}
               {hasSessionInfo && seats.length > 0 && (
                <>

                  <section className="flex justify-between my-4">
                    <p className="text-font-secondary-dark">Assentos</p>

                    <div className="flex justify-end gap-2">
                      {seats.map((seat, index) => (
                        <p key={seat} className="text-font-dark">
                          {seat}
                          {index < seats.length - 1 && ","}
                        </p>
                      ))}
                    </div>
                  </section>
                </>
              )}
            </section>
            
          </>
        )}

        {lumibar.length > 0 && (
          <>
            <DivisionBar />

            <div className="flex flex-col items-center mt-4">
              <p className="text-font-secondary-dark mb-3">
                Pedidos Lumibar
              </p>

              <div
                className={`lumibar-scroll bg-[#262626] rounded w-full overflow-y-auto flex flex-col gap-2 p-3 items-start ${
                  hasSessionInfo ? "h-30" : "h-full"
                }`}
              >
                {lumibar.map((item, index) => (
                  <div key={index} className="flex justify-between w-full">
                    <div className="flex gap-2">
                      <span className="text-[#AAA9A8]">
                        x{item.quantity}
                      </span>

                      <p className="text-font-dark">{item.name}</p>
                    </div>

                    <p className="text-font-secondary-dark">
                      R$ {item.price * item.quantity},00
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="mt-4">
          <DivisionBar />

          <div className="pt-4">
            <div className="flex justify-between">
              <p className="text-font-secondary-dark">Itens</p>

              <div className="w-10">
                <p className="text-font-secondary-dark">
                  {calcItemsQuantity()}
                </p>
              </div>
            </div>

            <div className="flex justify-between mt-3">
              <p className="text-font-dark font-medium">Total</p>

              <p className="text-font-dark font-medium">
                R$ {BRFormat(calcItemsTotalPrice(tickets, lumibar))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {isConfirmDeletionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-115 rounded-2xl bg-secondary-dark shadow-2xl p-6">
            <h2 className="text-xl font-semibold text-font-dark">
              Cancelar Pedido
            </h2>

            <p className="mt-3 text-font-secondary-dark">
              Ao confirmar, seu pedido será cancelado e você será redirecionado
              para a página inicial.
            </p>

            <div className="mt-8 flex justify-end gap-3">
              <ButtonCine
                text="Cancelar"
                className="
                  bg-tertiary-dark
                  w-32
                  cursor-pointer
                  transition-all
                  duration-200
                  hover:brightness-110
                "
                onClick={() => setIsConfirmDeletionModalOpen(false)}
              />

              <ButtonCine
                text="Confirmar"
                className="
                  h-12
                  bg-accent
                  w-32
                  cursor-pointer
                  transition-all
                  duration-200
                  hover:brightness-110
                "
                onClick={() => {
                  clearCheckout();
                  router.push("/");
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}