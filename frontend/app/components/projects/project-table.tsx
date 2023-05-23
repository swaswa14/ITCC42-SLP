"use client";

import { ProjectGroupType, ProjectType } from "@/types/project";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "@/app/columns";

interface Props {
  initialData: ProjectGroupType;
}

const ProjectTable = ({ initialData }: Props) => {
  return (
    <div className="space-y-8">
      {Object.entries(initialData).map(([schoolYear, schoolYearProjects]) => (
        <div key={schoolYear} className=" space-y-1  min-w-full">
          <h1 className="font-bold text-lg">{schoolYear}</h1>
          <DataTable columns={columns} data={schoolYearProjects} />
        </div>
      ))}
    </div>
  );
};

export default ProjectTable;
