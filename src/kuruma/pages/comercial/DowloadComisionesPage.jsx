import { useState } from "react";
import { Box, Button, Card, FormControl } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import dayjs from "dayjs";

import ContainerComponents from "../../components/ContainerComponents";
import { messages } from "../../../hooks";
import { comercial } from "../../../hooks/comercial/comercial";
import ProgressModal from "../../components/ProgressModal";

const DowloadComisionesPage = () => {
  const { messageError } = messages();
  const { reportCorp } = comercial();

  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [modal, setModal] = useState(false);

  const search = async () => {
    if (dateFrom != undefined && dateTo != undefined) {
      if (formatDate(dateFrom) <= formatDate(dateTo)) {
        const data = {
          fromDate: formatDate(dateFrom),
          toDate: formatDate(dateTo),
        };

        downloadReportCorp(data);
      } else {
        messageError("Error, fechas no validas...");
      }
    } else {
      messageError("Error, se debe seleccionar fecha desde y hasta...");
    }
  };

  const downloadReportCorp = async (data) => {
    setModal(true);

    await reportCorp(data);

    setDateFrom(null);
    setDateTo(null);
    setModal(false);
  };

  const formatDate = (date) => {
    return dayjs(date);
  };

  return (
    <ContainerComponents
      color="#636466"
      width={900}
      title="COMERCIAL"
      subTitle="Descargar Comisiones Corp."
    >
      <Card sx={{ mb: 1, mt: 1 }}>
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
      <ProgressModal open={modal} />
    </ContainerComponents>
  );
};

export default DowloadComisionesPage;