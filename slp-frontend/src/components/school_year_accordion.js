import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import Title from "@/components/title";
import DataTable from "@/components/data_table";
import {useState} from "react";

export default function SchoolYearAccordion({data, title}){
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return(
        <Accordion defaultExpanded={true}>
            <AccordionSummary
                expandIcon={<ExpandMoreRoundedIcon />}
                aria-controls={`${title}-content`}
                id={`${title}-header`}
            >
                <Title>{title}</Title>
            </AccordionSummary>
            <AccordionDetails>
                <DataTable  data={data}/>
            </AccordionDetails>
        </Accordion>
    );
}