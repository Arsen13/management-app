import ProjectList from "../components/home/ProjectList";
import Navbar from "../components/navbar/Navbar";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="mt-10 flex flex-col justify-center gap-7">
        <h1 className="text-center text-4xl">Projects</h1>
        <ProjectList />
      </div>
    </div>
  );
}

export default Home;
