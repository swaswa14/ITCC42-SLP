import React, { useState } from 'react';
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Autocomplete,
    Chip,
    IconButton, Typography
} from '@mui/material';
import  {Controller, useForm} from 'react-hook-form';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MultipleStringInput from "@/components/customized_hook";
import {createProject} from "@/utils/api-interface";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const formatDate = (date) =>{
    const originalDate = new Date(date);

// Get the date components from the parsed date
    const year = originalDate.getFullYear();
    const month = originalDate.getMonth() + 1; // Adding 1 because getMonth() returns a zero-based index
    const day = originalDate.getDate();

// Format the date components
    return  `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

}
function MyForm({handleClose}) {
    const [principalProponents, setPrincipalProponents] = useState([]);
    const [amountRemarks, setAmountRemarks] = useState([]);
    const [partnerOrFunders, setPartnerOrFunders] = useState([]);
    const [projectRemarks, setProjectRemarks] = useState([]);
    const queryClient = useQueryClient()
    const [isLoading, setLoading] = useState(false);
    const [formState, setFormState] = useState({
        leadUnit: '',
        schoolYearStart: 2023,
        title: '',
        startDate: '',
        startDateRemarks: '',
        endDate: '',
        endDateRemarks: '',
        partnersOrFunders: '',
        amount: '',
        amountRemarks: '',
        principalProponent: '',
        status: '',
        remarks: ''
    });

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const formattedDate =  {
            ...formState,
            ["startDate"] : formatDate(formState.startDate),
            ["endDate"] : formatDate(formState.endDate),
        }


        mutation.mutate(formattedDate)
        console.log(formattedDate);
    };

    const mutation = useMutation({
        mutationFn: createProject,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['all_mapped_data'] }).then( handleClose()).then(setLoading(false))

        },

    })




    return (
        <form>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <TextField name="leadUnit" label="Lead Unit" value={formState.leadUnit} onChange={handleChange} fullWidth />

                </Grid>
                <Grid item xs={6}>

                    <TextField name="title" label="Title" value={formState.title} onChange={handleChange} fullWidth />

                </Grid>
                <Grid item xs={6}>

                    <TextField name="schoolYearStart" label="School Year Start" value={formState.schoolYearStart} onChange={(e)=> {

                        handleChange(e);
                    }
                    } fullWidth type={"number"}/>

                </Grid>

                <Grid item xs={6}>

                    <TextField name="startDate" label="Start Date" type="date" InputLabelProps={{ shrink: true }} value={formState.startDate} onChange={handleChange} fullWidth defaultValue={new Date()}/>

                </Grid>
                <Grid item xs={6}>
                    <TextField name="startDateRemarks" label="Start Date Remarks" value={formState.startDateRemarks} onChange={handleChange} fullWidth />
                </Grid>


                {/*sdsad*/}
                <Grid item xs={6}>
                    <TextField name="endDate" label="End Date" type="date" InputLabelProps={{ shrink: true }} value={formState.endDate} onChange={handleChange} fullWidth  defaultValue={new Date()}/>

                </Grid>
                <Grid item xs={6}>

                    <TextField name="endDateRemarks" label="End Date Remarks" value={formState.endDateRemarks} onChange={handleChange} fullWidth />

                </Grid>
                <Grid item xs={6}>

                    <MultipleStringInput strings={partnerOrFunders} setStrings={setPartnerOrFunders} label={"Partner/Funder"} placeHolder={"add a Partner/Funder"} name={"partnersOrFunders"} formState={formState} setFormState={setFormState}/>

                </Grid>
                <Grid item xs={6}>
                    <div>
                        <MultipleStringInput strings={principalProponents} setStrings={setPrincipalProponents} label={"Principal Proponents"} placeHolder={"add Principal Proponents"} name={"principalProponent"} formState={formState} setFormState={setFormState}/>
                    </div>

                </Grid>

                <Grid item xs={6}>

                    <TextField name="amount" label="Amount" value={formState.amount} onChange={handleChange} fullWidth type={'number'}/>

                </Grid>

                <Grid item xs={6}>

                    <div>
                        <MultipleStringInput strings={amountRemarks} setStrings={setAmountRemarks} label={"Amount Remarks"} placeHolder={"add remarks"} name={"amountRemarks"} formState={formState} setFormState={setFormState} />
                    </div>
                </Grid>


                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select name="status" value={formState.status} onChange={handleChange}>
                            <MenuItem value="Ongoing">Ongoing</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                            <MenuItem value="Postponed">Postponed</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <MultipleStringInput strings={projectRemarks} setStrings={setProjectRemarks} label={"Project Remarks"} placeHolder={"add remarks"} name={"remarks"} formState={formState} setFormState={setFormState}/>
                </Grid>

                <Grid item xs={12} style={{display: "flex", flexDirection: "row", justifyContent: "center", textAlign : "center"}}>

                    <Button  width={"30%"} variant="outlined" onClick={handleSubmit}>
                        {!isLoading && <Typography variant={"button"}>Submit</Typography>}
                        {isLoading && <Typography variant={"button"}>Loading...</Typography>}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default MyForm;
