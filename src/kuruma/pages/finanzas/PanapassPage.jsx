import JoinRightIcon from "@mui/icons-material/JoinRight";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, Card, Grid } from "@mui/material";

import { useState } from "react";
import ContainerComponents from "../../components/ContainerComponents";

import { panapass } from "../../../hooks";
import ProgressModal from "../../components/ProgressModal";

const PanapassPage = () => {
  const { processMatchPanapass, loadToIntelisis } = panapass();

  const [modal, setModal] = useState(false);

  const processMatch = async (flagRollover) => {
    setModal(true);
    await processMatchPanapass(flagRollover);
    setModal(false);
  };

  const uploadIntelisis = async () => {
    setModal(true);
    await loadToIntelisis();

    setTimeout(async () => {
      setModal(false);
    }, 5000);
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
          <Button
            className="btn-info"
            onClick={() => {
              processMatch(false);
            }}
            endIcon={<JoinRightIcon />}
            variant="contained"
            sx={{ mr: 2 }}
          >
            Reporte MatchPanapass
          </Button>
          <Button
            className="btn-info"
            onClick={() => {
              processMatch(true);
            }}
            endIcon={<SaveAltIcon />}
            variant="contained"
          >
            Reporte Rollover
          </Button>
        </Grid>

        <Grid container direction="row" justifyContent="center">
          <Grid sx={{ mb: 4, mt: 2 }}>
            <Button
              className="btn-info"
              onClick={() => {
                uploadIntelisis();
              }}
              endIcon={<CloudUploadIcon />}
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
