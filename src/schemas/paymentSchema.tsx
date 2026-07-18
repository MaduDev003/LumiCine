import { z } from "zod";

export const paymentSchema = z.object({
  number: z
    .string()
    .min(16, "Número do cartão inválido"),

  name: z
    .string()
    .min(3, "Informe o nome do cartão"),

  expiry: z
    .string()
    .min(4, "Data inválida"),

  cvc: z
    .string()
    .min(3, "CVC inválido"),

  installment: z
    .string()
    .optional(),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;