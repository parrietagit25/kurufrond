import { useEffect, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, Link, TextField, FormLabel } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Swal from 'sweetalert2'

import AuthLayout from "../layout/AuthLayout";
import { useAuthStore, useForm } from "../../hooks";

const formData = {
  email: "",
  password: "",
  displayName: "",
};

const formValidations = {
  email: [(value) => value.includes("@"), "El correo debe de tener una @"],
  password: [
    (value) => value.length >= 9,
    "El password debe de tener 9 o mas Caracteres",
  ]
};

const LoginPage = () => {

  const { starLogin, errorMessage } = useAuthStore()

  const [formSubmitted, setformSubmitted] = useState(false)
  
  const {
    email,
    password,
    onInputChange,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setformSubmitted(true)

    starLogin({email: email, password: password})
  };

  useEffect(() => {

    if ( errorMessage !== undefined ) {
      Swal.fire('Oops...', errorMessage, 'error')
    }
   
  }, [errorMessage])
  
  return (
    <AuthLayout title="Bienvenidos a Kuruma">
      <form onSubmit={onSubmit} className="animate__animated animate__gadeIn animate__faster">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="tu correo@.com"
              name="email"
              value={email}
              onChange={onInputChange}
              fullWidth
              error={!!emailValid && formSubmitted}
              helperText={<FormLabel style={{fontSize: 10}}>{emailValid}</FormLabel>}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              name="password"
              value={password}
              onChange={onInputChange}
              fullWidth
              error={!!passwordValid && formSubmitted}
              helperText={<FormLabel style={{fontSize: 10}}>{passwordValid}</FormLabel>}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                className="btn-info"
                fullWidth
                endIcon={<ArrowForwardIcon />}
              >
                Login
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link
              component={RouterLink}
              className="link-info"
              color="inherit"
              to="/auth/updateUser"
            >
              Actualizar Contraseña
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
