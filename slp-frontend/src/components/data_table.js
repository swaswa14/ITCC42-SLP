import {DataGrid} from "@mui/x-data-grid";
import Title from "@/components/title";
import {Accordion, AccordionDetails, AccordionSummary, Box, Chip, IconButton, Tooltip, Typography} from "@mui/material";
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import ListModal from "@/components/list_modal";
import {useState} from "react";
import PropTypes from "prop-types";
import ListRemarks from "@/components/list_remarks";


function FieldBox({children}){
    return(
        <Box style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            {children}
        </Box>
    );
}

function FieldButton({data, single}){
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    return(
        <>
            <Tooltip title={"Remarks"}>
                <IconButton aria-label="open" size="small" onClick={handleClick}>
                    <FormatListBulletedRoundedIcon fontSize="small" />
                </IconButton>
            </Tooltip>

            <ListModal list={data} anchorEl={anchorEl} single={single}/>

        </>

    )
}



const allProjectsColumnDef = [
    { field: "leadUnit", headerName: "Lead Unit", width: 200 ,
        renderCell: (params) => (
            <div style={{ whiteSpace: 'normal' }}>
                {params.value}
            </div>
        )},
    { field: "number", headerName: "No.", width: 100 ,
        renderCell: (params) => (
            <div style={{ whiteSpace: 'normal' }}>
                {params.value}
            </div>
        )},
    { field: "title", headerName: "Project Title", width: 200 ,
        renderCell: (params) => (
            <div style={{ whiteSpace: 'normal' }}>
                {params.value}
            </div>
        )},

    {
        field: "startDate",
        headerName: "Start Date",
        width: 150,
        renderCell: (params) => (
          <FieldBox>
               <span
                   className={"font-semi-bold px-2 py-1 rounded text-xs bg-emerald-100 text-emerald-700"}>
                   {params.value.date}
               </span>
            <FieldButton
                data={null}
                single={params.value.remarks}

            />
          </FieldBox>
        ),

    },
    {
        field: "endDate",
        headerName: "End Date",
        width: 150,
        renderCell: (params) => (
            <FieldBox>
               <span
                   className={"font-semi-bold px-2 py-1 rounded text-xs bg-emerald-100 text-emerald-700"}>
                   {params.value.date}
               </span>
                <FieldButton
                    data={null}
                    single={params.value.remarks}

                />
            </FieldBox>
        ),

    },
    {
        field: "partnersOrFunders",
        headerName: "Partners/Funders",
        width: 300,
        renderCell: (params) => (
            <>
                {params.value.map((item, index) => (
                    <div key={index} style={{ margin: "2px", gap: "2px", whiteSpace: "normal" }}>
                        <Chip
                label={item}
                style={{ backgroundColor: "#e5f3f3", color: "#037971" }}/>

                    </div>
                ))}
            </>



        ),

    },
    {
        field: "projectAmount",
        headerName: "Amount",
        width: 150,
        renderCell: (params) => (


            <FieldBox>
               <span
                   className={"font-semi-bold px-2 py-1 rounded text-xs bg-emerald-100 text-emerald-700"}>
                   {params.value.amount}
               </span>
                <FieldButton
                    data={params.value.remarks}
                    single={null}

                />
            </FieldBox>
        ),

    },

    {
        field: "principalProponent",
        headerName: "Principal Proponent",
        width: 200,
        renderCell: (params) => (

            <>
                {params.value.map((item, index) => (

                        <Chip
                            label={<Typography variant={"body2"}>{item}</Typography>}
                            style={{ backgroundColor: "#e5f3f3", color: "#037971", whiteSpace: "normal"}}
                            size={"small"}
                            key={index}
                        />


                ))}
            </>



        ),
    },
    { field: "status", headerName: "Status", width: 150 ,
        renderCell: (params) => (
            <span
                className={"font-semi-bold px-2 py-1 rounded text-xs bg-emerald-100 text-emerald-700"}>

                                {params.value}
                            </span>
        )},
    { field: "remarks", headerName: "Project Remarks", width: 200 ,
        renderCell: (params) => (
            <>
                {params.value.map((item, index) => (

                    <Chip
                        label={<Typography variant={"body2"}>{item}</Typography>}
                        style={{ backgroundColor: "#e5f3f3", color: "#037971"}}
                        size={"small"}
                        key={index}
                    />


                ))}
            </>
        )},

    // {
    //     field: "membershipStatus",
    //     headerName: "Membership",
    //     width: 130,
    //     renderCell: (params) => (
    //         <span
    //             className={`font-semi-bold px-2 py-1 rounded text-xs ${
    //                 params.value === "ACTIVE"
    //                     ? " bg-emerald-100 text-emerald-700"
    //                     : params.value === "INACTIVE"
    //                         ? " bg-rose-100 text-rose-700"
    //                         : " bg-gray-100 text-gray-700"
    //             }`}
    //         >
    //     {params.value}
    //   </span>
    //     ),
    // },
    // {
    //     field: "monthlySubscriptionStatus",
    //     headerName: "Monthly",
    //     width: 130,
    //     renderCell: (params) => (
    //         <span
    //             className={`font-semi-bold px-2 py-1 rounded text-xs ${
    //                 params.value === "ACTIVE"
    //                     ? " bg-emerald-100 text-emerald-700"
    //                     : params.value === "INACTIVE"
    //                         ? " bg-rose-100 text-rose-700"
    //                         : " bg-gray-300 text-gray-700"
    //             }`}
    //         >
    //     {params.value}
    //   </span>
    //     ),
    // },
    // {
    //     field: "studentStatus",
    //     headerName: "Student",
    //     width: 130,
    //     renderCell: (params) => (
    //         <span
    //             className={`font-semi-bold  px-2 py-1 rounded text-xs ${
    //                 params.value === "ACTIVE"
    //                     ? " bg-emerald-100 text-emerald-700"
    //                     : params.value === "INACTIVE"
    //                         ? " bg-rose-100 text-rose-700"
    //                         : " bg-gray-300 text-gray-700"
    //             }`}
    //         >
    //     {params.value}
    //   </span>
    //     ),
    // },
];
export default function DataTable({data}){
    return(
        <div>

            <DataGrid
                rows={data}
                columns={allProjectsColumnDef}
                autoHeight
                columnBuffer={5}
                rowHeight={70}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                // sortModel={sortModel}
                pageSizeOptions={[5]}
                // onRowDoubleClick={(row, event) => onRowDoubleClick(row, event)}
            />
        </div>

    );
}