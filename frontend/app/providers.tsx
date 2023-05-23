"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React, { FC, ReactNode, useState, createContext } from "react";
import { ProjectType } from "@/types/project";

interface Props {
  children: ReactNode;
}

interface FormContextType {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedRow: ProjectType | null;
  setSelectedRow: (value: ProjectType | null) => void;
}

export const FormContext = createContext<FormContextType>({
  isOpen: false,
  setIsOpen: () => {},
  selectedRow: null,
  setSelectedRow: () => {},
});

export const FormProvider: FC<Props> = ({ children }) => {
  const [selectedRow, setSelectedRow] = useState<ProjectType | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const data = {
    isOpen: isOpen,
    setIsOpen: setIsOpen,
    selectedRow: selectedRow,
    setSelectedRow: setSelectedRow,
  };
  return <FormContext.Provider value={data}>{children}</FormContext.Provider>;
};

const Providers: FC<Props> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <FormProvider>{children}</FormProvider>
    </QueryClientProvider>
  );
};

export default Providers;
