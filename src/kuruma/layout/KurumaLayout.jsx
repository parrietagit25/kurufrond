import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import NavBar from "../components/NavBar";

const drawerWidth = 240

const KurumaLayout = ({ children, title="", subTitle }) => {
  return (
    <Box sx={{ display: "flex" }} className="animate__animated animate__gadeIn animate__faster">
      {/* Navbar  drawerWidth*/}

      <NavBar />

      <Box component="main" sx={{ flexGrow: 1, p: 5, textAlign: "center" }}>
        {/* toolbar */}

        <Typography variant="h5" sx={{ mt: 10, color: '#c8102e'  }}>
          { title }
        </Typography>

        <br />

        <Typography variant="h6" sx={{ color: '#092f87' }}>
          { subTitle }
        </Typography>

        {children}
      </Box>
    </Box>
  );
};

export default KurumaLayout;
