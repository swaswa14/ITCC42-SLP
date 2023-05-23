"use client";

import { ProjectType } from "@/types/project";
import { ColumnDef } from "@tanstack/react-table";
import { useContext } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { FormContext } from "./providers";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Balancer } from "react-wrap-balancer";
import { deleteProject } from "@/lib/axiosApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const columns: ColumnDef<ProjectType>[] = [
  {
    accessorKey: "leadUnit",
    header: "Lead Unit",
  },
  {
    accessorKey: "id",
    header: "No.",
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
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
      const queryClient = useQueryClient();
      const deleteMutation = useMutation({
        mutationFn: deleteProject,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
      });
      const [isOpen, setIsOpen] = useState(false);
      const project = row.original;
      return (
        <div className=" ">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex gap-2 items-center border-rose-500 text-rose-500 border px-4 py-2 rounded-md"
          >
            <FaTrash />
            Delete
          </button>
          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-50"
          >
            <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-12 space-y-8">
                <h1 className=" text-xl font-bold">
                  <Balancer>Are you sure you want to delete this?</Balancer>
                </h1>

                <div className=" flex justify-center gap-8">
                  <button
                    onClick={() => {
                      deleteMutation.mutate(project.id);
                      setIsOpen(!isOpen);
                    }}
                    className="border px-4 py-2 text-sm font-medium rounded-md border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white  transition-all duration-300 ease-in-out"
                  >
                    Yes, Delete.
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="border px-4 py-2 text-sm font-medium rounded-md border-slate-900 transition-all hover:bg-slate-900 hover:text-white duration-300 ease-in-out"
                  >
                    No, Cancel.
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        </div>
      );
    },
  },
];
