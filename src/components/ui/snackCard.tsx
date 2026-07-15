"use client";

import { Minus, Plus } from "lucide-react";
import { useCheckoutStore } from "@/src/store/checkoutStore";
import { handlePurchase } from "@/src/services/checkout/lumiBarService";

type Props = {
  name: string;
  description: string;
  price: number;
  image: string;
};

export default function SnackCard({
  name,
  description,
  price,
  image,
}: Props) {
  const lumibar = useCheckoutStore((state) => state.lumibar);
  const setLumibar = useCheckoutStore((state) => state.setLumibar);

  const quantity =
    lumibar.find((item) => item.name === name)?.quantity ?? 0;


  function handleQuantityChange(operation: "plus" | "minus") {
    const result = handlePurchase(operation, lumibar, {
      name,
      price,
    });

    if (result) {
      setLumibar(result.products);
    }
  }
      

  return (
    <div className="relative w-48">
      <div className="absolute top-2 right-0 z-20 flex items-center justify-center rounded-full bg-secondary-dark px-3 py-1">
        <span className="text-[16px] font-semibold">
          R$ {price.toFixed(2)}
        </span>
      </div>

      <div className="relative z-10 flex justify-center h-40 mb-5">
        <img
          src={image}
          alt={name}
          className="w-35 object-contain drop-shadow-xl"
        />
      </div>

      <div className="-mt-5 h-52 rounded-2xl bg-secondary-dark px-4 pt-8 pb-4 flex flex-col justify-between">

        <div>
          <h2 className="text-center text-lg font-medium">
            {name}
          </h2>

          <p className="mt-2 h-10 text-center text-sm text-font-secondary-dark">
            {description}
          </p>
        </div>


        <div className="flex justify-center items-center h-20">

          {quantity === 0 ? (
            <button
              onClick={() => handleQuantityChange("plus")}
              className="cursor-pointer rounded-full h-10 mt-3 bg-accent px-6 py-2 text-sm font-medium text-white"
            >
              Adicionar
            </button>
          ) : (
            <div className="flex items-center gap-4">

              <button
                onClick={() => handleQuantityChange("minus")}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800"
              >
                <Minus size={15} />
              </button>

              <span className="w-5 text-center text-lg font-semibold">
                {quantity}
              </span>

              <button
                onClick={() => handleQuantityChange("plus")}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white"
              >
                <Plus size={15} />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}