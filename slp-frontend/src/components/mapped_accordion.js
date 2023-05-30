import {Box} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {retrieveMappedData} from "@/utils/api-interface";
import SchoolYearAccordion from "@/components/school_year_accordion";

export default function MappedAccordion({ initialData }){

    const {data,  error, isError, isLoading} = useQuery({
        queryKey: ["all_mapped_data"],
        queryFn: retrieveMappedData,
        initialData: initialData
    });

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        console.error(error);
        return <span>Error: {error.message}</span>;
    }


    const all = data?.all;
    return(
        <Box style={{display: "flex", flexDirection: "column", padding: "1rem", margin: "1rem", gap: "2rem"}}>
            {all.map((item, index) =>{
                return(
                    <div key={index}>
                        <SchoolYearAccordion data={item?.projects} title={item.schoolYear}/>
                    </div>

                )
            })}
        </Box>
    )
}

MappedAccordion.getInitialProps = async () => {
    try {
        const initialData = await retrieveMappedData();
        return { initialData };
    } catch (error) {
        console.error(error);
        return { initialData: null };
    }
};