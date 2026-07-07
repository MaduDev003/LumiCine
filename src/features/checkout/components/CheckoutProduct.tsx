import { useCheckoutStore } from "@/src/store/checkoutStore";
import { CheckoutType } from "@/src/types/checkoutType";
import { Trash2 } from "lucide-react";
import DivisionBar from "@/src/components/ui/DivisorBar";

export default function CheckoutProgress({ type }: CheckoutType) {
  const movie = useCheckoutStore((state) => state.movie);

  return (
    <div className="flex-1 bg-secondary-dark p-4 rounded-xl flex flex-col">
      <section className="flex flex-col gap-5 mb-3">
        <div className="flex justify-between">
          <h1>Resumo do Pedido</h1>
          <Trash2 size={18} className="hover:stroke-red-500"/>
        </div>

        <div className="flex flex-col justify-center items-center gap-3">
          <img
            className="w-30 rounded"
            src={movie?.poster_url}
            alt={movie?.title}
          />
          <h2 className="text-font-dark text-[19px]">{movie?.title}</h2>
        </div>
      </section>

      <DivisionBar />

      <section className="mt-3 px-6">
        <div className="flex justify-between">
          <p>Idioma</p>
          <p>Dublado</p>
        </div>

        <div className="flex justify-between mt-3">
          <p>Data</p>
          <p>19 de Fev</p>
        </div>

        <div className="flex justify-between mt-3">
          <p>Horário</p>
          <p>13:30 - 15:00</p>
        </div>
      </section>

      <div className="mt-auto">
            <DivisionBar />

            <div className="pt-4">
            <div className="flex justify-between">
            <p>Itens</p>
            <div className="w-10">
                <p>3</p>
            </div>
            </div>

            <div className="flex justify-between mt-3">
            <p>Total</p>
            <p>R$ 60,00</p>
            </div>
        </div>
      </div>
    </div>
  );
}