import React, { useContext, useState } from "react";
import { Dialog } from "@headlessui/react";
import { FormContext } from "@/app/providers";
import ProjectForm from "./project-form";

const FormDialog = () => {
  const { isOpen, setIsOpen } = useContext(FormContext);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
          <ProjectForm />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default FormDialog;
