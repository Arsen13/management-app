import { MdAddBox } from "react-icons/md";
import type { AboutProjectProps } from "../../lib/types";

export default function AboutProject({ setIsOpenModal }: AboutProjectProps) {
  return (
    <div className="w-full h-10 px-10 items-center flex justify-between">
      <h2 className="text-2xl">Title</h2>
      <p className="italic">Owner: John Doe</p>
      <div className="flex flex-col items-center">
        <MdAddBox
          onClick={() => setIsOpenModal(true)}
          className="w-8 h-8 cursor-pointer hover:text-sky-500 duration-500"
        />
        <p className="text-sm italic">New Task</p>
      </div>
    </div>
  );
}
