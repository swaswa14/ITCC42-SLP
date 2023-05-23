import { z } from "zod";
import { dateOrNull } from "./utils";

export const schema = z.object({
  schoolYear: z.enum(["2017-2018", "2018-2019", "2019-2020", "2020-2021"]),
  leadUnit: z.string().nonempty(),
  projectTitle: z.string().nonempty(),
  startDateRemarks: z.string().nullable().optional(),
  startDate: dateOrNull.nullable().optional(),

  endDateRemarks: z.string().nullable().optional(),
  endDate: dateOrNull.nullable().optional(),
  partnerOrFunder: z.string().nonempty(),
  amountRemarks: z.string().nullable().optional(),
  amount: z.coerce.number().nullable().optional(),
  principalProponent: z.string().nonempty(),
  statusOrRemarks: z.string().nonempty(),
});
