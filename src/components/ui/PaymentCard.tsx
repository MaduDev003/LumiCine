"use client"; 

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Cards from "react-19-credit-card";
import "react-19-credit-card/dist/es/index.css";

type Focused = "number" | "name" | "expiry" | "cvc" | "";
interface Props {
  isCreditCard: boolean;
}

export default function App({ isCreditCard }: Props) {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [installment, setInstallment] = useState("1x sem juros");
  const [focus, setFocus] = useState<Focused>("");
  

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    setFocus(e.target.name as Focused);
  }

  return (
    <div>
      <Cards
        number={number}
        name={name}
        expiry={expiry}
        cvc={cvc}
        focused={focus}
      />

      <form className="flex flex-col gap-3 mt-3 px-5">
        <div className="flex justify-between">
          <div>
            <h3 className="text-[13px]  mb-1  text-font-dark">Número do cartão</h3>
            <input
              className="border rounded-xl  h-10 w-60 border-tertiary-dark px-2  placeholder:text-[14px] focus:outline-none"
              type="tel"
              name="number"
              placeholder="4111, 5555, 3782, 6011"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              onFocus={handleFocus}
            />
          </div>

          <div>
             <h3 className="text-[13px]  mb-1  text-font-dark">Nome</h3>
            <input
              className="border rounded-xl h-10 w-60 border-tertiary-dark px-2 placeholder:text-[14px] focus:outline-none"
              type="text"
              name="name"
              placeholder="Ana Lima B."
              value={name}
              onChange={(e) => setName(e.target.value)}
            onFocus={handleFocus}
            />
          </div>
        </div>

        <div className="flex justify-between">
           <div>
             <h3 className="text-[13px]   mb-1 text-font-dark">Data de Expiração</h3>
            <input
              className="border rounded-xl h-10 w-60 border-tertiary-dark px-2 placeholder:text-[14px] focus:outline-none"
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              onFocus={handleFocus}
            />
          </div>
          <div>
             <h3 className="text-[13px]  mb-1  text-font-dark">CVC</h3>
            <input
              className="border rounded-xl  h-10 w-60 border-tertiary-dark px-2 placeholder:text-[14px] focus:outline-none"
              type="tel"
              name="cvc"
              placeholder="123"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              onFocus={handleFocus}
            />
          </div>
        </div>
        {isCreditCard && (
          <div className=" w-full">
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
            "
          >
            <span>{installment}</span>

             <ChevronDown
                size={20}
                className={`transition-transform duration-300 ${
                isOpen
                ? "rotate-180"
                : ""
                }`}
              />
          </button>

          {isOpen && (
            <div
              className="
                mt-2
                bg-secondary-dark
                rounded-xl
                overflow-hidden
                border
                border-tertiary-dark
                z-10
              "
            >
              <button
                type="button"
                onClick={() => {
                  setInstallment("1x sem juros");
                  setIsOpen(false);
                }}
                className="w-full px-3 py-2 text-left hover:bg-white/20 cursor-pointer"
              >
                1x sem juros
              </button>

              <button
                type="button"
                onClick={() => {
                  setInstallment("2x sem juros");
                  setIsOpen(false);
                }}
                className="w-full px-3 py-2 text-left hover:bg-white/20 cursor-pointer"
              >
                2x sem juros
              </button>
            </div>
          )}
        </div>
        )}
      </form>
    </div>
  );
}