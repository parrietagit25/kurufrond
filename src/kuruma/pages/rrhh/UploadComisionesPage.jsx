import { useState, forwardRef, useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Add, Upload } from "@mui/icons-material/";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import Swal from "sweetalert2";

import ContainerComponents from "../../components/ContainerComponents";
import { commission, commonServices } from "../../../hooks";
import { columns } from "../../../util/nameColumnsTable";

const UploadComisionPage = () => {
  const { commissionDataReview, fileUploadCommission, searchHistory } =
    commission();

  const { getDepartment, getEmployee } = commonServices();

  const [tab, setTab] = useState("1");
  const [listDepartament, setListDepartament] = useState([{}]);
  const [departament, setDepartament] = useState("");
  const [listEmployee, setListEmployee] = useState([{}]);
  const [employee, setEmployee] = useState({});
  const [alert, setAlert] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [file, setFile] = useState([]);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  const [rows, setRows] = useState([
    {
      id: "",
      employeeId: "",
      departmentName: "",
      employeeName: "",
      commission: 0,
      bonus: 0,
      honorary: 0,
      vale: 0,
      profuturo: 0,
      total: 0,
    },
  ]);

  useEffect(() => {
    async function fetchData() {
      setListDepartament(await getDepartment());
      setListEmployee(await getEmployee());

      setRows([]);
    }
    fetchData();
  }, []);

  const changeTab = (event, newValue) => {
    setTab(newValue);
  };

  const changeDepartament = (event) => {
    setDepartament(event.target.value);
  };

  const changeEmployee = (event) => {
    setEmployee(event.target.value);
  };

  const [amount, setAmount] = useState({
    commission: "",
    bonus: "",
    honorary: "",
    vale: "",
    profuturo: "",
  });

  const handleAmount = (event) => {
    setAmount({
      ...amount,
      [event.target.name]: event.target.value,
    });
  };

  const handleDeleteRow = (item) => {
    for (let i of item) {
      const removed = rows.filter((todo) => todo.id != i);

      Swal.fire({
        title: "Deseas eliminar este registro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#092f87",
        cancelButtonColor: "#c8102e",
        confirmButtonText: "Si, eliminar!",
      }).then((result) => {
        if (result.isConfirmed) {
          setRows(removed);

          Swal.fire("Deleted!", "Operacion realizada con exito.", "success");
        }
      });
    }
  };

  const AddtoList = () => {
    if (!validateForm()) {
      if (rows.length >= 1) {
        let flag = false;
        rows.forEach((item) => {
          if (item.id != "" && item.id === employee.id) {
            flag = true;
          }
        });
        if (flag) {
          getAlert();
        } else {
          mapperData();
        }
      } else {
        mapperData();
      }
    }
  };

  const sendCommissionData = async () => {
    const data = {
      flag: false,
      employees: rows,
    };
    await commissionDataReview(data);

    setRows([]);
    setDisabled(true);
  };

  const clearForm = () => {
    setEmployee({});
    setDepartament("");
    setAmount({
      commission: "",
      bonus: "",
      honorary: "",
      vale: "",
      profuturo: "",
    });
  };

  const validateForm = () => {
    if (departament === "" || employee.id === undefined) {
      getAlert();
      return true;
    }

    if (
      amount.commission == "" &&
      amount.bonus == "" &&
      amount.honorary == "" &&
      amount.vale == "" &&
      amount.profuturo == ""
    ) {
      getAlert();
      return true;
    }

    return false;
  };

  const getAlert = () => {
    setAlert(true);

    setTimeout(() => {
      setAlert(false);
    }, 500);
  };

  const mapperData = () => {
    const valorTotal =
      Number(amount.commission) +
      Number(amount.bonus) +
      Number(amount.honorary) +
      Number(amount.vale) +
      Number(amount.profuturo);

    setRows([
      ...rows,
      {
        id: employee.id,
        employeeId: employee.id,
        departmentName: departament,
        employeeName: employee.name,
        commission: Number(amount.commission),
        bonus: Number(amount.bonus),
        honorary: Number(amount.honorary),
        vale: Number(amount.vale),
        profuturo: Number(amount.profuturo),
        total: valorTotal,
      },
    ]);

    setDisabled(false);

    clearForm();
  };

  //todo: carga de archivo
  const fileSelected = (event) => {
    setFile(event.target.files[0]);

    setDisabled(false);
  };

  const fileUpload = async () => {
    await fileUploadCommission(file);
  };

  //todo: busqueda de historial
  const search = async () => {
    if (dateFrom != undefined && dateTo != undefined) {
      if (formatDate(dateFrom) <= formatDate(dateTo)) {
        const data = {
          operator: "S-D",
          departmentName: localStorage.getItem("department"),
          fromDate: formatDate(dateFrom),
          toDate: formatDate(dateTo),
        };

        await searchHistory(data);

        setDateFrom(null);
        setDateTo(null);
      } else {
        messageError("Error, fechas no validas...");
        //setHistoryModal(false);
      }
    } else {
      messageError("Error, se debe seleccionar fecha desde y hasta...");
      //setHistoryModal(false);
    }
  };

  const formatDate = (date) => {
    return dayjs(date);
  };

  return (
    <ContainerComponents
      color="#636466"
      width={900}
      title="RRHH"
      subTitle="Cargar Comisiones"
    >
      {alert ? <Alert severity="error">Formulario invalido</Alert> : ""}

      <form className="animate__animated animate__gadeIn animate__faster">
        <Card sx={{ mb: 1, mt: 1 }}>
          <Grid container justifyContent="center">
            <TabContext value={tab}>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <TabList onChange={changeTab} aria-label="lab API tabs example">
                  <Tab label="Carga Masiva" value="1" />
                  <Tab label="Carga individual" value="2" />
                  <Tab label="Historial de pagos" value="3" />
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
                    <Grid item xs={12} sx={{ mb: 4, mt: 2 }}>
                      <input
                        type="file"
                        id="fileUpload"
                        className="input-searchFile"
                        onChange={() => {
                          fileSelected(event);
                        }}
                        accept=".xls,.xlsx"
                      />
                    </Grid>
                    <Grid>
                      <Button
                        className="btn-info"
                        variant="contained"
                        onClick={() => {
                          fileUpload();
                        }}
                        disabled={disabled}
                        endIcon={<NavigateNextIcon />}
                      >
                        CONTINUAR
                      </Button>
                    </Grid>
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
                    <FormControl sx={{ m: 1, minWidth: 400 }} xs={12}>
                      <InputLabel htmlFor="grouped-select">
                        Departamento
                      </InputLabel>
                      <Select
                        id="grouped-select"
                        label="Departamento"
                        value={departament}
                        onChange={changeDepartament}
                        variant="outlined"
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
                    <FormControl sx={{ m: 1, minWidth: 400 }} xs={12}>
                      <InputLabel htmlFor="grouped-native-select">
                        Colaborador
                      </InputLabel>
                      <Select
                        id="grouped-native-select"
                        label="Colaborador"
                        value={employee}
                        onChange={changeEmployee}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        {listEmployee.map((item, index) => {
                          return (
                            <MenuItem value={item} key={index}>
                              {item.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <FormControl
                      sx={{ m: 1, width: "25ch" }}
                      variant="outlined"
                    >
                      <TextField
                        sx={{ mt: 1, mb: 1 }}
                        label="Comisión:"
                        value={amount.commission}
                        onChange={handleAmount}
                        name="commission"
                        id="formatted-numberformat-input"
                        InputProps={{
                          inputComponent: NumericFormatCustom,
                        }}
                        variant="standard"
                      />
                    </FormControl>
                    <FormControl
                      sx={{ m: 1, width: "25ch" }}
                      variant="outlined"
                    >
                      <TextField
                        sx={{ mt: 1, mb: 1 }}
                        label="Bonificación:"
                        value={amount.bonus}
                        onChange={handleAmount}
                        name="bonus"
                        id="formatted-numberformat-input"
                        InputProps={{
                          inputComponent: NumericFormatCustom,
                        }}
                        variant="standard"
                      />
                    </FormControl>
                    <FormControl
                      sx={{ m: 1, width: "25ch" }}
                      variant="outlined"
                    >
                      <TextField
                        sx={{ mt: 1, mb: 1 }}
                        label="Honorarios:"
                        value={amount.honorary}
                        onChange={handleAmount}
                        name="honorary"
                        id="formatted-numberformat-input"
                        InputProps={{
                          inputComponent: NumericFormatCustom,
                        }}
                        variant="standard"
                      />
                    </FormControl>
                    <FormControl
                      sx={{ m: 1, width: "25ch" }}
                      variant="outlined"
                    >
                      <TextField
                        sx={{ mt: 1, mb: 1 }}
                        label="Vale General:"
                        value={amount.vale}
                        onChange={handleAmount}
                        name="vale"
                        id="formatted-numberformat-input"
                        InputProps={{
                          inputComponent: NumericFormatCustom,
                        }}
                        variant="standard"
                      />
                    </FormControl>
                    <FormControl
                      sx={{ m: 2, width: "25ch" }}
                      variant="outlined"
                    >
                      <TextField
                        label="Profuturo:"
                        value={amount.profuturo}
                        onChange={handleAmount}
                        name="profuturo"
                        id="formatted-numberformat-input"
                        InputProps={{
                          inputComponent: NumericFormatCustom,
                        }}
                        variant="standard"
                      />
                    </FormControl>
                    <FormControl
                      sx={{ m: 1, width: "25ch" }}
                      variant="outlined"
                    ></FormControl>
                    <FormControl
                      sx={{ m: 1, width: "25ch", mt: 2 }}
                      variant="outlined"
                    >
                      <Button
                        variant="contained"
                        sx={{ mb: 2 }}
                        className="btn-info"
                        onClick={() => {
                          AddtoList();
                        }}
                        endIcon={<Add />}
                      >
                        AGREGAR
                      </Button>
                    </FormControl>
                    <FormControl
                      sx={{ m: 1, width: "25ch", mt: 2 }}
                      variant="outlined"
                    >
                      <Button
                        variant="contained"
                        className="btn-info"
                        onClick={() => {
                          sendCommissionData();
                        }}
                        disabled={disabled}
                        endIcon={<Upload />}
                      >
                        CARGAR COMISIONES
                      </Button>
                    </FormControl>
                  </Box>
                  <Box
                    sx={{
                      height: 400,
                      width: "100%",
                    }}
                  >
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 5,
                          },
                        },
                      }}
                      pageSizeOptions={[5]}
                      checkboxSelection
                      disableRowSelectionOnClick
                      onRowSelectionModelChange={(e) => {
                        handleDeleteRow(e);
                      }}
                    />
                  </Box>
                </TabPanel>
              </Grid>

              <Grid item xs={12}>
                <TabPanel value="3">
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    <FormControl sx={{ m: 1, minWidth: 300, mt: 2 }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={{ m: 1 }}
                          label={"Seleccione la fecha desde:"}
                          value={dateFrom}
                          onChange={(newValue) => setDateFrom(newValue)}
                        />
                      </LocalizationProvider>
                    </FormControl>

                    <FormControl sx={{ m: 1, minWidth: 300, mt: 2 }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={{ m: 1 }}
                          label={"Seleccione la fecha hasta:"}
                          value={dateTo}
                          onChange={(newValue) => setDateTo(newValue)}
                        />
                      </LocalizationProvider>
                    </FormControl>

                    <FormControl
                      sx={{ m: 1, width: "15ch", mt: 4 }}
                      variant="outlined"
                    >
                      <Button
                        className="btn-info"
                        endIcon={<ZoomInIcon />}
                        onClick={() => {
                          search();
                        }}
                        variant="contained"
                      >
                        Buscar
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

const NumericFormatCustom = forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      //style={{color: ''}}
      prefix="$"
    />
  );
});

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default UploadComisionPage;
