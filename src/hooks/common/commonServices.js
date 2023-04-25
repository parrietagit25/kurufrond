import { useDispatch } from "react-redux";

import configApi from "../../api/configApi";
import { onLogout, clearErrorMessage } from "../../store/auth";
import { messages } from "..";

export const commonServices = () => {
  const dispatch = useDispatch();

  const { messageError } = messages();

  const getDepartment = async () => {
    try {
      const resul = await configApi.get("/get-department");

      const { status, data } = resul.data;

      if (status.id == 200) {
        return data;
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

  const getAllApartments = async () => {
    try {
      const resul = await configApi.get("/get-all-apartments");

      const { status, data } = resul.data;

      if (status.id == 200) {
        return data;
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

  const getEmployee = async () => {
    try {
      const resul = await configApi.get("/get-employee");

      const { status, data } = resul.data;

      if (status.id == 200) {
        return data;
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

  const getCustomerAccount = async () => {
    try {
      const resul = await configApi.get("/get-cte-cat-PCR");

      const { status, data } = resul.data;

      if (status.id == 200) {
        return data;
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
  const getClasesComercial = async () => {
    try {
      const resul = await configApi.get("/get-clases-comercial");

      const { status, data } = resul.data;

      if (status.id == 200) {
        return data;
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

  const getCostCenterFee = async () => {
    try {
      const resul = await configApi.get("/get-cost-center-fee");

      const { status, data } = resul.data;

      if (status.id == 200) {
        return data;
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

  const getRoles = async () => {
    try {
      
      const resul = await configApi.get("/get-user-roles");

      const { status, data } = resul.data;

      if (status.id == 200) {
        return data;
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
    getDepartment,
    getAllApartments,
    getEmployee,
    getCustomerAccount,
    getClasesComercial,
    getCostCenterFee,
    getRoles
  };
};
