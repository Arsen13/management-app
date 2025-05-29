import type { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { z } from "zod";

export interface InputFieldProps<T extends FieldValues> {
  type: string;
  label: string;
  placeholder: string;
  register: UseFormRegister<T>;
  registerKey: Path<T>;
}

export type AuthButtonProps = {
  title: string;
  isSubmitting: boolean;
};

export type LoginFormField = z.infer<typeof LoginSchema>;
export type SignUpFormField = z.infer<typeof SignUpSchema>;

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const SignUpSchema = z
  .object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type TaskT = {
  id: number;
  title: string;
  description: string;
  project: {
    id: number;
  };
  user: {
    id: number;
    firstName: string;
    lastName: string;
  } | null;
  status: string;
  createdAt: string;
  updatedAt: string;
};
