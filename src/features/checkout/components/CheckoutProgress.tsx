import {
  Ticket,
  Armchair,
  Popcorn,
  CreditCard,
  CircleCheckBig,
} from "lucide-react";
import { Checkout } from "@/src/types/CheckoutType";

type Props = {
  type: Checkout;
};

const types = [
  { id: "session", Icon: Ticket },
  { id: "seats", Icon: Armchair },
  { id: "lumiBar", Icon: Popcorn },
  { id: "payment", Icon: CreditCard },
  { id: "concluded", Icon: CircleCheckBig },
];

export default function CheckoutProgress({type}: Props) {
  const activeIndex = types.findIndex((item) => item.id === type);

  function getProgressStateColors(index: number) {
    const isActive = index === activeIndex;
    const isStepConcluded = index < activeIndex;
    const isInactive = index > activeIndex;
    const finalStep =  types[types.length - 1].id;

    if (isStepConcluded || finalStep === type) {
        return {
          container: "border-[#28A745]",
          icon: "#28A745",
          bar: "bg-[#28A745]",
        };
    }

    if(isActive) {
      return {
        container: "border-font-secondary-dark",
        icon: "#adadad",
        bar: "bg-font-secondary-dark"
      }
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