import { useEffect, useState } from "react";
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
import ContainerComponents from "../../components/ContainerComponents";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { DataGrid } from "@mui/x-data-grid";
import { columnsCustomerCategory } from "../../../util/nameColumnsTable";
import { commonServices, comercial } from "../../../hooks";

const ConfigComisiones = () => {
  const { getCustomerAccount } = commonServices();
  const { addCustomerCategory, getCustomerCategory, deleteCustomerCategory } =
    comercial();

  const [alert, setAlert] = useState(false);
  const [tab, setTab] = useState("1");
  const [listAccount, setListAccount] = useState([{}]);
  const [account, setAccount] = useState("");
  const [data, setData] = useState({
    id: "",
    operator: "",
    catCte: "",
    mantenimiento: "",
    crecimiento: "",
  });

  const [rows, setRows] = useState([
    {
      id: "",
      catCte: "",
      mantenimiento: 0,
      crecimiento: 0,
    },
  ]);

  useEffect(() => {
    async function fetchData() {
      setListAccount(await getCustomerAccount());

      listCustomerCategory();

      setRows([]);
    }
    fetchData();
  }, []);

  const changeTab = (event, newValue) => {
    setTab(newValue);
  };

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

    setRows(result);
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
      });
      setAccount("");
    } else {
      getAlert();
    }
  };

  const handleDeleteRow = async (item) => {
    data.id = item.row.id;

    await deleteCustomerCategory(data);
    listCustomerCategory();
  };

  const getAlert = () => {
    setAlert(true);

    setTimeout(() => {
      setAlert(false);
    }, 500);
  };

  return (
    <ContainerComponents
      color="#636466"
      width={900}
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
                <TabPanel value="1"></TabPanel>
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
                      sx={{ m: 1, width: "15ch", mt: 1, mb: 4 }}
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
                        CREAR
                      </Button>
                    </FormControl>

                    <Box
                      sx={{
                        height: 300,
                        width: "78ch",
                      }}
                    >
                      <DataGrid
                        rows={rows}
                        columns={columnsCustomerCategory}
                        initialState={{
                          pagination: {
                            paginationModel: {
                              pageSize: 5,
                            },
                          },
                        }}
                        pageSizeOptions={[5]}
                        onRowClick={(e) => {
                          handleDeleteRow(e);
                        }}
                      />
                    </Box>
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

export default ConfigComisiones;
