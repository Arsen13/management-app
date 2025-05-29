import { MdAddBox } from "react-icons/md";
import ProjectList from "../components/home/ProjectList";
import Navbar from "../components/navbar/Navbar";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="mt-10 flex flex-col justify-center gap-7 relative">
        <h1 className="text-center text-4xl">Projects</h1>
        <MdAddBox
          title="Create a project"
          className="w-12 h-12 absolute top-0 right-3 hover:text-sky-500 duration-500"
        />
        <ProjectList />
      </div>
    </div>
  );
}

export default Home;
