import { Link, useNavigate } from "react-router-dom";
import AuthButton from "./AuthButton";
import InputField from "./InputField";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type LoginFormField } from "../../lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../lib/schemas";
import { login } from "../../api/auth";
import { useUser } from "../../context/UserContext";

export default function LoginForm() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormField>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormField> = async (data) => {
    const result = await login(data);

    if (result) {
      setUser(result);
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        type="text"
        label="Email"
        placeholder="johndoe@gmail.com"
        register={register}
        registerKey="email"
      />
      {errors.email && (
        <div className="text-red-400">{errors.email.message}</div>
      )}

      <InputField
        type="password"
        label="Password"
        placeholder="qwerty"
        register={register}
        registerKey="password"
      />
      {errors.password && (
        <div className="text-red-400">{errors.password.message}</div>
      )}

      <div className="my-2 flex flex-col">
        <Link to="/signup" className="hover:underline">
          Don&apos;t have an account?
        </Link>

        <AuthButton title={"Login"} isSubmitting={isSubmitting} />
      </div>
    </form>
  );
}
