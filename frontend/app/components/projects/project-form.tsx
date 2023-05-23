"use client";

import { FormContext } from "@/app/providers";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextareaAutosize from "react-textarea-autosize";
import { formatDate } from "@/lib/utils";
import { schema } from "@/lib/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewProject, updateProject } from "@/lib/axiosApi";

type FormData = z.infer<typeof schema>;

const ProjectForm = () => {
  const { selectedRow } = useContext(FormContext);
  const queryClient = useQueryClient();
  const { isOpen, setIsOpen } = useContext(FormContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      schoolYear:
        selectedRow === null
          ? "2015-2016"
          : (selectedRow.schoolYear as
              | "2015-2016"
              | "2016-2017"
              | "2017-2018"
              | "2018-2019"
              | "2019-2020"
              | "2020-2021"
              | "2021-2022"
              | "2022-2023"
              | "2023-2024"
              | undefined),
      leadUnit: selectedRow === null ? "" : selectedRow.leadUnit,
      projectTitle: selectedRow === null ? "" : selectedRow.projectTitle,
      startDate: selectedRow ? (selectedRow.startDate as any) : undefined,
      endDate: selectedRow ? (selectedRow.endDate as any) : undefined,
      startDateRemarks:
        selectedRow === null ? "" : selectedRow.startDateRemarks,
      endDateRemarks: selectedRow === null ? "" : selectedRow.endDateRemarks,
      partnerOrFunder: selectedRow === null ? "" : selectedRow.partnerOrFunder,
      amount: selectedRow === null ? 0 : selectedRow.amount,
      amountRemarks: selectedRow === null ? "" : selectedRow.amountRemarks,
      principalProponent:
        selectedRow === null ? "" : selectedRow.principalProponent,
      statusOrRemarks: selectedRow === null ? "" : selectedRow.statusOrRemarks,
    },
  });

  // new project mutation
  const addProjectMutation = useMutation({
    mutationFn: addNewProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  // update project mutation
  const updateProjectMutation = useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  //   submit function
  const onSubmit = (data: FormData) => {
    const formattedData = {
      ...data,
      id: selectedRow?.id,
      endDate: data.endDate && formatDate(data.endDate),
      startDate: data.startDate && formatDate(data.startDate),
    };
    console.log(formattedData);

    if (!selectedRow) {
      addProjectMutation.mutate(formattedData);
      setIsOpen(!isOpen);
      reset();
    } else {
      updateProjectMutation.mutate(formattedData);
      setIsOpen(!isOpen);
      reset();
    }
  };

  const schoolYearOptions = [
    "2017-2018",
    "2018-2019",
    "2019-2020",
    "2020-2021",
  ];

  //   classes
  const inputGroupClx = "flex flex-col gap-1";
  return (
    <form className="project-form space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <div className=" flex gap-4">
        <section className={`${inputGroupClx} w-1/2`}>
          <label htmlFor="schoolYear">School Year</label>
          <select {...register("schoolYear")} id="schoolYear">
            {schoolYearOptions.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
          {errors.schoolYear && <p>{errors.schoolYear.message}</p>}
        </section>
        <section className={`${inputGroupClx} w-1/2`}>
          <label htmlFor="leadUnit">Lead Unit</label>
          <input {...register("leadUnit")} id="leadUnit" />
          {errors.leadUnit && <p>{errors.leadUnit.message}</p>}
        </section>
      </div>
      <section className={inputGroupClx}>
        <label htmlFor="projectTitle">Project Title</label>
        <TextareaAutosize
          minRows={3}
          {...register("projectTitle")}
          id="projectTitle"
        />
        {errors.projectTitle && <p>{errors.projectTitle.message}</p>}
      </section>

      <hr />
      {/* START DATE AND END DATE */}
      <div className=" flex gap-4 py-8">
        {/* start date */}
        <div className="w-1/2 space-y-6">
          <section className={inputGroupClx}>
            <label htmlFor="startDate">Start Date</label>
            <input type="date" {...register("startDate")} id="startDate" />
            {errors.startDate && <p>{errors.startDate.message}</p>}
          </section>
          <section className={inputGroupClx}>
            <input
              {...register("startDateRemarks")}
              id="startDateRemarks"
              placeholder="Remarks"
            />
            {errors.startDateRemarks && (
              <p>{errors.startDateRemarks.message}</p>
            )}
          </section>
        </div>
        {/* end date */}
        <div className="w-1/2 space-y-6">
          <section className={inputGroupClx}>
            <label htmlFor="endDate">End Date</label>
            <input type="date" {...register("endDate")} id="endDate" />
            {errors.endDate && <p>{errors.endDate.message}</p>}
          </section>
          <section className={inputGroupClx}>
            <input
              {...register("endDateRemarks")}
              id="endDateRemarks"
              placeholder="Remarks"
            />
            {errors.endDateRemarks && <p>{errors.endDateRemarks.message}</p>}
          </section>
        </div>
      </div>

      <hr />
      <section className={inputGroupClx}>
        <label htmlFor="partnerOrFunder">Partner/Funder</label>
        <TextareaAutosize
          minRows={3}
          {...register("partnerOrFunder")}
          id="partnerOrFunder"
        />
        {errors.partnerOrFunder && <p>{errors.partnerOrFunder.message}</p>}
      </section>
      <div className=" flex gap-4 py-8">
        <div className="w-1/2 space-y-6">
          <section className={inputGroupClx}>
            <label htmlFor="amount">Amount</label>
            <input type="number" {...register("amount")} id="amount" />
            {errors.amount && <p>{errors.amount.message}</p>}
          </section>
          <section className={inputGroupClx}>
            <label htmlFor="amountRemarks">Amount Remarks</label>
            <input {...register("amountRemarks")} id="amountRemarks" />
            {errors.amountRemarks && <p>{errors.amountRemarks.message}</p>}
          </section>
        </div>
        <div className="w-1/2 space-y-6">
          <section className={inputGroupClx}>
            <label htmlFor="principalProponent">Principal Proponent</label>
            <input
              {...register("principalProponent")}
              id="principalProponent"
            />
            {errors.principalProponent && (
              <p>{errors.principalProponent.message}</p>
            )}
          </section>
          <section className={inputGroupClx}>
            <label htmlFor="statusOrRemarks">Status/Remarks</label>
            <input {...register("statusOrRemarks")} id="statusOrRemarks" />
            {errors.statusOrRemarks && <p>{errors.statusOrRemarks.message}</p>}
          </section>
        </div>
      </div>
      <button
        type="submit"
        className="  px-4 py-2 bg-slate-900 text-white rounded-md w-1/2"
      >
        Submit
      </button>
    </form>
  );
};

export default ProjectForm;
