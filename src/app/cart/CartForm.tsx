import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email().optional().or(z.literal('')),
  deliveryArea: z.enum(['insideDhaka', 'outsideDhaka']),
  address: z.string().min(1, { message: "Address is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  thana: z.string().optional(),
  district: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.deliveryArea === 'outsideDhaka') {
    if (!data.thana) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Thana is required",
        path: ["thana"],
      });
    }
    if (!data.district) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "District is required",
        path: ["district"],
      });
    }
  }
});

export function useCartForm() {
  return useForm({
    resolver: zodResolver(schema),
    defaultValues: { deliveryArea: 'insideDhaka' },
    mode: 'onTouched',
  });
}

export { schema };
