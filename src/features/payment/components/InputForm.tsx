import { UseFormRegister, FieldErrors } from "react-hook-form";
import { PaymentFormData } from "@/src/schemas/paymentSchema";

interface Props {
  label: string;
  name: keyof PaymentFormData;
  type: string;
  placeholder: string;
  register: UseFormRegister<PaymentFormData>;
  errors: FieldErrors<PaymentFormData>;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function InputForm({
  label,
  name,
  type,
  placeholder,
  register,
  errors,
  onFocus,
}: Props) {
  return (
    <div>
      <h3 className="text-[13px] mb-1 text-font-dark ">
        {label}
      </h3>

      <input
        className="
          border
          rounded-xl
          h-10
         w-full md:w-60
          border-tertiary-dark
          px-2
          placeholder:text-[14px]
          focus:outline-none
          focus:border-accent
          
        "
        type={type}
        placeholder={placeholder}
        onFocus={onFocus}
        {...register(name)}
      />

      {errors[name] && (
          <>
            {errors[name] && (
              <span
                className="
                  mt-1
                  flex
                  items-center
                  gap-1
                  text-[13px]
                  text-red-400
                  animate-in
                  fade-in
                  slide-in-from-top-1
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                {errors[name]?.message}
              </span>
            )}
          </>
      )}
    </div>
  );
}