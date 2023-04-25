import { useEffect, forwardRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Tab,
  TextField,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import Swal from "sweetalert2";

import ContainerComponents from "../../components/ContainerComponents";
import {
  columnsCustomerCategory,
  columnsTarifaVehiculo,
  columnsCentroCosto,
} from "../../../util/nameColumnsTable";
import { commonServices, comercial, messages } from "../../../hooks";

const ConfigComisiones = () => {
  const { getCustomerAccount, getClasesComercial, getCostCenterFee } =
    commonServices();

  const {
    addCustomerCategory,
    getCustomerCategory,
    deleteCustomerCategory,
    getVehicleRate,
    vehicleRate,
    deleteVehicleRate,
    costCenterFee,
  } = comercial();

  const { messageError, messageWarning } = messages();

  const [operator, setOperator] = useState(false);
  const [listCostCenter, setListCostCenter] = useState([{}]);
  const [costCenter, setCostCenter] = useState("");
  const [search, setSearch] = useState(false);
  const [alert, setAlert] = useState(false);
  const [tab, setTab] = useState("1");
  const [listAccount, setListAccount] = useState([{}]);
  const [account, setAccount] = useState("");
  const [clasesComerciales, setClasesComerciales] = useState([{}]);
  const [clase, setClase] = useState("");
  const [data, setData] = useState({
    id: "",
    operator: "",
    catCte: "",
    mantenimiento: "",
    crecimiento: "",
    nuevo: ''
  });
  const [dataTab3, setDataTab3] = useState({
    id: 0,
    operator: "",
    invclass: "",
    rate: 0,
    superOptimal: 0,
    CentroCostos: "",
    maximum1: 0,
    minimum1: 0,
    payment1: 0,
    maximum2: 0,
    minimum2: 0,
    payment2: 0,
    maximum3: 0,
    minimum3: 0,
    payment3: 0,
    maximum4: 0,
    minimum4: 0,
    payment4: 0,
  });
  const [dataTab1, setDataTab1] = useState({
    Id: "",
    operator: "",
    centroCosto: "",
    mantenimiento: "",
    crecimiento: "",
    nuevo: "",
  });

  const [rowCustomerCategory, setRowCustomerCategory] = useState([
    {
      id: "",
      catCte: "",
      mantenimiento: 0,
      crecimiento: 0,
    },
  ]);
  const [rowsVehicleRate, setRowsVehicleRate] = useState([
    {
      id: "",
      invclass: "",
      rate: 0,
      superOptimal: 0,
      CentroCostos: "",
      maximum1: 0,
      minimum1: 0,
      payment1: 0,
      maximum2: 0,
      minimum2: 0,
      payment2: 0,
      maximum3: 0,
      minimum3: 0,
      payment3: 0,
      maximum4: 0,
      minimum4: 0,
      payment4: 0,
    },
  ]);

  const [rowsCostCenterFee, setRowsCostCenterFee] = useState([
    {
      id: "",
      centroCosto: "",
      mantenimiento: 0,
      crecimiento: 0,
      nuevo: 0,
    },
  ]);

  useEffect(() => {
    async function fetchData() {
      setListAccount(await getCustomerAccount());
      setRowsVehicleRate(await getVehicleRate());
      setClasesComerciales(await getClasesComercial());
      setListCostCenter(await getCostCenterFee());

      getRowsCostCenterFee();

      listCustomerCategory();
      setRowCustomerCategory([]);
    }
    fetchData();
  }, []);

  const changeTab = (event, newValue) => {
    setTab(newValue);
  };

  //TODO: TAB 1
  const handleDataTab1 = (event) => {
    setDataTab1({
      ...dataTab1,
      [event.target.name]: event.target.value,
    });
  };

  const sendDataTab1 = async () => {
    if (rowsCostCenterFee.length >= 1) {
      let flag = false;

      if (
        costCenter &&
        dataTab1.mantenimiento &&
        dataTab1.crecimiento &&
        dataTab1.nuevo
      ) {
        rowsCostCenterFee.forEach((item) => {
          if (item.centroCosto == costCenter) {
            flag = true;
          }
        });

        if (flag) {
          console.log(flag);
          messageWarning("Centro de costo ya existe en la lista.");
          clear();
        } else {
          dataTab1.operator = "I";
          dataTab1.centroCosto = costCenter;

          executeCostCenterFee(dataTab1);

          clear();
        }
      } else {
        getAlert();
      }
    } else {
      dataTab1.operator = "I";
      dataTab1.centroCosto = costCenter;

      executeCostCenterFee(dataTab1);

      clear();
    }
  };

  const clear = () => {
    setDataTab1({
      Id: "",
      operator: "",
      centroCosto: "",
      mantenimiento: "",
      crecimiento: "",
      nuevo: "",
    });
    setCostCenter("");
  };

  const deleteRowsCostCenterFee = async (items) => {
    for (let i of items) {
      dataTab1.operator = "D";
      dataTab1.Id = i;

      Swal.fire({
        title: "Deseas eliminar este registro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#092f87",
        cancelButtonColor: "#c8102e",
        confirmButtonText: "Si, eliminar!",
      }).then((result) => {
        if (result.isConfirmed) {
          executeCostCenterFee(dataTab1);

          Swal.fire("Eliminado!", "Operacion realizada con exito.", "success");
        }
      });
    }
  };

  const executeCostCenterFee = async (data) => {
    await costCenterFee(data);

    getRowsCostCenterFee();
  };

  const getRowsCostCenterFee = async () => {
    dataTab1.operator = "S";
    setRowsCostCenterFee(await costCenterFee(dataTab1));
  };

  //TODO: TAB 2
  const changeAccount = (event) => {
    setAccount(event.target.value);
  };

  const handleData = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const listCustomerCategory = async () => {
    const result = await getCustomerCategory(data);

    setRowCustomerCategory(result);
  };

  const createCustomerCategory = async () => {
    data.catCte = account;

    if ((account != "" && data.mantenimiento != "") || data.crecimiento != "") {
      await addCustomerCategory(data);
      listCustomerCategory();

      setData({
        id: "",
        catCte: "",
        crecimiento: "",
        mantenimiento: "",
        nuevo: ''
      });
      setAccount("");
    } else {
      getAlert();
    }
  };

  const handleDeleteCustomerCategory = async (item) => {
    for (let i of item) {
      data.id = i;

      Swal.fire({
        title: "Deseas eliminar este registro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#092f87",
        cancelButtonColor: "#c8102e",
        confirmButtonText: "Si, eliminar!",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteRowCustomerCategory(data);

          Swal.fire("Eliminado!", "Operacion realizada con exito.", "success");
        }
      });
    }
  };

  const deleteRowCustomerCategory = async (data) => {
    await deleteCustomerCategory(data);
    listCustomerCategory();
  };

  //TODO: TAB 3
  const changeClasesComerciales = (event) => {
    setClase(event.target.value);
  };

  const changeCostCenter = (event) => {
    setCostCenter(event.target.value);
  };

  const handleDataTab3 = (event) => {
    setDataTab3({
      ...dataTab3,
      [event.target.name]: event.target.value,
    });
  };

  const searchClass = async () => {
    if (clase && costCenter) {
      for (let item of rowsVehicleRate) {
        if (clase == item.invclass && costCenter == item.CentroCostos) {
          dataTab3.id = item.id;
          dataTab3.invclass = item.invclass;
          dataTab3.rate = item.rate;
          dataTab3.superOptimal = item.superOptimal;
          dataTab3.CentroCostos = item.CentroCostos;
          dataTab3.maximum1 = item.maximum1;
          dataTab3.minimum1 = item.minimum1;
          dataTab3.payment1 = item.payment1;
          dataTab3.maximum2 = item.maximum2;
          dataTab3.minimum2 = item.minimum2;
          dataTab3.payment2 = item.payment2;
          dataTab3.maximum3 = item.maximum3;
          dataTab3.minimum3 = item.minimum3;
          dataTab3.payment3 = item.payment3;
          dataTab3.maximum4 = item.maximum4;
          dataTab3.minimum4 = item.minimum4;
          dataTab3.payment4 = item.payment4;
          setCostCenter(item.CentroCostos);
        }
        setSearch(true);
      }
    } else {
      messageError("Seleccione la categoria y centro de costo a buscar.");
    }
  };

  const sendDataTab3 = async () => {
    if (!validateDataTab3()) {
      operator ? (dataTab3.operator = "I") : (dataTab3.operator = "U");


      if (dataTab3.operator == 'I') {

        let flag = false
        rowsVehicleRate.forEach(item => {
          if (item.invclass == dataTab3.invclass && item.CentroCostos == dataTab3.CentroCostos) {
            flag = true
          } 
        })

        if (flag) {
          messageError('Categoria y centro de costo ya existente.')
        } else {
          await vehicleRate(dataTab3);
        }
      } else {
        await vehicleRate(dataTab3);
      }

      setRowsVehicleRate(await getVehicleRate());
      cancel();
    }
  };

  const handleDeleteVehicleRate = async (item) => {
    for (let i of item) {
      dataTab3.id = i;

      Swal.fire({
        title: "Deseas eliminar este registro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#092f87",
        cancelButtonColor: "#c8102e",
        confirmButtonText: "Si, eliminar!",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteRowVehicleRate(dataTab3);

          Swal.fire("Eliminado!", "Operacion realizada con exito.", "success");
        }
      });
    }
  };

  const deleteRowVehicleRate = async (data) => {
    await deleteVehicleRate(data);
    setRowsVehicleRate(await getVehicleRate());
  };

  const validateDataTab3 = () => {
    if (
      clase &&
      costCenter &&
      dataTab3.rate &&
      dataTab3.superOptimal &&
      dataTab3.minimum1 &&
      dataTab3.maximum1 &&
      dataTab3.minimum2 &&
      dataTab3.maximum2 &&
      dataTab3.minimum3 &&
      dataTab3.maximum3 &&
      dataTab3.minimum4 &&
      dataTab3.maximum4
    ) {
      dataTab3.CentroCostos = costCenter;
      dataTab3.invclass = clase;

      if (
        Number(dataTab3.minimum1) >= Number(dataTab3.maximum1) ||
        Number(dataTab3.minimum2) >= Number(dataTab3.maximum2) ||
        Number(dataTab3.minimum3) >= Number(dataTab3.maximum3) ||
        Number(dataTab3.minimum4) >= Number(dataTab3.maximum4)
      ) {
        messageError("Rangos invalidos...");
        return true;
      }
    } else {
      messageWarning("Todos los campos son obligatorios...");
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

  const cancel = () => {
    setSearch(false);
    setClase("");
    setDataTab3({});
    setCostCenter("");
    setOperator(false);
  };

  return (
    <ContainerComponents
      color="#636466"
      width={1000}
      title="COMERCIAL"
      subTitle="Configuracion Comisiones Corp."
    >
      {alert ? <Alert severity="error">Formulario invalido</Alert> : ""}

      <form className="animate__animated animate__gadeIn animate__faster">
        <Card sx={{ mb: 1, mt: 1 }}>
          <Grid container justifyContent="center">
            <TabContext value={tab}>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <TabList onChange={changeTab} aria-label="lab API tabs example">
                  <Tab label="Por Centro Costo" value="1" />
                  <Tab label="Por Categoria Cliente" value="2" />
                  <Tab label="Por Tarifa Vehiculo" value="3" />
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
                    <FormControl sx={{ m: 2, minWidth: 230 }}>
                      <InputLabel>Centro Costo:</InputLabel>
                      <Select
                        id="grouped-select"
                        label="Centro Costo:"
                        value={costCenter}
                        onChange={changeCostCenter}
                        variant="outlined"
                        // name="departament"
                      >
                        {listCostCenter.map((item, index) => {
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
                        label="Mantenimiento %:"
                        id="outlined-start-adornment"
                        value={dataTab1.mantenimiento}
                        onChange={handleDataTab1}
                        variant="outlined"
                        name="mantenimiento"
                        type="number"
                      />
                    </FormControl>

                    <FormControl
                      sx={{ m: 2, width: "25ch" }}
                      variant="outlined"
                    >
                      <TextField
                        label="Crecimiento %:"
                        id="outlined-start-adornment"
                        value={dataTab1.crecimiento}
                        onChange={handleDataTab1}
                        variant="outlined"
                        name="crecimiento"
                        type="number"
                      />
                    </FormControl>

                    <FormControl
                      sx={{ m: 2, width: "25ch" }}
                      variant="outlined"
                    >
                      <TextField
                        label="Nuevo %:"
                        id="outlined-start-adornment"
                        value={dataTab1.nuevo}
                        onChange={handleDataTab1}
                        variant="outlined"
                        name="nuevo"
                        type="number"
                      />
                    </FormControl>

                    <FormControl
                      sx={{ width: "15ch", mt: 3 }}
                      variant="outlined"
                    >
                      <Button
                        className="btn-info"
                        variant="contained"
                        endIcon={<NavigateNextIcon />}
                        onClick={() => {
                          sendDataTab1();
                        }}
                      >
                        Continuar
                      </Button>
                    </FormControl>

                    <FormControl
                      sx={{ height: 450, width: "392%", m: 1, mt: 3 }}
                    >
                      <DataGrid
                        rows={rowsCostCenterFee}
                        columns={columnsCentroCosto}
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
                          deleteRowsCostCenterFee(e);
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
                    <FormControl sx={{ m: 2, minWidth: 230 }}>
                      <InputLabel>Cuenta:</InputLabel>
                      <Select
                        id="grouped-select"
                        label="Cuenta:"
                        value={account}
                        onChange={changeAccount}
                        variant="outlined"
                        name="departament"
                      >
                        {listAccount.map((item, index) => {
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
                        label="Mantenimiento %:"
                        id="outlined-start-adornment"
                        value={data.mantenimiento}
                        onChange={handleData}
                        variant="outlined"
                        name="mantenimiento"
                        type="number"
                      />
                    </FormControl>
                    <FormControl
                      sx={{ m: 2, width: "25ch" }}
                      variant="outlined"
                    >
                      <TextField
                        label="Crecimiento %:"
                        id="outlined-start-adornment"
                        value={data.crecimiento}
                        onChange={handleData}
                        variant="outlined"
                        name="crecimiento"
                        type="number"
                      />
                    </FormControl>
                    <FormControl
                      sx={{ m: 2, width: "25ch" }}
                      variant="outlined"
                    >
                      <TextField
                        label="Nuevo %:"
                        id="outlined-start-adornment"
                        value={data.nuevo}
                        onChange={handleData}
                        variant="outlined"
                        name="nuevo"
                        type="number"
                      />
                    </FormControl>
                    <FormControl
                      sx={{ width: "15ch", mt: 3 }}
                      variant="outlined"
                    >
                      <Button
                        className="btn-info"
                        variant="contained"
                        endIcon={<NavigateNextIcon />}
                        onClick={() => {
                          createCustomerCategory();
                        }}
                      >
                        Continuar
                      </Button>
                    </FormControl>

                    <Box
                      sx={{
                        height: 300,
                        width: "80ch",
                        mt: 3,
                      }}
                    >
                      <DataGrid
                        rows={rowCustomerCategory}
                        columns={columnsCustomerCategory}
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
                          handleDeleteCustomerCategory(e);
                        }}
                      />
                    </Box>
                  </Box>
                </TabPanel>
              </Grid>

              <Grid item xs={12}>
                <TabPanel value="3">
                  {!search ? (
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                      }}
                    >
                      <FormControl sx={{ m: 1, minWidth: 250, mt: 3 }}>
                        <InputLabel>Categoria:</InputLabel>
                        <Select
                          id="grouped-select"
                          label="Categoria:"
                          value={clase}
                          onChange={changeClasesComerciales}
                          variant="outlined"
                          name="clase"
                        >
                          {clasesComerciales.map((item, index) => {
                            return (
                              <MenuItem value={item.name} key={index}>
                                {item.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>

                      <FormControl sx={{ m: 3, minWidth: 230 }}>
                        <InputLabel>Centro Costo:</InputLabel>
                        <Select
                          id="grouped-select"
                          label="Centro Costo:"
                          value={costCenter}
                          onChange={changeCostCenter}
                          variant="outlined"
                          // name="departament"
                        >
                          {listCostCenter.map((item, index) => {
                            return (
                              <MenuItem value={item.name} key={index}>
                                {item.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>

                      <FormControl
                        sx={{ m: 1, width: "15ch", mt: 4 }}
                        variant="outlined"
                      >
                        <Button
                          className="btn-info"
                          endIcon={<ZoomInIcon />}
                          onClick={() => {
                            searchClass();
                          }}
                          variant="contained"
                        >
                          Buscar
                        </Button>
                      </FormControl>
                      <FormControl
                        sx={{ m: 1, width: "20ch", mt: 4 }}
                        variant="outlined"
                      >
                        <Button
                          className="btn-info"
                          endIcon={<AddBoxIcon />}
                          onClick={() => {
                            setSearch(true);
                            setOperator(true);
                          }}
                          variant="contained"
                        >
                          Crear tarifa
                        </Button>
                      </FormControl>

                      <FormControl
                        sx={{ height: 450, width: "392%", m: 1, mt: 3 }}
                      >
                        <DataGrid
                          rows={rowsVehicleRate}
                          columns={columnsTarifaVehiculo}
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
                            handleDeleteVehicleRate(e);
                          }}
                        />
                      </FormControl>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                      }}
                    >
                      <FormControl sx={{ m: 2, minWidth: 230 }}>
                        <InputLabel>Categoria:</InputLabel>
                        <Select
                          id="grouped-select"
                          label="Categoria:"
                          value={clase}
                          onChange={changeClasesComerciales}
                          variant="outlined"
                          name="clase"
                        >
                          {clasesComerciales.map((item, index) => {
                            return (
                              <MenuItem value={item.name} key={index}>
                                {item.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                      <FormControl sx={{ m: 2, minWidth: 230 }}>
                        <InputLabel>Centro Costo:</InputLabel>
                        <Select
                          id="grouped-select"
                          label="Centro Costo:"
                          value={costCenter}
                          onChange={changeCostCenter}
                          variant="outlined"
                          // name="departament"
                        >
                          {listCostCenter.map((item, index) => {
                            return (
                              <MenuItem value={item.name} key={index}>
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
                          label="Tarifa:"
                          value={dataTab3.rate}
                          onChange={handleDataTab3}
                          name="rate"
                          id="formatted-numberformat-input"
                          InputProps={{
                            inputComponent: NumericFormatCustom,
                          }}
                          variant="outlined"
                        />
                      </FormControl>
                      <FormControl
                        sx={{ m: 1, width: "25ch", mt: 2 }}
                        variant="outlined"
                      >
                        <TextField
                          label="Tarifa Super Optima:"
                          value={dataTab3.superOptimal}
                          onChange={handleDataTab3}
                          name="superOptimal"
                          id="formatted-numberformat-input"
                          InputProps={{
                            inputComponent: NumericFormatCustom,
                          }}
                          variant="outlined"
                        />
                      </FormControl>
                      <FormControl
                        sx={{ m: 1, width: "15ch", mt: 3 }}
                        variant="outlined"
                      >
                        <Button
                          className="btn-info"
                          endIcon={<NavigateNextIcon />}
                          onClick={() => {
                            sendDataTab3();
                          }}
                          variant="contained"
                        >
                          Continuar
                        </Button>
                      </FormControl>
                      <FormControl
                        sx={{ m: 1, width: "15ch", mt: 3 }}
                        variant="outlined"
                      >
                        <Button
                          className="btn-cancel"
                          endIcon={<CancelPresentationIcon />}
                          onClick={() => {
                            cancel();
                          }}
                          variant="contained"
                        >
                          Cancelar
                        </Button>
                      </FormControl>

                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "center",
                        }}
                      >
                        <FormControl sx={{ m: 1, mt: 4 }}>
                          <InputLabel htmlFor="outlined-adornment-amount">
                            Minimo:
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={
                              <InputAdornment position="start">
                                %
                              </InputAdornment>
                            }
                            label="Minimo:"
                            value={dataTab3.minimum1}
                            onChange={handleDataTab3}
                            name="minimum1"
                            type="number"
                          />
                        </FormControl>

                        <FormControl sx={{ m: 2, mt: 4 }}>
                          <InputLabel htmlFor="outlined-adornment-amount">
                            Maximo:
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={
                              <InputAdornment position="start">
                                %
                              </InputAdornment>
                            }
                            label="Maximo:"
                            value={dataTab3.maximum1}
                            onChange={handleDataTab3}
                            type="number"
                            name="maximum1"
                          />
                        </FormControl>

                        <FormControl sx={{ m: 1, mt: 4 }}>
                          <InputLabel htmlFor="outlined-adornment-amount">
                            Comision:
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            }
                            label="Comision:"
                            value={dataTab3.payment1}
                            onChange={handleDataTab3}
                            type="number"
                            name="payment1"
                          />
                        </FormControl>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "center",
                        }}
                      >
                        <FormControl sx={{ m: 1, mt: 4 }}>
                          <InputLabel htmlFor="outlined-adornment-amount">
                            Minimo:
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={
                              <InputAdornment position="start">
                                %
                              </InputAdornment>
                            }
                            label="Minimo:"
                            value={dataTab3.minimum2}
                            onChange={handleDataTab3}
                            type="number"
                            name="minimum2"
                          />
                        </FormControl>

                        <FormControl sx={{ m: 2, mt: 4 }}>
                          <InputLabel htmlFor="outlined-adornment-amount">
                            Maximo:
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={
                              <InputAdornment position="start">
                                %
                              </InputAdornment>
                            }
                            label="Maximo:"
                            value={dataTab3.maximum2}
                            onChange={handleDataTab3}
                            type="number"
                            name="maximum2"
                          />
                        </FormControl>

                        <FormControl sx={{ m: 1, mt: 4 }}>
                          <InputLabel htmlFor="outlined-adornment-amount">
                            Comision:
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            }
                            label="Comision:"
                            value={dataTab3.payment2}
                            onChange={handleDataTab3}
                            type="number"
                            name="payment2"
                          />
                        </FormControl>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "center",
                        }}
                      >
                        <FormControl sx={{ m: 1, mt: 4 }}>
                          <InputLabel htmlFor="outlined-adornment-amount">
                            Minimo:
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={
                              <InputAdornment position="start">
                                %
                              </InputAdornment>
                            }
                            label="Minimo:"
                            value={dataTab3.minimum3}
                            onChange={handleDataTab3}
                            type="number"
                            name="minimum3"
                          />
                        </FormControl>

                        <FormControl sx={{ m: 2, mt: 4 }}>
                          <InputLabel htmlFor="outlined-adornment-amount">
                            Maximo:
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={
                              <InputAdornment position="start">
                                %
                              </InputAdornment>
                            }
                            label="Maximo:"
                            value={dataTab3.maximum3}
                            onChange={handleDataTab3}
                            type="number"
                            name="maximum3"
                          />
                        </FormControl>

                        <FormControl sx={{ m: 1, mt: 4 }}>
                          <InputLabel htmlFor="outlined-adornment-amount">
                            Comision:
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            }
                            label="Comision:"
                            value={dataTab3.payment3}
                            onChange={handleDataTab3}
                            type="number"
                            name="payment3"
                          />
                        </FormControl>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "center",
                        }}
                      >
                        <FormControl sx={{ m: 1, mt: 4 }}>
                          <InputLabel htmlFor="outlined-adornment-amount">
                            Minimo:
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={
                              <InputAdornment position="start">
                                %
                              </InputAdornment>
                            }
                            label="Minimo:"
                            value={dataTab3.minimum4}
                            onChange={handleDataTab3}
                            type="number"
                            name="minimum4"
                          />
                        </FormControl>

                        <FormControl sx={{ m: 2, mt: 4 }}>
                          <InputLabel htmlFor="outlined-adornment-amount">
                            Maximo:
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={
                              <InputAdornment position="start">
                                %
                              </InputAdornment>
                            }
                            label="Maximo:"
                            value={dataTab3.maximum4}
                            onChange={handleDataTab3}
                            type="number"
                            name="maximum4"
                          />
                        </FormControl>

                        <FormControl sx={{ m: 1, mt: 4 }}>
                          <InputLabel htmlFor="outlined-adornment-amount">
                            Comision:
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            }
                            label="Comision:"
                            value={dataTab3.payment4}
                            onChange={handleDataTab3}
                            type="number"
                            name="payment4"
                          />
                        </FormControl>
                      </Box>
                    </Box>
                  )}
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
      prefix="$"
    />
  );
});

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  border: "8px solid #636466",
  boxShadow: 24,
};

export default ConfigComisiones;