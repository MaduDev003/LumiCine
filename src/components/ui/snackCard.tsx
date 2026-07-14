"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

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
  const [quantity, setQuantity] = useState(0);

  function handleIncrease() {
    if (quantity === 6) return;
    setQuantity((prev) => prev + 1);
  }

  function handleDecrease() {
    setQuantity((prev) => Math.max(prev - 1, 0));
  }

  return (
    <div className="relative w-48">
      <div className="absolute top-2 right-0 z-20 flex items-center justify-center rounded-full bg-secondary-dark px-3 py-1 shadow-[0_8px_20px_rgba(0,0,0,0.45)]">
        <span className="text-[16px] font-semibold">
          R$ {price.toFixed(2)}
        </span>
      </div>
      <div className="relative z-10 flex justify-center h-40 mb-5 ">
        <img
          src={image}
          alt={name}
          className="w-35 object-contain drop-shadow-xl "
        />
      </div>
      <div className="-mt-5 h-52 rounded-2xl bg-secondary-dark px-4 pt-8 pb-4 flex flex-col justify-between  shadow-[0_8px_20px_rgba(0,0,0,0.45)]">
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
              onClick={() => setQuantity(1)}
              className="cursor-pointer rounded-full h-10 mt-3 bg-accent px-6 py-2 text-sm font-medium text-white transition hover:brightness-110"
            >
              Adicionar
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={handleDecrease}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-zinc-800 transition hover:bg-zinc-600"
              >
                <Minus size={15} />
              </button>

              <span className="w-5 text-center text-lg font-semibold">
                {quantity}
              </span>

              <button
                onClick={handleIncrease}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-accent text-white transition hover:brightness-110"
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