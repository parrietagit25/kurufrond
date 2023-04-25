import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Container,
  Button,
  MenuItem,
  IconButton,
  Typography,
  Menu,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { LogoutOutlined } from "@mui/icons-material";
import { useAuthStore } from "../../hooks";
import properties from "../../util/properties";

const pages = ["Inicio", "Finanzas", "RRHH", "Comercial"];
//const settings = ["Inicio", "Finanzas", "RRHH", "Comercial", "Logout"];

function NavBar() {
  const { startLogout } = useAuthStore();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchor1, setAnchor1] = useState(null);
  const [anchor2, setAnchor2] = useState(null);
  const [anchor3, setAnchor3] = useState(null);
  const [anchor4, setAnchor4] = useState(null);
  const [anchor5, setAnchor5] = useState(null);
  const [rrhh, setRrhh] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpen1 = (event) => {
    const rol = localStorage.getItem("rol");

    rol === properties.ADMIN ||
    rol === properties.G_Finanzas ||
    rol === properties.apro_Finanzas
      ? setAnchor1(event.currentTarget)
      : setAnchor1(null);
  };

  const handleOpen2 = (event) => {
    const rol = localStorage.getItem("rol");

    if (
      rol === properties.apro_RRHH ||
      rol === properties.G_Rrhh ||
      rol === properties.ADMIN
    ) {
      setRrhh(true);
    }

    rol === properties.ADMIN ||
    rol === properties.G_Cobro ||
    rol === properties.G_Comercial ||
    rol === properties.G_Compras ||
    rol === properties.G_Finanzas ||
    rol === properties.G_Mercadeo ||
    rol === properties.G_Mina ||
    rol === properties.G_Operaciones ||
    rol === properties.G_Retail ||
    rol === properties.G_Rrhh ||
    rol === properties.G_Ventas ||
    rol === properties.apro_RRHH
      ? setAnchor2(event.currentTarget)
      : setAnchor1(null);
  };

  const handleOpen3 = (event) => {
    const rol = localStorage.getItem("rol");

    rol === properties.ADMIN || rol === properties.G_Comercial
      ? setAnchor3(event.currentTarget)
      : setAnchor3(null);
  };

  const handleOpen4 = (event) => {
    const rol = localStorage.getItem("rol");

    rol === properties.ADMIN || rol === properties.G_Rrhh
      ? setAnchor4(event.currentTarget)
      : setAnchor4(null);
  };

  const handleOpen5 = (event) => {
    const rol = localStorage.getItem("rol");

    rol === properties.ADMIN || rol === properties.G_Rrhh
      ? setAnchor5(event.currentTarget)
      : setAnchor5(null);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClose1 = () => {
    setAnchor1(null);
  };

  const handleClose2 = () => {
    setAnchor2(null);
  };

  const handleCloseUserMenu4 = () => {
    setAnchor3(null);
  };

  const handleCloseUserMenu5 = () => {
    setAnchor4(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton color="error">
            <DirectionsCarIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            KURUMA
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            KURUMA
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              component="a"
              href="/home"
              className="btn-nav"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              INICIO
            </Button>

            <Button
              onClick={handleOpen1}
              className="btn-nav"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              FINANZAS
            </Button>
            <Menu
              sx={{ mt: "45px", ml: "20px" }}
              id="menu-finanzas"
              anchorEl={anchor1}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchor1)}
              onClose={handleClose1}
            >
              <MenuItem onClick={handleClose1}>
                <Typography
                  textAlign="center"
                  component="a"
                  className="nav-a"
                  href="/finanzas/panapass"
                  sx={{
                    textDecoration: "none",
                    color: "secondary.main",
                    fontWeight: 500,
                  }}
                >
                  Panapass
                </Typography>
              </MenuItem>
            </Menu>

            <Button
              onClick={handleOpen2}
              className="btn-nav"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              RRHH
            </Button>
            <Menu
              sx={{ mt: "45px", ml: "8rem" }}
              id="menu-finanzas"
              anchorEl={anchor2}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchor2)}
              onClose={handleClose2}
            >
              <MenuItem onClick={handleClose2}>
                <Typography
                  textAlign="center"
                  component="a"
                  className="nav-a"
                  href="/rrhh/uploadComisiones"
                  sx={{
                    textDecoration: "none",
                    color: "secondary.main",
                    fontWeight: 500,
                  }}
                >
                  Cargar Comisiones
                </Typography>
              </MenuItem>

              <MenuItem onClick={handleClose2} disabled={!rrhh}>
                <Typography
                  textAlign="center"
                  component="a"
                  className="nav-a"
                  href="/rrhh/dowloadComisiones"
                  sx={{
                    textDecoration: "none",
                    color: "secondary.main",
                    fontWeight: 500,
                  }}
                >
                  Descargar Comisiones
                </Typography>
              </MenuItem>

              <MenuItem onClick={handleClose2} disabled={!rrhh}>
                <Typography
                  textAlign="center"
                  component="a"
                  className="nav-a"
                  href="/rrhh/admision"
                  sx={{
                    textDecoration: "none",
                    color: "secondary.main",
                    fontWeight: 500,
                  }}
                >
                  Admision
                </Typography>
              </MenuItem>
            </Menu>

            <Button
              onClick={handleOpen3}
              className="btn-nav"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              COMERCIAL
            </Button>
            <Menu
              sx={{ mt: "45px", ml: "6rem" }}
              id="menu-comercial"
              anchorEl={anchor3}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchor3)}
              onClose={handleCloseUserMenu4}
            >
              <MenuItem onClick={handleCloseUserMenu4}>
                <Typography
                  textAlign="center"
                  component="a"
                  className="nav-a"
                  href="/comercial/dowloadComisiones"
                  sx={{
                    textDecoration: "none",
                    color: "secondary.main",
                    fontWeight: 500,
                  }}
                >
                  Descargar Comisiones
                </Typography>
              </MenuItem>

              <MenuItem onClick={handleCloseUserMenu4}>
                <Typography
                  textAlign="center"
                  component="a"
                  className="nav-a"
                  href="/comercial/configComisiones"
                  sx={{
                    textDecoration: "none",
                    color: "secondary.main",
                    fontWeight: 500,
                  }}
                >
                  Config. Comisiones
                </Typography>
              </MenuItem>
            </Menu>

            <Button
              onClick={handleOpen4}
              className="btn-nav"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              CONFIGURACION
            </Button>
            <Menu
              sx={{ mt: "45px", ml: "3rem" }}
              id="menu-comercial"
              anchorEl={anchor4}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchor4)}
              onClose={handleCloseUserMenu5}
            >
              <MenuItem onClick={handleCloseUserMenu5}>
                <Typography
                  textAlign="center"
                  component="a"
                  className="nav-a"
                  href="/setting/user"
                  sx={{
                    textDecoration: "none",
                    color: "secondary.main",
                    fontWeight: 500,
                  }}
                >
                  Usuarios
                </Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Button
              onClick={startLogout}
              className="btn-nav"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              LOGOUT
            </Button>
          </Box>

          <IconButton color="error">
            <LogoutOutlined />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;