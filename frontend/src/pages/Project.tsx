import Navbar from "../components/navbar/Navbar";
import AboutProject from "../components/project/AboutProject";
import Tasks from "../components/project/Tasks";

export default function Project() {
  return (
    <div>
      <Navbar />

      <div className="w-full gap-5 flex flex-col justify-between mt-3.5">
        <AboutProject />
        <Tasks />
      </div>
    </div>
  );
}
