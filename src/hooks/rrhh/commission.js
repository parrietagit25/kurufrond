import { useDispatch } from "react-redux";
import { read, utils } from "xlsx";

import configApi from "../../api/configApi";
import { onLogout, clearErrorMessage } from "../../store/auth";
import { messages } from "../";
import { downloadFileTotal } from "./downloadFileTotal";

export const commission = () => {
  const dispatch = useDispatch();

  const { messageError, messageSuccess, messageWarning} = messages();

  const commissionDataReview = async (data) => {
    try {

      const resul = await configApi.post("/commissionDataReview", data);

      const { status } = resul.data;

      status.id == 200
        ? messageSuccess(status.name)
        : messageError(status.name);
    } catch (error) {
      dispatch(onLogout(error.code));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const fileUploadCommission = async (file) => {
    try {
      const reader = new FileReader();

      reader.readAsBinaryString(file);

      reader.onload = async (event) => {
        let binaryData = event.target?.result;
        let workbook = read(binaryData, { type: "binary" });

        const dataExcel = utils.sheet_to_json(workbook.Sheets["Hoja1"]);

        const listEmployee = JSON.parse(JSON.stringify(dataExcel));

        const data = {
          flag: true,
          employees: listEmployee,
        };

        const resul = await configApi.post("/commissionDataReview", data);

        const { status } = resul.data;

        if (status.id == 200) {
          messageSuccess(status.name);
        } else {
          messageError(status.name);

          setTimeout(() => {
            window.location.reload(true);
          }, 1500);
        }
      };
    } catch (error) {
      dispatch(onLogout(error.code));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const getCommissionByDate = async (data) => {
    try {
      const resul = await configApi.post("/get-commission-by-date", data);

      const { status, dataList } = resul.data;

      status.id == 200
        ? messageSuccess(status.name)
        : messageError(status.name);

      return dataList;
    } catch (error) {
      dispatch(onLogout(error.code));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const sendFilePayday = async (dateCommission) => {
    try {
      const resul = await configApi.get(
        "/download-file-payday/" + dateCommission
      );

      const { status } = resul.data;

      status.id == 200
        ? messageSuccess(status.name)
        : messageError(status.name);
    } catch (error) {
      dispatch(onLogout(error.code));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const totalCommissionReport = async (data) => {
    try {
      const resul = await configApi.post("/total-commission-report", data);

      const { status, listData } = resul.data;

      if (status.id == 200) {
        downloadFileTotal(listData, `totalCommissionReport.xlsx`);
        messageSuccess(status.name);
      } else {
        messageError(status.name);
      }
    } catch (error) {
      dispatch(onLogout(error.code));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const searchHistory = async (data) => {

    try {

      const resul = await configApi.post("/historical-report", data);

      const { status, listData } = resul.data;

      if (status.id == 200) {

        if (listData.length > 0) {
          downloadFileTotal(listData, `reporteHistorico.xlsx`);
          messageSuccess(status.name);
        } else {
          messageWarning('No hay data en el rango de fecha seleccionado...')
        }
        
      } else {
        messageError(status.name);
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
    commissionDataReview,
    fileUploadCommission,
    getCommissionByDate,
    sendFilePayday,
    totalCommissionReport,
    searchHistory
  };
};