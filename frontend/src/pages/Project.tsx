import { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import AboutProject from "../components/project/AboutProject";
import Tasks from "../components/project/Tasks";
import CreateTaskModal from "../components/modals/CreateTaskModal";

export default function Project() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <>
      <div>
        <Navbar />

        <div className="w-full gap-5 flex flex-col justify-between mt-3.5">
          <AboutProject setIsOpenModal={setIsOpenModal} />
          <Tasks />
        </div>
      </div>
      {isOpenModal && <CreateTaskModal setIsOpenModal={setIsOpenModal} />}
    </>
  );
}
