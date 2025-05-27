import { Link, useLocation } from "react-router-dom";
import UserInfo from "./UserInfo";

export default function Navbar() {
  const location = useLocation();

  return (
    <div className="bg-[var(--widjet)] h-16 flex justify-between items-center px-12 border-b border-b-gray-500 shadow-sm shadow-gray-500">
      <div>
        <h1 className="text-2xl">
          Management <span className="text-sky-500">App</span>
        </h1>
      </div>

      <div className="flex gap-14 text-xl">
        {location.pathname !== "/" && (
          <Link to="/" className="hover:text-sky-500 duration-300">
            Home
          </Link>
        )}
      </div>

      <UserInfo />
    </div>
  );
}
