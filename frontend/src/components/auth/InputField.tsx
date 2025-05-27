import type { FieldValues } from "react-hook-form";
import type { InputFieldProps } from "../../lib/types";

export default function InputField<T extends FieldValues>({
  type,
  label,
  placeholder,
  register,
  registerKey,
}: InputFieldProps<T>) {
  return (
    <div className="flex flex-col my-2">
      <label>
        <span>{label}</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="h-8 border border-amber-100 rounded-md text-sm italic pl-2"
        {...register(registerKey)}
      />
    </div>
  );
}
