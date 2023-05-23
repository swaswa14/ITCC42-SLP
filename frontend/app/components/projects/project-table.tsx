"use client";

import { ProjectGroupType } from "@/types/project";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "@/app/columns";
import FormDialog from "./form-dialog";
interface Props {
  initialData: ProjectGroupType;
}

const ProjectTable = ({ initialData }: Props) => {
  console.log(initialData);
  return (
    <div className="space-y-8">
      {initialData ? (
        Object.entries(initialData).map(([schoolYear, schoolYearProjects]) => (
          <div key={schoolYear} className=" space-y-1  min-w-full">
            <h1 className="font-bold text-lg">{schoolYear}</h1>
            <DataTable columns={columns} data={schoolYearProjects} />
          </div>
        ))
      ) : (
        <p>No data.</p>
      )}
      <FormDialog />
    </div>
  );
};

export default ProjectTable;
