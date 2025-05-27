import type { AuthButtonProps } from "../../lib/types";

export default function AuthButton({ title, isSubmitting }: AuthButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="mt-3 cursor-pointer rounded-md border border-amber-100 px-6 py-2 hover:bg-amber-200 hover:text-gray-800 hover:duration-700"
    >
      {isSubmitting ? "Loading..." : title}
    </button>
  );
}
