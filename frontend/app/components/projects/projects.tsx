import React from "react";
import ProjectHeading from "./project-heading";
import { getAllProjects } from "@/lib/axiosApi";
import ProjectTable from "./project-table";

const Projects = async () => {
  const initialData = await getAllProjects();
  return (
    <div className="container max-w-7xl mx-auto px-4 md:px-8">
      <ProjectHeading />
      <ProjectTable initialData={initialData} />
    </div>
  );
};

export default Projects;
