import UploadFileIcon from '@mui/icons-material/UploadFile';
import JoinRightIcon from '@mui/icons-material/JoinRight';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, ButtonGroup, Card, CardHeader, Grid } from "@mui/material";

import { useState } from "react";
import ContainerComponents from "../../components/ContainerComponents";

import { panapass, messages } from "../../../hooks";
import ProgressModal from "../../components/ProgressModal";

const PanapassPage = () => {
  const { uploadFiles, processMatchPanapass, loadToIntelisis } = panapass();

  const [modal, setModal] = useState(false);
  const [file, setFile] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const onSubmit = async () => {
    setModal(true);
    await uploadFiles();
    setModal(false);
  };

  const processMatch = async (flagRollover) => {
    setModal(true);
    await processMatchPanapass(flagRollover);
    setModal(false);
  };

  const uploadFile = async () => {
    setModal(true);
    await loadToIntelisis(file);
    setModal(false);
    setDisabled(true);
  };

  const fileSelected = (event) => {
    setFile(event.target.files[0]);
    setDisabled(false);
  };

  return (
    <ContainerComponents
      color="#636466"
      width={680}
      title="FINANZAS"
      subTitle="Match-Panapass"
    >
      <Card sx={{ mb: 1, mt: 1 }}>
        <Grid
          container
          sx={{ mb: 2, mt: 4 }}
          direction="row"
          justifyContent="center"
        >
          <ButtonGroup
            disableElevation
            variant="outlined"
            aria-label="Disabled elevation buttons"
          >
            <Button
              className="btn-info"
              onClick={() => {
                onSubmit();
              }}
              endIcon={<UploadFileIcon />}
            >
              Subir Archivos ENA
            </Button>

            <Button
              className="btn-info"
              onClick={() => {
                processMatch(false);
              }}
              endIcon={<JoinRightIcon />}
            >
              Reporte MatchPanapass
            </Button>

            <Button
              className="btn-info"
              onClick={() => {
                processMatch(true);
              }}
              endIcon={<SaveAltIcon />}
            >
              Reporte Rollover
            </Button>
          </ButtonGroup>
        </Grid>

        <Grid container direction="row" justifyContent="center">
          <Grid item xs={12} sx={{ mb: 4, mt: 1 }}>
            <input
              type="file"
              id="fileUpload"
              className="input-search"
              onChange={() => {
                fileSelected(event);
              }}
              accept=".xls,.xlsx"
            />
          </Grid>

          <Grid sx={{ mb: 4 }}>
            <Button
              className="btn-info"
              onClick={() => {
                uploadFile();
              }}
              endIcon={<CloudUploadIcon />}
              disabled={disabled}
              variant="contained"
            >
              Cargar Intelisis
            </Button>
          </Grid>
        </Grid>
      </Card>

      <ProgressModal open={modal} />
    </ContainerComponents>
  );
};

export default PanapassPage;
