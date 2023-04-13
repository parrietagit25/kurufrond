import { createTheme } from "@mui/material";
import { blue, red } from "@mui/material/colors";

export const pcrTheme = createTheme({
    palette: {
        primary: {
           // main: '#262254'
           //main: '#636466'
           main: '#092f87'
        },
        secondary: {
            main: '#636466'
        },
        error: {
            //main: red.A400
            main: '#c8102e'
        }
    }
})