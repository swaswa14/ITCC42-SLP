export type ProjectType = {
  id: number;
  schoolYear: string;
  leadUnit: string;
  projectTitle: string;
  startDateRemarks: string;
  startDate: string;
  endDateRemarks: string;
  endDate: string;
  partnerOrFunder: string;
  amountRemarks: string;
  amount: number;
  principalProponent: string;
  statusOrRemarks: string;
};

export type ProjectTypePost = {
  schoolYear: string;
  leadUnit: string;
  projectTitle: string;
  startDateRemarks?: string | null | undefined;
  startDate?: string | null | undefined;
  endDateRemarks?: string | null | undefined;
  endDate?: string | null | undefined;
  partnerOrFunder: string;
  amountRemarks?: string | null | undefined;
  amount?: number | null | undefined;
  principalProponent: string;
  statusOrRemarks: string;
};

export type ProjectGroupType = {
  [schoolYear: string]: ProjectType[];
};
