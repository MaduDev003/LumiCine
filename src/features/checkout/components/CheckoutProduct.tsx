import { useCheckoutStore } from "@/src/store/checkoutStore";
import { CheckoutType } from "@/src/types/checkoutType";
import { Trash2 } from "lucide-react";
import DivisionBar from "@/src/components/ui/DivisorBar";

export default function CheckoutProgress({ type }: CheckoutType) {
  const movie = useCheckoutStore((state) => state.movie);
  const session = useCheckoutStore((state) => state.session);
  const tickets = useCheckoutStore((state) => state.tickets);
  
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
    <div className="flex-1 bg-secondary-dark p-4 rounded-xl flex flex-col">
      <section className="flex flex-col gap-5 mb-3">
        <div className="flex justify-between">
          <h1>Resumo do Pedido</h1>
          <Trash2 size={18} className="hover:stroke-red-500 cursor-pointer"/>
        </div>

        <div className="flex flex-col justify-center items-center gap-3">
          <img
            className="w-27 rounded"
            src={movie?.poster_url}
            alt={movie?.title}
          />
          <h2 className="text-font-dark text-[19px]">{movie?.title}</h2>
        </div>
      </section>

     {hasSessionInfo && (
        <>
          <DivisionBar />

          <section className="mt-3 px-6">
            {session.language && (
              <div className="flex justify-between">
                <p>Idioma</p>
                <p>{session.language}</p>
              </div>
            )}

            {session.date && (
              <div className="flex justify-between mt-3">
                <p>Data</p>
                <p>{session.date}</p>
              </div>
            )}

            {session.time && (
              <div className="flex justify-between mt-3">
                <p>Horário</p>
                <p>{session.time}</p>
              </div>
            )}
          </section>
        </>
      )}

      <div className="mt-auto">
            <DivisionBar />

            <div className="pt-4">
            <div className="flex justify-between">
            <p>Itens</p>
            <div className="w-10">
                <p>{calcItemsQuantity()}</p>
            </div>
            </div>

            <div className="flex justify-between mt-3">
            <p>Total</p>
            <p>R$ {calcTotal()}</p>
            </div>
        </div>
      </div>
    </div>
  );
}