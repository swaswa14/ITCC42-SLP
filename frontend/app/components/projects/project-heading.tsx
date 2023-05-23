"use client";

import { FormContext } from "@/app/providers";
import React, { useContext } from "react";
import { Balancer } from "react-wrap-balancer";

const ProjectHeading = () => {
  const { setSelectedRow, setIsOpen, isOpen } = useContext(FormContext);
  return (
    <header className=" py-8 space-y-2">
      <h1 className=" text-3xl md:text-5xl leading-[1.1] tracking-tighter font-bold">
        SD ISE AND CENTERS
      </h1>
      <p className=" text-lg text-slate-700">
        <Balancer>External Projects accessed in SY 2017-2021</Balancer>
      </p>
      <button
        onClick={() => {
          setSelectedRow(null);
          setIsOpen(!isOpen);
        }}
        className="text-md bg-blue-500 text-white rounded-md px-4 py-2 font-medium !mt-6"
      >
        Add Project
      </button>
    </header>
  );
};

export default ProjectHeading;
