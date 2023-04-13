import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onLogin, onLogout } from "../../store/auth";

export const useCheckAuth = () => {

  const { status } = useSelector(state => state.auth)

  const dispatch = useDispatch();

  useEffect(() => {

    const rol = localStorage.getItem('rol')
    const email = localStorage.getItem('email')
    const department = localStorage.getItem('department')

    if (!email || !department || !rol) {
      dispatch(onLogout())
    } else {

      dispatch(onLogin({
        rol: rol,
        email: email,
        department: department,
      }))
    }
  }, [])

  return status
}