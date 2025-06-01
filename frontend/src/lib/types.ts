import type { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { z } from "zod";
import type { CreateUpdateSchema, LoginSchema, SignUpSchema } from "./schemas";

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

export type CreateUpdateModalFields = z.infer<typeof CreateUpdateSchema>;

export type ProjectT = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateProjectModalProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  project: ProjectT;
};

export type UpdateProjectT = Pick<ProjectT, "title" | "description" | "id">;
