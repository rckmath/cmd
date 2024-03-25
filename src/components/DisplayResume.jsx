import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const mainBox = {
  /* Fixed position */
  top: "50%",
  left: "50%",
  position: "absolute",
  transform: "translate(-50%, -50%)",

  zIndex: 9999,
  width: "80vw",

  borderWidth: 0,

  display: "flex",
  overflow: "hidden",
  flexDirection: "column",

  outline: "none",
  userSelect: "none",
};

const DisplayResume = ({ open, setOpen }) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-resume"
      aria-describedby="modal-curriculum-vitae-display"
    >
      <Box sx={mainBox}>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "right" }}>
          <IconButton
            aria-label="close"
            sx={{ p: 0, left: 5, color: "white" }}
            onClick={() => setOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <iframe
          src="./src/docs/cv-en.pdf"
          style={{ height: "90vh", border: 0 }}
        ></iframe>
      </Box>
    </Modal>
  );
};

export default DisplayResume;
