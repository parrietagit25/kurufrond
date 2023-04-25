import { useDispatch } from "react-redux";
import { messages } from "..";
import configApi from "../../api/configApi";
import { onLogout } from "../../store/auth";

export const user = () => {
  const dispatch = useDispatch();

  const { messageError, messageSuccess } = messages();

  const userSystem = async (data) => {
    try {
      const resul = await configApi.post("/user", data);

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
    userSystem,
  };
};
