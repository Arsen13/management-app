import { CiLogout } from "react-icons/ci";
import { removeToken } from "../../lib/localStorage.helper";
import { useNavigate } from "react-router-dom";

export default function LogoutBtn() {
  const navigate = useNavigate();
  return (
    <CiLogout
      onClick={() => {
        removeToken("token");
        navigate("/login");
      }}
      className="w-8 h-8 hover:text-red-500 text-white duration-300 cursor-pointer"
    />
  );
}
