"use client";

import { FormContext } from "@/app/providers";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  schoolYear: z.enum([
    "2015-2016",
    "2016-2017",
    "2017-2018",
    "2018-2019",
    "2019-2020",
    "2020-2021",
    "2021-2022",
    "2022-2023",
    "2023-2024",
  ]),
  leadUnit: z.string(),
  projectTitle: z.string(),
  startDateRemarks: z.string().nullable().optional(),
  startDate: z.date().nullable().optional(),
  endDateRemarks: z.string().nullable().optional(),
  endDate: z.date().nullable().optional(),
  partnerOrFunder: z.string(),
  amountRemarks: z.string().nullable().optional(),
  amount: z.number().nullable().optional(),
  principalProponent: z.string(),
  statusOrRemarks: z.string(),
});

type FormData = z.infer<typeof schema>;

const ProjectForm = () => {
  const { selectedRow } = useContext(FormContext);

  return <form>ProjectForm</form>;
};

export default ProjectForm;
