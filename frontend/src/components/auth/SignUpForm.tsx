import { Link } from "react-router-dom";
import AuthButton from "./AuthButton";
import InputField from "./InputField";
import { useForm, type SubmitHandler } from "react-hook-form";
import { SignUpSchema, type SignUpFormField } from "../../lib/types";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormField>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormField> = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-72 mt-4">
      <InputField
        type="text"
        label="First Name"
        placeholder="John"
        register={register}
        registerKey="firstName"
      />
      {errors.firstName && (
        <div className="w-2xl text-red-400">{errors.firstName.message}</div>
      )}

      <InputField
        type="text"
        label="Last Name"
        placeholder="Doe"
        register={register}
        registerKey="lastName"
      />
      {errors.lastName && (
        <div className="w-2xl text-red-400">{errors.lastName.message}</div>
      )}

      <InputField
        type="text"
        label="Email"
        placeholder="johndoe@gmail.com"
        register={register}
        registerKey="email"
      />
      {errors.email && (
        <div className="w-2xl text-red-400">{errors.email.message}</div>
      )}

      <InputField
        type="password"
        label="Password"
        placeholder="qwerty"
        register={register}
        registerKey="password"
      />
      {errors.password && (
        <div className="w-2xl text-red-400">{errors.password.message}</div>
      )}

      <InputField
        type="password"
        label="Confirm password"
        placeholder="qwerty"
        register={register}
        registerKey="confirmPassword"
      />
      {errors.confirmPassword && (
        <div className="w-2xl text-red-400">
          {errors.confirmPassword.message}
        </div>
      )}

      <div className="flex flex-col my-2">
        <Link to="/login" className="hover:underline">
          Already have an account?
        </Link>

        <AuthButton title={"Sign Up"} isSubmitting={isSubmitting} />
      </div>
    </form>
  );
}
