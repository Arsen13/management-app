import { IoIosAddCircle } from "react-icons/io";

export default function AboutProject() {
  return (
    <div className="w-full h-10 px-10 items-center flex justify-between">
      <h2 className="text-2xl">Title</h2>
      <p className="italic">Owner: John Doe</p>
      <div className="flex flex-col items-center">
        <IoIosAddCircle className="w-8 h-8 text-sky-500 cursor-pointer hover:text-sky-800 duration-500" />
        <p className="text-sm italic">New Task</p>
      </div>
    </div>
  );
}
