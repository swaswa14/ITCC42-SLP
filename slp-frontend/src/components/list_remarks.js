import Title from "@/components/title";
import {Box, List, ListItem, ListItemText} from "@mui/material";

export default function ListRemarks({list}){
    return (
        <Box>
            <List dense={true}>
                {list !== null &&  Array.isArray(list) &&
                    list.map((item, index) => (
                        <ListItem key={index} component={"ul"}>
                            <ListItemText primary={item} />
                        </ListItem>
                    ))}

            </List>
        </Box>


    );
}