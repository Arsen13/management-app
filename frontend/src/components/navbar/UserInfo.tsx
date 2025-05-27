import { FaRegCircleUser } from "react-icons/fa6";
import LogoutBtn from "./LogoutBtn";

export default function UserInfo() {
  return (
    <div className="flex items-center gap-8 text-white">
      <FaRegCircleUser className="h-7 w-7 text-white" />

      <div className="flex flex-col gap-1">
        <p className="text-sm">John Doe</p>
        <p className="text-xs">johndoe@gmail.com</p>
      </div>

      <LogoutBtn />
    </div>
  );
}
