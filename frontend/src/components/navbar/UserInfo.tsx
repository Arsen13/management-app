import { FaRegCircleUser } from "react-icons/fa6";
import LogoutBtn from "./LogoutBtn";
import { useUser } from "../../context/UserContext";

export default function UserInfo() {
  const { user } = useUser();

  return (
    <div className="flex items-center gap-8 text-white">
      <FaRegCircleUser className="h-7 w-7 text-white" />

      <div className="flex flex-col gap-1">
        <p className="text-sm">{`${user?.firstName} ${user?.lastName}`}</p>
        <p className="text-xs">{user?.email}</p>
      </div>

      <LogoutBtn />
    </div>
  );
}
