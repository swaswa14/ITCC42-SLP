import { Balancer } from "react-wrap-balancer";
import NewProjectModal from "@/components/new_project_modal";
import {useState} from "react";
export default function ProjectHeading({ setSelectedRow, setIsOpen, isOpen}){
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

        return (
            <>
                <div style={{display: "flex", justifyContent: "center", textAlign: "center", gap: "1rem", margin: "1rem"}}>
                    <header className=" py-8 space-y-2">
                        <h1 className=" text-3xl md:text-5xl leading-[1.1] tracking-tighter font-bold">
                            SD ISE AND CENTERS
                        </h1>
                        <p className=" text-lg text-slate-700">
                            <Balancer>External Projects accessed in SY 2017-2021</Balancer>
                        </p>


                    </header>
                </div>
                <div style={{display: "flex", justifyContent: "flex-end", width: "100%", paddingRight: "2rem"}}>
                    <button
                        onClick={(event) => {
                            event.preventDefault();
                            handleOpen();
                        }}
                        className="text-md bg-blue-500 text-white rounded-md px-4 py-2 font-medium !mt-6"
                    >

                        Add Project
                    </button>
                    <NewProjectModal open={open} handleClose={handleClose}/>
                </div>
            </>


        );

}