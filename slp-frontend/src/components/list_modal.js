import PropTypes from "prop-types";
import {Box, List, ListItem, ListItemText, Popper} from "@mui/material";
import Title from "@/components/title";

export default function ListModal({list, anchorEl, single}){


    const open = Boolean(anchorEl);
    const id = open ? 'single' : undefined;


    return(
        <Popper id={id} open={open} anchorEl={anchorEl}>
            <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                <Title>Remarks</Title>
                <List dense={true}>
                    {list !== null &&  Array.isArray(list) &&
                        list.map((item, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={item} />
                            </ListItem>
                        ))}
                    { list === null && single !== null && (
                        <ListItem>
                            <ListItemText primary={single} style={{color:"black"}}/>
                        </ListItem>
                    )}
                </List>
            </Box>
        </Popper>
    )

}

ListModal.propTypes = {
    list: PropTypes.array,
    sing: PropTypes.string,
};