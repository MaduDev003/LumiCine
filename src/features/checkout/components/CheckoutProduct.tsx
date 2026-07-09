"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckoutStore } from "@/src/store/checkoutStore";
import { CheckoutType } from "@/src/types/checkoutType";
import { Trash2 } from "lucide-react";
import ButtonCine from "../../../components/ui/ButtonCine";
import DivisionBar from "@/src/components/ui/DivisorBar";

type Props = {
  type: CheckoutType;
};

export default function CheckoutProgress({ type }: Props) {
  const [isConfirmDeletionModalOpen, setIsConfirmDeletionModalOpen] = useState(false); 
  const movie = useCheckoutStore((state) => state.movie);
  const session = useCheckoutStore((state) => state.session);
  const tickets = useCheckoutStore((state) => state.tickets);
  const clearCheckout = useCheckoutStore((state) => state.clearCheckout);
  const router = useRouter();
  
  const hasSessionInfo =
    session.language !== "" ||
    session.date !== null ||
    session.time !== "" 

  function calcTotal() {
    const fullTicketsPrice = tickets.full.price * tickets.full.quantity;
    const halfTicketsPrice = tickets.half.price * tickets.half.quantity;

    return (fullTicketsPrice + halfTicketsPrice).toFixed(2);
  }

  function calcItemsQuantity(){
    return tickets.full.quantity + tickets.half.quantity
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

      <div className="mt-auto">
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