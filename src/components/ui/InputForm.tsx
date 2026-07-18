import { UseFormRegister } from "react-hook-form";
import { PaymentFormData } from "@/src/schemas/paymentSchema";

interface Props {
  label: string;
  name: keyof PaymentFormData;
  type: string;
  placeholder: string;
  register: UseFormRegister<PaymentFormData>;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function InputForm({
  label,
  name,
  type,
  placeholder,
  register,
  onFocus,
}: Props) {
  return (
    <div>
      <h3 className="text-[13px] mb-1 text-font-dark">
        {label}
      </h3>

      <input
        className="
          border 
          rounded-xl 
          h-10 
          w-60 
          border-tertiary-dark 
          px-2 
          placeholder:text-[14px] 
          focus:outline-none
        "
        type={type}
        placeholder={placeholder}
        onFocus={onFocus}
        {...register(name)}
      />
    </div>
  );
}