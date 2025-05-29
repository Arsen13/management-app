import ProjectItem from "./ProjectItem";

export default function ProjectList() {
  return (
    <div className="flex flex-wrap gap-5 items-center justify-center">
      <ProjectItem />
      <ProjectItem />
      <ProjectItem />
      <ProjectItem />
      <ProjectItem />
      <ProjectItem />
    </div>
  );
}
