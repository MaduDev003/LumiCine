"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckoutStore } from "@/src/store/checkoutStore";
import { Checkout } from "@/src/types/checkoutType";
import { Trash2 } from "lucide-react";
import { sumLumibarProducts } from "@/src/services/checkout/lumiBarService";
import ButtonCine from "../../../components/ui/ButtonCine";
import DivisionBar from "@/src/components/ui/DivisorBar";

type Props = {
  type: Checkout;
};

export default function CheckoutProgress({ type }: Props) {
  const [isConfirmDeletionModalOpen, setIsConfirmDeletionModalOpen] = useState(false); 
  const movie = useCheckoutStore((state) => state.movie);
  const seats = useCheckoutStore((state) => state.seats);
  const session = useCheckoutStore((state) => state.session);
  const tickets = useCheckoutStore((state) => state.tickets);
  const lumibar = useCheckoutStore((state) => state.lumibar);
  const clearCheckout = useCheckoutStore((state) => state.clearCheckout);
  const router = useRouter();
  
  const hasSessionInfo =
    session.language !== "" ||
    session.date !== null ||
    session.time !== "" 

  const hasSeatsInfo = seats.length > 0;


  function calcTotal() {
   const ticketsPrice =
    tickets.full.price * tickets.full.quantity +
    tickets.half.price * tickets.half.quantity;

    return (ticketsPrice + sumLumibarProducts(lumibar).price).toFixed(2);
  }

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
      <section className="flex flex-col gap-3 mb-3">
        <div className="flex justify-between">
          <h1>Resumo do Pedido</h1>

          <Trash2
            onClick={() => setIsConfirmDeletionModalOpen(true)}
            size={18}
            className="hover:stroke-red-500 cursor-pointer transition"
          />
        </div>

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

      {hasSessionInfo && (
        <>
          <DivisionBar />

          <section className="mt-5 mb-5">
            {session.language && (
              <div className="flex justify-between">
                <p className="text-font-secondary-dark">Idioma</p>
                <p  className="text-font-dark">{session.language}</p>
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
          </section>
        </>
      )}
      {hasSeatsInfo && (
        <section className="flex justify-between">
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
      )}
      {lumibar.length > 0 && (
        <>
          <div className="flex justify-center items-center flex-col mt-3">
             <DivisionBar />
            <p className="text-font-secondary-dark mt-3">Pedidos Lumibar</p>
            <div  className="lumibar-scroll bg-[#262626] rounded w-full h-30 overflow-y-auto flex flex-col gap-2 p-3 mb-3 items-start ">
              {lumibar.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <span className="text-[#AAA9A8]">x{item.quantity}</span>
                  <p className="text-font-dark">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      
      <div className="pt-6">
        <DivisionBar />

        <div className="pt-4">
          <div className="flex justify-between">
            <p className="text-font-secondary-dark">Itens</p>

            <div className="w-10">
              <p className="text-font-dark">{calcItemsQuantity()}</p>
            </div>
          </div>

          <div className="flex justify-between mt-3">
            <p  className="text-font-dark font-medium">Total</p>
            <p  className="text-font-dark font-medium">R$ {calcTotal()}</p>
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
            Ao confirmar, seu pedido será cancelado e você será redirecionado para a página inicial.
          </p>

          <div className="mt-8 flex justify-end gap-3">
            <ButtonCine
              text="Cancelar"
              className="
                bg-tertiary-dark w-32 cursor-pointer
                transition-all duration-200
                hover:brightness-110
              "
              onClick={() => setIsConfirmDeletionModalOpen(false)}
            />

            <ButtonCine
              text="Confirmar"
              className="
                  h-12
                  bg-accent w-32 cursor-pointer
                  transition-all duration-200
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