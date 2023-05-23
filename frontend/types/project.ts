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

export type ProjectGroupType = {
  [schoolYear: string]: ProjectType[];
};
