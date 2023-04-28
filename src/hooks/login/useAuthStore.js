import { useDispatch, useSelector } from "react-redux";
import configApi from "../../api/configApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../../store/auth";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const starLogin = async ({ email, password }) => {
    dispatch(onChecking());

    try {
      const data = { user: { email: email, password: password } };

      const response = await configApi.post("/login", data);

      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem('rol', response.data.data.rol)
      localStorage.setItem('email', response.data.data.email)
      localStorage.setItem('department', response.data.data.department)
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        onLogin({
          rol: response.data.data.rol,
          email: response.data.data.email,
          department: response.data.data.department,
        })
      );
    } catch (error) {
      dispatch(onLogout(error.code))
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10);
    }
  };

  const startLogout = () => {
    localStorage.clear()
    dispatch(onLogout())
  }

  const checkAuthToken = async (id) => {

    const token = localStorage.getItem('token')

    if (!token) return dispatch(onLogout())

    if (id == 498 || id == 0) {

      localStorage.removeItem('token');
      return dispatch(onLogout())
    }

  }

  const checkAuthRol = async () => {

    try {

      const { data } = await configApi.get("/get-user-roll");

      return data.data

    } catch (error) {

    }
  }

  return {
    //* Propiedades
    errorMessage,
    status,
    user,

    //* Metodos
    starLogin,
    startLogout,
    checkAuthToken,
    checkAuthRol,
  };
};
