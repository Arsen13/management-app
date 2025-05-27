import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { Link } from "react-router-dom";

export default function Project() {
  return (
    <div className="w-md h-50 flex flex-col bg-[var(--widjet)] gap-2.5 rounded-2xl">
      <h2 className="text-center text-3xl mt-1">Title</h2>
      <p className="h-2/4 mx-4 italic text-[var(--text-gray)]">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer.
      </p>
      <div className="flex justify-between mr-4">
        <p className="ml-4 italic text-[var(--text-gray)]">21/05/25</p>
        <Link to="" className="hover:underline">
          Details
        </Link>
        <div className="flex gap-2">
          <RxUpdate className="w-5 h-5 cursor-pointer duration-300 hover:text-yellow-600" />
          <MdDelete className="w-5 h-5 cursor-pointer duration-300 hover:text-red-600" />
        </div>
      </div>
    </div>
  );
}
