import { useDispatch } from "react-redux";

import { onLogout, clearErrorMessage } from "../../store/auth";
import { messages } from "..";
import configApi from "../../api/configApi";
import { dowloadExcelComercial } from "./dowloadExcelComercial";

export const comercial = () => {
  const dispatch = useDispatch();

  const { messageError, messageSuccess } = messages();

  const reportCorp = async (data) => {
    try {
      const resul = await configApi.post("/download-report-corp", data);

      const { status } = resul.data;

      if (status.id == 200) {
        dowloadExcelComercial(resul.data.data);
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

  const addCustomerCategory = async (data) => {
    try {
      data.operator = "I";

      const resul = await configApi.post("/cat-cte-fee", data);

      const { status } = resul.data;

      status.id == 200
        ? messageSuccess(status.name)
        : messageError(status.name);
    } catch (error) {
      messageError("Registro invalido...");
    }
  };

  const getCustomerCategory = async (data) => {
    try {
      data.operator = "S";

      const resul = await configApi.post("/cat-cte-fee", data);

      const { status } = resul.data;

      if (status.id == 200) {
        return resul.data.data;
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

  const deleteCustomerCategory = async (data) => {
    try {
      data.operator = "D";

      const resul = await configApi.post("/cat-cte-fee", data);

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

  const getVehicleRate = async () => {
    try {
      const data = {
        operator: "S",
      };

      const resul = await configApi.post("/vehicle-rate", data);

      const { status } = resul.data;

      if (status.id == 200) {
        return resul.data.data;
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

  const vehicleRate = async (dataTab3) => {
    try {
      const resul = await configApi.post("/vehicle-rate", dataTab3);

      const { status } = resul.data;

      if (status.id == 200) {
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

  const deleteVehicleRate = async (data) => {
    try {
      data.operator = "D";

      const resul = await configApi.post("/vehicle-rate", data);

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

  const costCenterFee = async (data) => {
    try {
      const resul = await configApi.post("/cost-center-fee", data);

      const { status } = resul.data;

      if (status.id == 200) {
        return resul.data.data;
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

  return {
    //* Propiedades

    //* Metodos
    reportCorp,
    addCustomerCategory,
    getCustomerCategory,
    deleteCustomerCategory,
    getVehicleRate,
    vehicleRate,
    deleteVehicleRate,
    costCenterFee,
  };
};
