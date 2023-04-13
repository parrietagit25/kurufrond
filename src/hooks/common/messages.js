import Swal from "sweetalert2";

export const messages = () => {
 
  const messageSuccess = (title) => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: title,
      showConfirmButton: false,
      timer: 1800,
    });
  }

  const messageError = (title) => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: title,
      showConfirmButton: false,
      timer: 1800,
    });
  }

  const messageWarning = (title) => {
    Swal.fire({
      position: "center",
      icon: "warning",
      title: title,
      showConfirmButton: false,
      timer: 1800,
    });
  }

  return {
    //* Propiedades

    //* Metodos
    messageSuccess,
    messageError,
    messageWarning
  };
};
