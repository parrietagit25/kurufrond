import { useDispatch } from "react-redux";

import { onLogout, clearErrorMessage } from "../../store/auth";
import { messages } from "../";
import configApi from "../../api/configApi";

export const admission = () => {
  const dispatch = useDispatch();

  const { messageError, messageSuccess } = messages();

  const searchData = async (data) => {
    try {
      data.operator = "S";

      const resul = await configApi.post("/admission", data);

      const { status } = resul.data;

      status.id == 200
        ? messageSuccess(status.name)
        : messageError(status.name);

      return resul.data.data;
    } catch (error) {
      dispatch(onLogout(error.code));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const createAdmission = async (data) => {
    data.operator = "I";

    console.log(data);

    const resul = await configApi.post("/admission", data);

    const { status } = resul.data;

    status.id == 200 ? messageSuccess(status.name) : messageError(status.name);
  };

  const updateAdmission = async (data) => {
    data.operator = "U";

    console.log(data);

    const resul = await configApi.post("/admission", data);

    const { status } = resul.data;

    status.id == 200 ? messageSuccess(status.name) : messageError(status.name);
  };

  return {
    //* Propiedades

    //* Metodos
    searchData,
    createAdmission,
    updateAdmission,
  };
};
