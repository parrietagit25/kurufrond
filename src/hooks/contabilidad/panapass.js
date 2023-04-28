import { useDispatch } from "react-redux";
import { read, utils } from 'xlsx';

import configApi from "../../api/configApi";
import { onLogout, clearErrorMessage } from "../../store/auth";
import { dowloadExcel, messages } from "..";

export const panapass = () => {
  const dispatch = useDispatch();

  const { messageError, messageSuccess } = messages()

  const uploadFiles = async () => {
    try {
      const resul = await configApi.get("/clear-tables");

      const { status } = resul.data;

      if (status.id == 200) {
        const resUploadFiles = await configApi.post("/upload-files");

        if (resUploadFiles.data.status.id == 200) {
          processENA();
        }
      } else {
        messageError(status.name)
      }
    } catch (error) {
      dispatch(onLogout(error.code));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const processENA = async () => {
    try {
      const result = await configApi.get("/process-ena");

      const { status } = result.data;

      if (status.id == 200) {
        processRentWork();
      } else {
        messageError(status.name)
      }
    } catch (error) {
      dispatch(onLogout(error.code));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const processRentWork = async () => {
    try {

      const result = await configApi.get("/process-tb-rentWork");

      const { status } = result.data;

      if (status.id == 200) {
        messageSuccess(status.name)
      } else {
        messageError(status.name)
      }
    } catch (error) {
      dispatch(onLogout(error.code));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const processMatchPanapass = async (flagRollover) => {
    try {
      const result = await configApi.get("/process-match-panapass/" + flagRollover);

      const { data, status } = result.data;

      const listRollover = []

      if (status.id == 200) {
        if (flagRollover) {

          for ( let item of data ) {

            if (item.Rollover == '1') {
              listRollover.push(item)
            }
          }

          dowloadExcel(listRollover)
          messageSuccess(status.name)

        } else {
          dowloadExcel(data)
          messageSuccess(status.name)
        }
        
      } else {
        messageError(status.name)
      }
    } catch (error) {
      dispatch(onLogout(error.code));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const loadToIntelisis = async (file) => {

    try {

      const reader = new FileReader();

      reader.readAsBinaryString(file);

      reader.onload = async (event) => {
        let binaryData = event.target?.result;
        let workbook = read(binaryData, { type: 'binary' });

        const data = utils.sheet_to_json(workbook.Sheets['CARGA']);

        const dataList = JSON.parse(JSON.stringify(data));

        const resul = await configApi.post("/load-to-intelisis/", dataList);

        resul.status.id === 200 ? messageSuccess(resul.status.name) : messageError(resul.status.name)
      }

    } catch (error) {
      dispatch(onLogout(error.code));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  }

  return {
    //* Propiedades

    //* Metodos
    uploadFiles,
    processMatchPanapass,
    loadToIntelisis
  };
};