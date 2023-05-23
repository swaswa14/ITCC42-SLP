"use client";

import { ProjectType } from "@/types/project";
import { ColumnDef } from "@tanstack/react-table";
import { useContext } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { FormContext } from "./providers";

export const columns: ColumnDef<ProjectType>[] = [
  {
    accessorKey: "leadUnit",
    header: "Lead Unit",
  },

  // change later to index
  {
    accessorKey: "id",
    header: "No.",
  },

  {
    accessorKey: "projectTitle",
    header: "Project Title",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
  },
  {
    accessorKey: "endDate",
    header: "End Date",
  },
  {
    accessorKey: "partnerOrFunder",
    header: "Partner/Funder",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "principalProponent",
    header: "Principal Proponent",
  },
  {
    accessorKey: "statusOrRemarks",
    header: "Status/Remarks",
  },
  {
    id: "edit",
    cell: ({ row }) => {
      const project = row.original;
      const { isOpen, setIsOpen, selectedRow, setSelectedRow } =
        useContext(FormContext);

      return (
        <div className=" ">
          <button
            className="flex gap-2 items-center bg-slate-900 text-white px-4 py-2 rounded-md"
            onClick={() => {
              setSelectedRow(project);
              setIsOpen(!isOpen);
            }}
          >
            <FaEdit />
            Edit
          </button>
        </div>
      );
    },
  },
  {
    id: "delete",
    cell: ({ row }) => {
      const project = row.original;
      return (
        <div className=" ">
          <button className="flex gap-2 items-center border-rose-500 text-rose-500 border px-4 py-2 rounded-md">
            <FaTrash />
            Delete
          </button>
        </div>
      );
    },
  },
];
