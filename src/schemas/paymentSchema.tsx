import { z } from "zod";

export const paymentSchema = z.object({
  number: z
    .string()
    .min(1, "Informe o número do cartão")
    .regex(/^\d+$/, "O cartão deve conter apenas números")
    .length(16, "O cartão deve conter 16 dígitos"),

  name: z
    .string()
    .min(3, "Informe o nome do cartão")
    .regex(
      /^[a-zA-ZÀ-ÿ\s]+$/,
      "O nome deve conter apenas letras"
    ),

  expiry: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\d{2}$/,
      "Informe uma data válida"
    ),

  cvc: z
    .string()
    .min(1, "Informe o CVC")
    .regex(/^\d+$/, "O CVC deve conter apenas números")
    .length(3, "O CVC deve conter 3 dígitos"),

  installment: z
    .string()
    .optional(),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;