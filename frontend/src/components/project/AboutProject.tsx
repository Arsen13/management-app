import { MdAddBox } from "react-icons/md";
import type { AboutProjectProps, ProjectInfoT } from "../../lib/types";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { findOne } from "../../api/project.api";

export default function AboutProject({ setIsOpenModal }: AboutProjectProps) {
  const { projectId } = useParams();
  const [projectInfo, setProjectInfo] = useState<ProjectInfoT | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      const data = await findOne(String(projectId));
      setProjectInfo(data);
    };

    fetchProject();
  }, []);

  console.log(projectInfo);

  return (
    <div className="w-full h-10 px-10 items-center flex justify-between">
      <h2 className="text-2xl">{projectInfo?.title}</h2>
      <p className="italic">
        Owner: {`${projectInfo?.user.firstName} ${projectInfo?.user.lastName}`}
      </p>
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
