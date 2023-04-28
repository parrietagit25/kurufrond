import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Tab,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SaveIcon from "@mui/icons-material/Save";
import LayersClearIcon from "@mui/icons-material/LayersClear";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import ContainerComponents from "../../components/ContainerComponents";
import { admission, commonServices } from "../../../hooks";

const AdmisionPage = () => {
  const { getAllApartments } = commonServices();
  const { searchData, createAdmission, updateAdmission } = admission();

  const [listDepartament, setListDepartament] = useState([{}]);
  const [dateBirth, setDateBirth] = useState(null);
  const [dateEntry, setDateEntry] = useState(null);
  const [contractExpiration, setContractExpiration] = useState(null);
  const [flagSearch, setFlagSearch] = useState(false);

  const [tab, setTab] = useState("1");
  const [data, setData] = useState({
    operator: "",
    name: "",
    lastName: "",
    identification: "",
    dateBirth: "",
    gender: "",
    email: "",
    phone: "",
    dependent: "",
    address: "",
    centerCost: "",
    employerId: "",
    dateEntry: "",
    departament: "",
    position: "",
    antiquityYear: "",
    ageMonth: "",
    vacation: "",
    incidents: "",
    positionsHeld: "",
    contractExpiration: "",
    settlementHistory: "",
    profuturo: "",
    status: "",
    searchId: "",
  });

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setListDepartament(await getAllApartments());
    }
    fetchData();
  }, []);

  const handleChecked = (event) => {
    setChecked(event.target.checked);
  };

  const changeTab = (event, newValue) => {
    setTab(newValue);
  };

  const handleData = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const search = async () => {
    const result = await searchData(data);

    if (result != undefined) {
      setData({
        operator: "",
        name: result.name,
        lastName: result.lastName,
        identification: result.identification,
        gender: result.gender,
        email: result.email,
        phone: result.phone,
        dependent: result.dependent,
        address: result.address,
        centerCost: result.centerCost,
        employerId: result.employerId,
        departament: result.departament,
        position: result.position,
        antiquityYear: result.antiquityYear,
        ageMonth: result.ageMonth,
        vacation: "",
        incidents: result.incidents,
        positionsHeld: result.positionsHeld,
        settlementHistory: result.settlementHistory,
        debt: result.debt,
      });

      setChecked(result.status);
      setDateBirth(formatDate(result.dateBirth));
      setDateEntry(formatDate(result.dateEntry));
      setContractExpiration(formatDate(result.contractExpiration));
      setFlagSearch(true);
    } else {
      clear();
    }
  };

  const createEmployer = async () => {
    data.status = checked;
    data.dateBirth = formatDate(dateBirth);
    data.dateEntry = formatDate(dateEntry);
    data.contractExpiration = formatDate(contractExpiration);

    flagSearch ? await updateAdmission(data) : await createAdmission(data);
    clear();
    setTab("1");
  };

  const formatDate = (date) => {
    return dayjs(date);
  };

  const clear = () => {
    setData({
      operator: "",
      name: "",
      lastName: "",
      identification: "",
      dateBirth: "",
      gender: "",
      email: "",
      phone: "",
      dependent: "",
      address: "",
      centerCost: "",
      employerId: "",
      dateEntry: "",
      departament: "",
      position: "",
      antiquityYear: "",
      ageMonth: "",
      vacation: "",
      incidents: "",
      positionsHeld: "",
      contractExpiration: "",
      settlementHistory: "",
      debt: "",
      status: "",
      searchId: "",
    });
    setChecked(false);
    setDateBirth(formatDate(""));
    setDateEntry(formatDate(""));
    setContractExpiration(formatDate(""));
    setFlagSearch(false);
  };

  return (
    <ContainerComponents
      color="#636466"
      width={900}
      title="RRHH"
      subTitle="Datos del colaborador"
    >
      <form className="animate__animated animate__gadeIn animate__faster">
        <Card sx={{ mb: 1, mt: 1 }}>
          <Box
            sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
          >
            <Grid>
              <TextField
                sx={{ m: 1, width: "25ch", mt: 3 }}
                label="BUSCAR COLABORADOR"
                id="outlined-start-adornment"
                value={data.employerId}
                onChange={handleData}
                variant="outlined"
                name="employerId"
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
                    search();
                  }}
                >
                  BUSCAR
                </Button>
              </FormControl>
            </Grid>
          </Box>
        </Card>

        <Card sx={{ mb: 1, mt: 1 }}>
          <Grid container justifyContent="center">
            <TabContext value={tab}>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <TabList onChange={changeTab} aria-label="lab API tabs example">
                  <Tab label="Datos basicos" value="1" />
                  <Tab label="Datos laborales" value="2" />
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
                    <Grid>
                      <TextField
                        label="Nombre:"
                        id="outlined-start-adornment"
                        sx={{ m: 2, width: "25ch", mb: 3 }}
                        value={data.name}
                        onChange={handleData}
                        variant="outlined"
                        name="name"
                      />
                    </Grid>
                    <FormControl
                      sx={{ m: 2, width: "25ch" }}
                      variant="outlined"
                    >
                      <TextField
                        label="Apellido:"
                        id="outlined-start-adornment"
                        value={data.lastName}
                        onChange={handleData}
                        variant="outlined"
                        name="lastName"
                      />
                    </FormControl>
                    <FormControl
                      sx={{ m: 2, width: "25ch" }}
                      variant="outlined"
                    >
                      <TextField
                        label="Cedula / Pasaporte:"
                        id="outlined-start-adornment"
                        value={data.identification}
                        onChange={handleData}
                        variant="outlined"
                        name="identification"
                      />
                    </FormControl>
                    <FormControl
                      sx={{ m: 2, width: "28ch" }}
                      variant="outlined"
                    >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label={"Fecha Nacimiento:"}
                          value={dateBirth}
                          onChange={(newValue) => setDateBirth(newValue)}
                          variant="outlined"
                        />
                      </LocalizationProvider>
                    </FormControl>
                    <FormControl sx={{ m: 2, minWidth: 200 }}>
                      <InputLabel>Genero:</InputLabel>
                      <Select
                        id="grouped-select"
                        label="Genero"
                        value={data.gender}
                        onChange={handleData}
                        variant="outlined"
                        name="gender"
                      >
                        <MenuItem value="F">Mujer</MenuItem>
                        <MenuItem value="M">Hombre</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl
                      sx={{ m: 2, width: "25ch" }}
                      variant="outlined"
                    >
                      <TextField
                        label="Email:"
                        id="outlined-start-adornment"
                        value={data.email}
                        onChange={handleData}
                        variant="outlined"
                        name="email"
                        type="email"
                      />
                    </FormControl>
                    <FormControl
                      sx={{ m: 2, width: "25ch" }}
                      variant="outlined"
                    >
                      <TextField
                        label="Celular:"
                        id="outlined-start-adornment"
                        value={data.phone}
                        onChange={handleData}
                        variant="outlined"
                        name="phone"
                        type="number"
                      />
                    </FormControl>
                    <FormControl
                      sx={{ m: 2, width: "25ch" }}
                      variant="outlined"
                    >
                      <TextField
                        id="outlined-multiline-flexible"
                        label="Dependientes:"
                        multiline
                        value={data.dependent || ""}
                        rows={5}
                        onChange={handleData}
                        variant="outlined"
                        name="dependent"
                      />
                    </FormControl>
                    <FormControl
                      sx={{ m: 2, width: "25ch" }}
                      variant="outlined"
                    >
                      <TextField
                        id="outlined-multiline-flexible"
                        label="Domicilio:"
                        multiline
                        value={data.address || ""}
                        rows={5}
                        onChange={handleData}
                        variant="outlined"
                        name="address"
                      />
                    </FormControl>
                    <FormControl
                      sx={{ m: 2, width: "15ch", mt: 4 }}
                      variant="outlined"
                    >
                      <Button
                        className="btn-info"
                        variant="contained"
                        endIcon={<LayersClearIcon />}
                        onClick={() => {
                          clear();
                        }}
                      >
                        LIMPIAR
                      </Button>
                    </FormControl>
                    <FormControl
                      sx={{ m: 1, width: "15ch", mt: 4 }}
                      variant="outlined"
                    >
                      <Button
                        className="btn-info"
                        variant="contained"
                        endIcon={<NavigateNextIcon />}
                        onClick={() => {
                          setTab("2");
                        }}
                      >
                        CONTINUAR
                      </Button>
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
                    <FormControl
                      sx={{ m: 2, width: "25ch" }}
                      variant="outlined"
                    >
                      <TextField
                        label="Centro costo:"
                        id="outlined-start-adornment"
                        value={data.centerCost || ""}
                        onChange={handleData}
                        variant="outlined"
                        name="centerCost"
                      />
                    </FormControl>
                    <FormControl
                      sx={{ m: 2, width: "25ch" }}
                      variant="outlined"
                    >
                      <TextField
                        label="Codido Colaborador:"
                        id="outlined-start-adornment"
                        value={data.employerId}
                        onChange={handleData}
                        variant="outlined"
                        name="employerId"
                      />
                    </FormControl>
                    <FormControl
                      sx={{ m: 2, width: "25ch" }}
                      variant="outlined"
                    >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label={"Fecha Ingreso:"}
                          value={dateEntry}
                          onChange={(newValue) => setDateEntry(newValue)}
                          variant="outlined"
                        />
                      </LocalizationProvider>
                    </FormControl>

                    <FormControl sx={{ m: 2, minWidth: 230 }}>
                      <InputLabel>Departamento:</InputLabel>
                      <Select
                        id="grouped-select"
                        label="Departamento"
                        value={data.departament}
                        onChange={handleData}
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
                    <FormControl
                      sx={{ m: 2, width: "25ch" }}
                      variant="outlined"
                    >
                      <TextField
                        label="Cargo:"
                        id="outlined-start-adornment"
                        value={data.position}
                        onChange={handleData}
                        name="position"
                      />
                    </FormControl>

                    <FormControl
                      sx={{ m: 2, width: "25ch" }}
                      variant="outlined"
                    >
                      <TextField
                        label="Antigüedad:"
                        id="outlined-start-adornment"
                        value={data.antiquityYear}
                        onChange={handleData}
                        name="antiquityYear"
                      />
                    </FormControl>
                    <FormControl
                      sx={{ m: 2, width: "25ch" }}
                      variant="outlined"
                    >
                      <TextField
                        id="outlined-textarea"
                        label="Incidencias:"
                        multiline
                        value={data.incidents || ""}
                        onChange={handleData}
                        name="incidents"
                      />
                    </FormControl>
                    <FormControl
                      sx={{ m: 2, width: "25ch" }}
                      variant="outlined"
                    >
                      <TextField
                        id="outlined-textarea"
                        label="Cargos desempeñados:"
                        multiline
                        value={data.positionsHeld || ""}
                        onChange={handleData}
                        name="positionsHeld"
                      />
                    </FormControl>
                    <FormControl
                      sx={{ m: 2, width: "25ch" }}
                      variant="outlined"
                    >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label={"Vencimiento Contrato:"}
                          value={contractExpiration}
                          onChange={(newValue) =>
                            setContractExpiration(newValue)
                          }
                          variant="outlined"
                        />
                      </LocalizationProvider>
                    </FormControl>
                    <FormControl
                      sx={{ m: 2, width: "25ch", mb: 3 }}
                      variant="outlined"
                    >
                      <TextField
                        id="outlined-textarea"
                        label="Histora de liquidaciones:"
                        multiline
                        value={data.settlementHistory || ""}
                        onChange={handleData}
                        name="settlementHistory"
                      />
                    </FormControl>
                    <FormControl
                      sx={{ m: 2, width: "25ch" }}
                      variant="outlined"
                    >
                      <TextField
                        id="outlined-start-adornment"
                        label="Profuturo:"
                        value={data.debt}
                        onChange={handleData}
                        name="debt"
                      />
                    </FormControl>
                    <FormControl sx={{ m: 2, width: "25ch" }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            className="checkboxTrue"
                            checked={checked}
                            onChange={handleChecked}
                          />
                        }
                        label="Activo"
                      />
                    </FormControl>
                    <FormControl
                      sx={{ m: 1, width: "15ch" }}
                      variant="outlined"
                    >
                      <Button
                        className="btn-info"
                        variant="contained"
                        endIcon={<ArrowBackIosNewIcon />}
                        onClick={() => {
                          setTab("1");
                        }}
                      >
                        REGRESAR
                      </Button>
                    </FormControl>
                    <FormControl
                      sx={{ m: 1, width: "15ch" }}
                      variant="outlined"
                    >
                      <Button
                        className="btn-info"
                        variant="contained"
                        endIcon={<SaveIcon />}
                        onClick={() => {
                          createEmployer();
                        }}
                      >
                        Guardar
                      </Button>
                    </FormControl>
                  </Box>
                </TabPanel>
              </Grid>
            </TabContext>
          </Grid>
        </Card>
      </form>
    </ContainerComponents>
  );
};

export default AdmisionPage;
