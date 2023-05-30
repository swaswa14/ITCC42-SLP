import Head from "next/head";
import DataTable from "@/components/data_table";
import {useQuery} from "@tanstack/react-query";
import {retrieveMappedData, retrieveProjects} from "@/utils/api-interface";
import Title from "@/components/title";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import SchoolYearAccordion from "@/components/school_year_accordion";
import MappedAccordion from "@/components/mapped_accordion";
import ProjectHeading from "@/components/project_heading";

export default function SamplePage(){
    // const {data,  error, isError, isLoading} = useQuery({
    //     queryKey: ["all_data"],
    //     queryFn: retrieveProjects,
    // });



    return(
        <>
        <Head>
            <title>Trial Page</title>
        </Head>

        <ProjectHeading/>
        <MappedAccordion/>

        </>
    )
}