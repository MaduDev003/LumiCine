import {
  Ticket,
  Armchair,
  Popcorn,
  CreditCard,
  CircleCheckBig,
} from "lucide-react";
import { CheckoutType } from "@/src/types/checkoutType";

type Props = {
  type: CheckoutType;
};

const types = [
  { id: "session", Icon: Ticket },
  { id: "seats", Icon: Armchair },
  { id: "snack", Icon: Popcorn },
  { id: "payment", Icon: CreditCard },
  { id: "confirmation", Icon: CircleCheckBig },
];

export default function CheckoutProgress({type}: Props) {
  const activeIndex = types.findIndex((item) => item.id === type);

  function getProgressStateColors(index: number) {
    const isActive = index === activeIndex;
    const isConcluded = index < activeIndex;
    const isInactive = index > activeIndex;

    if(isActive) {
      return {
       container: "border-accent",
      icon: "#FF5900",
      bar: "bg-gray-400"
      }
    }
   if (isConcluded) {
        return {
          container: "border-[#BE5015]",
          icon: "#BE5015",
          bar: "bg-[#BE5015]",
        };
    }
    if(isInactive) {
      return {
        container:"border-secondary-dark", 
        icon:"#7e7c7c", 
        bar:"bg-secondary-dark" 
      }
    }
  }
  return (
    <div className="flex items-center justify-center mb-8">
      {types.map(({ id, Icon }, index) => {
        const colors = getProgressStateColors(index);
        return (
          <div key={id} className="flex items-center">
            <div
              className={`w-7 h-7 rounded-full border flex items-center justify-center ${
               colors?.container
              }`}
            >
              <Icon
                size={16}
                color={colors?.icon}
              />
            </div>

            {index < types.length - 1 && (
              <span
                className={`w-12 h-0.5 ${
                  colors?.bar
                }`}
              />
            )}
          </div>
        );
      })}
     
    </div>
  );
}