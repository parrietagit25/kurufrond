import React, { useState } from "react";

import { Box, CircularProgress, Modal, Typography } from "@mui/material";

function ProgressModal({ open }) {
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <CircularProgress
          size={45}
          sx={{
            color: "#c8102e",
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-25px",
            marginLeft: "2rem",
          }}
        />
        <Typography variant="h6" sx={{ color: "#c8102e" }}>
          Procesando...
        </Typography>
      </Box>
    </Modal>
  );
}

export default ProgressModal;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 270,
  bgcolor: "#fff",
  border: "2px solid #092f87",
  boxShadow: 24,
  p: 4,
};
