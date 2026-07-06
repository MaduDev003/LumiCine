import {
  Ticket,
  Armchair,
  Popcorn,
  CreditCard,
  CircleCheckBig,
} from "lucide-react";

type ButtonProps = {
  step: "session" | "seat" | "snack" | "payment" | "confirmation";
};

const steps = [
  { id: "session", Icon: Ticket },
  { id: "seat", Icon: Armchair },
  { id: "snack", Icon: Popcorn },
  { id: "payment", Icon: CreditCard },
  { id: "confirmation", Icon: CircleCheckBig },
];

//TODO: futuramente add o switch case para cor das linhas e dos elementos daqui pq serão 3 estados, ativo, inativo e concluído

export default function CheckoutProgress({ step }: ButtonProps) {
  const activeIndex = steps.findIndex((item) => item.id === step);

  return (
    <div className="flex items-center justify-center">
      {steps.map(({ id, Icon }, index) => {
        const isActive = index <= activeIndex;

        return (
          <div key={id} className="flex items-center">
            <div
              className={`w-7 h-7 rounded-full border flex items-center justify-center ${
                isActive
                  ? "border-accent"
                  : "border-tertiary-dark"
              }`}
            >
              <Icon
                size={16}
                color={isActive ? "#FF5900" : "#7e7c7c"}
              />
            </div>

            {index < steps.length - 1 && (
              <span
                className={`w-12 h-0.5 ${
                  index === activeIndex
                    ? "bg-gray-400"
                    : "bg-secondary-dark"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}