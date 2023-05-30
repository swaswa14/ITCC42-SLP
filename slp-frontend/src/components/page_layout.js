import {Box} from "@mui/material";

export default function PageLayout({children}){
    return(
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
                width: '100vw',
                p: '1rem',
            }}
        >
            {children}

        </Box>
    )
}