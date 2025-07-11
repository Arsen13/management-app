import LoginForm from "../components/auth/LoginForm";

export default function Login() {
  return (
    <>
      <div className="flex bg-widget backdrop-blur-md mx-auto mt-36 border p-6 border-amber-100 rounded-md max-w-lg flex-col items-center justify-center">
        <div className="flex items-center justify-center text-center">
          <h1 className="text-2xl">Login</h1>
        </div>
        <LoginForm />
      </div>
    </>
  );
}
