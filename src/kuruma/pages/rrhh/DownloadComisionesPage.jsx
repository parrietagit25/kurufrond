import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Card,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

import ContainerComponents from "../../components/ContainerComponents";
import { columnsCommission } from "../../../util/nameColumnsTable";
import { commonServices, commission, messages } from "../../../hooks";
import ProgressModal from "../../components/ProgressModal";
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';


const DownloadComisionesPage = () => {

  const { messageError } = messages()
  const { getAllApartments } = commonServices();
  const { getCommissionByDate, sendFilePayday, totalCommissionReport, searchHistory } =
    commission();

  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [listDepartament, setListDepartament] = useState([{}]);
  const [departament, setDepartament] = useState("");
  const [dateValues, setDateValues] = useState(null);
  const [grandTotal, setGrandTotal] = useState(0);
  const [modal, setModal] = useState(false);
  const [historyModal, setHistoryModal] = useState(false)
  const [alert, setAlert] = useState(false);
  const [disabled, setDisabled] = useState(true);
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
      dateCommisionFormt: "",
    },
  ]);

  useEffect(() => {
    async function fetchData() {
      setListDepartament(await getAllApartments());

    }
    fetchData();
  }, []);

  const changeDepartament = (event) => {
    setDepartament(event.target.value);
  };

  const getCommission = async () => {
    if (departament && dateValues) {
      setDisabled(false);
      const { $M, $y } = dateValues;

      const data = {
        month: $M + 1,
        year: $y,
        departament: departament,
        operator: departament == "TODOS" ? "S" : "S-A",
      };

      const dataList = await getCommissionByDate(data);

      mapperData(dataList);
    } else {
      setAlert(true);

      setTimeout(() => {
        setAlert(false);
      }, 500);
    }
  };

  const mapperData = (dataList) => {
    setRows(dataList);

    setGrandTotal(dataList.reduce((a, v) => (a = a + v.total), 0));
  };

  const downloadFilePayday = async () => {
    setModal(true);
    await sendFilePayday(rows[0].dateCommisionFormt);
    setModal(false);
  };

  const downloadTotalCommission = async () => {
    const { $M, $y } = dateValues;

    const data = {
      month: $M + 1,
      year: $y,
      departmentName: departament,
    };
    setModal(true);
    await totalCommissionReport(data);
    setModal(false);
  };


  const search = async () => {
    if (dateFrom != undefined && dateTo != undefined) {
      if (formatDate(dateFrom) <= formatDate(dateTo)) {

        setHistoryModal(true)
        
       await searchHistory(formatDate(dateFrom), formatDate(dateTo));

       setHistoryModal(false)

       setDateFrom(null)
       setDateTo(null)

      } else {
        messageError("Error, fechas no validas...");
        setHistoryModal(false)
      }
    } else {
      messageError("Error, se debe seleccionar fecha desde y hasta...");
      setHistoryModal(false)
    }
  };

  const formatDate = (date) => {
    return dayjs(date);
  };

  const handleClose = () => setHistoryModal(false)

  return (
    <ContainerComponents
      color="#636466"
      width={1250}
      title="RRHH"
      subTitle="Descargar Comisiones"
    >
      {alert ? (
        <Alert severity="warning">Selecione fecha y departamento</Alert>
      ) : (
        ""
      )}
      <form className="animate__animated animate__gadeIn animate__faster">
        <Card sx={{ mb: 1, mt: 1 }}>
          <Box
            sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
          >

          <FormControl sx={{ m: 1, minWidth: 200, mt: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ m: 1 }}
                label={"Seleccione la fecha"}
                views={["month", "year"]}
                value={dateValues}
                onChange={(newValue) => setDateValues(newValue)}
              />
            </LocalizationProvider>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 200, mt: 3 }}>
            <InputLabel>Departamento</InputLabel>
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
          <FormControl
            sx={{ m: 1, width: "15ch", mt: 4 }}
            variant="outlined"
          >
            <Button
              className="btn-info"
              endIcon={<ZoomInIcon />}
              onClick={() => {
                getCommission();
              }}
              variant="contained"
            >
              Buscar
            </Button>
          </FormControl>

          <FormControl
            sx={{ m: 1, width: "15ch", mt: 3 }}
            variant="outlined"
          >
            <Button
              className="btn-info"
              endIcon={<MarkEmailReadIcon />}
              disabled={disabled}
              onClick={() => {
                downloadFilePayday();
              }}
              variant="contained"
            >
              Reporte Payday
            </Button>
          </FormControl>
          <FormControl
            sx={{ m: 1, width: "15ch", mt: 3 }}
            variant="outlined"
          >
            <Button
              className="btn-info"
              endIcon={<SaveAltIcon />}
              disabled={disabled}
              onClick={() => {
                downloadTotalCommission();
              }}
              variant="contained"
            >
              Total Depart...
            </Button>
          </FormControl>
          <FormControl
            sx={{ m: 1, width: "15ch", mt: 3 }}
            variant="outlined"
          >
            <Button
              className="btn-info"
              endIcon={<WorkHistoryIcon />}
              variant="contained"
              onClick={() => {
                 setHistoryModal(true)
              }}
            >
              Reporte Historico
            </Button>
          </FormControl>
         
          <Box sx={{ height: 450, width: "392%", m: 1 }}>
            <DataGrid
              rows={rows}
              columns={columnsCommission}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10]}
            />
          </Box>

          <FormControl sx={{ mb: 1, mt: 2 }}>
              <InputLabel htmlFor="outlined-adornment-amount">Total General:</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Total General:"
                value={grandTotal}
                disabled
              />
            </FormControl>

            </Box>
        </Card>
      </form>
      <ProgressModal open={modal} />
      

      <Modal
      open={historyModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      <Card>
        <Box
          sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
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

          <FormControl sx={{ m: 1, width: "15ch", mt: 4 }} variant="outlined">
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
      </Card>
      </Box>
    </Modal>

    </ContainerComponents>
  );
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

export default DownloadComisionesPage;