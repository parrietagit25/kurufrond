import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Alert,
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Tab,
  TextField,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import Swal from "sweetalert2";

import { columnsUserRoles } from "../../../util/nameColumnsTable";
import ContainerComponents from "../../components/ContainerComponents";
import { commonServices, user, messages } from "../../../hooks";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const User = () => {
  const { getAllApartments, getRoles } = commonServices();
  const { messageWarning, messageSuccess } = messages();

  const { userSystem } = user();

  const [dataTab2, setDataTab2] = useState({
    operator: "",
    rol: "",
    departament: "",
    employeeId: "",
    password: "",
    email: "",
    searchCode: "",
  });
  const [alert, setAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [tab, setTab] = useState("1");
  const [listDepartament, setListDepartament] = useState([{}]);
  const [listRoles, setListRoles] = useState([{}]);
  const [rowsUserRoles, setRowsUserRoles] = useState([
    {
      id: "",
      employeeId: "",
      email: "",
      rol: "",
      departamento: "",
      password: "",
    },
  ]);

  useEffect(() => {
    async function fetchData() {
      setListDepartament(await getAllApartments());
      setListRoles(await getRoles());

      getRowsUserRoles();
    }
    fetchData();
  }, []);

  const changeTab = (event, newValue) => {
    setTab(newValue);
  };

  const getAlert = () => {
    setAlert(true);

    setTimeout(() => {
      setAlert(false);
    }, 500);
  };

  //TODO: TAB 1
  const handleDataTab2 = (event) => {
    setDataTab2({
      ...dataTab2,
      [event.target.name]: event.target.value,
    });
  };

  const deleteRowsUserRoles = async (items) => {
    for (let i of items) {
      dataTab2.operator = "D";
      dataTab2.employeeId = i;

      Swal.fire({
        title: "Deseas eliminar este registro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#092f87",
        cancelButtonColor: "#c8102e",
        confirmButtonText: "Si, eliminar!",
      }).then((result) => {
        if (result.isConfirmed) {
          executeUserRoles(dataTab2);

          clear();

          Swal.fire("Eliminado!", "Operacion realizada con exito.", "success");
        }
      });
    }
  };

  const executeUserRoles = async (data) => {
    await userSystem(data);

    getRowsUserRoles();
  };

  const getRowsUserRoles = async () => {
    dataTab2.operator = "S";
    setRowsUserRoles(await userSystem(dataTab2));
  };

  //TODO: TAB 2

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const searchData = async () => {
    dataTab2.operator = "S-ID";

    const result = await userSystem(dataTab2);

    if (result.length >= 1) {
      let flag = true;

      rowsUserRoles.forEach((item) => {
        if (item.employeeId == result[0].employeeId) {
          setDataTab2({
            employeeId: item.employeeId,
            departament: item.departamento,
            rol: item.rol,
            password: item.password,
            email: item.email,
            searchCode: "",
            operator: "U",
          });
          flag = false;
        }
      });

      if (flag) {
        setDataTab2({
          employeeId: result[0].employeeId,
          departament: result[0].departament,
          rol: "",
          password: "",
          email: result[0].email,
          searchCode: "",
          operator: "I",
        });
      }
    } else {
      messageWarning("El colaborador no existe.");
      clear();
    }
  };

  const clear = () => {
    setDataTab2({
      employeeId: "",
      departament: "",
      rol: "",
      password: "",
      email: "",
      searchCode: "",
      operator: "",
    });
  };

  const sendDataTab2 = async () => {
    if (
      dataTab2.employeeId &&
      dataTab2.rol &&
      dataTab2.departament &&
      dataTab2.password &&
      dataTab2.email
    ) {
      executeUserRoles(dataTab2);

      messageSuccess("Operacion realizada con exito...");

      clear();
    } else {
      getAlert();
    }
  };

  return (
    <ContainerComponents
      color="#636466"
      width={950}
      title="CONFIGURACION"
      subTitle="Usuarios"
    >
      {alert ? <Alert severity="error">Formulario invalido</Alert> : ""}
      <Card sx={{ mb: 1, mt: 1 }}>
        <Grid container justifyContent="center">
          <TabContext value={tab}>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TabList onChange={changeTab} aria-label="lab API tabs example">
                <Tab label="USUARIOS EXISTENTES" value="1" />
                <Tab label="Rol colaborador" value="2" />
              </TabList>
            </Grid>

            <Grid item xs={12}>
              <TabPanel value="1">
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  <FormControl sx={{ height: 400, width: "90%", m: 2 }}>
                    <DataGrid
                      rows={rowsUserRoles}
                      columns={columnsUserRoles}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 10,
                          },
                        },
                      }}
                      pageSizeOptions={[10]}
                      checkboxSelection
                      disableRowSelectionOnClick
                      onRowSelectionModelChange={(e) => {
                        deleteRowsUserRoles(e);
                      }}
                    />
                  </FormControl>
                </Box>
              </TabPanel>
            </Grid>
            <Grid item xs={12}>
              <TabPanel value="2">
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  <Grid>
                    <TextField
                      sx={{ m: 2, width: "25ch", mt: 3 }}
                      label="BUSCAR COLABORADOR"
                      value={dataTab2.searchCode}
                      onChange={handleDataTab2}
                      variant="outlined"
                      name="searchCode"
                    />
                    <FormControl
                      sx={{ m: 1, width: "15ch", mt: 4 }}
                      variant="outlined"
                    >
                      <Button
                        className="btn-info"
                        variant="contained"
                        endIcon={<ZoomInIcon />}
                        onClick={() => {
                          searchData();
                        }}
                      >
                        BUSCAR
                      </Button>
                    </FormControl>
                  </Grid>
                </Box>
                <hr></hr>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  <FormControl sx={{ m: 2, width: "15ch" }} variant="outlined">
                    <TextField
                      label="COD:"
                      value={dataTab2.employeeId}
                      onChange={handleDataTab2}
                      variant="outlined"
                      name="employeeId"
                      disabled
                    />
                  </FormControl>
                  <FormControl sx={{ m: 2, minWidth: 230 }}>
                    <InputLabel>Rol:</InputLabel>
                    <Select
                      id="grouped-select"
                      label="Rol"
                      value={dataTab2.rol}
                      onChange={handleDataTab2}
                      variant="outlined"
                      name="rol"
                    >
                      {listRoles.map((item, index) => {
                        return (
                          <MenuItem value={item.name} key={index}>
                            {item.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ m: 2, minWidth: 230 }}>
                    <InputLabel>Departamento:</InputLabel>
                    <Select
                      id="grouped-select"
                      label="Departamento"
                      value={dataTab2.departament}
                      onChange={handleDataTab2}
                      variant="outlined"
                      name="departament"
                    >
                      {listDepartament.map((item, index) => {
                        return (
                          <MenuItem value={item.name} key={index}>
                            {item.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ m: 2, width: "35ch" }} variant="outlined">
                    <TextField
                      label="Email:"
                      value={dataTab2.email}
                      onChange={handleDataTab2}
                      variant="outlined"
                      name="email"
                      type="email"
                    />
                  </FormControl>
                  <FormControl sx={{ m: 2, width: "25ch" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password:
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      value={dataTab2.password}
                      onChange={handleDataTab2}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password :"
                      name="password"
                    />
                  </FormControl>
                </Box>
                <FormControl
                  sx={{ m: 1, width: "15ch", mt: 3 }}
                  variant="outlined"
                >
                  <Button
                    className="btn-info"
                    variant="contained"
                    endIcon={<NavigateNextIcon />}
                    onClick={() => {
                      sendDataTab2();
                    }}
                  >
                    CONTINUAR
                  </Button>
                </FormControl>
                <FormControl
                  sx={{ m: 1, width: "15ch", mt: 3 }}
                  variant="outlined"
                >
                  <Button
                    className="btn-cancel"
                    variant="contained"
                    endIcon={<ZoomInIcon />}
                    onClick={() => {
                      clear();
                    }}
                  >
                    Limpiar
                  </Button>
                </FormControl>
              </TabPanel>
            </Grid>
          </TabContext>
        </Grid>
      </Card>
    </ContainerComponents>
  );
};

export default User;