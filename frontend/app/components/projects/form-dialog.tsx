import React, { useContext } from "react";
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
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto px-12 py-12 w-full h-full overflow-auto sm:h-5/6 sm:w-5/6 rounded bg-white max-w-5xl">
          <ProjectForm />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default FormDialog;
