import React from "react";
import { useMediaQuery } from "react-responsive";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";

const mainBox = {
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

const ResumeModal = ({ open, setOpen }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const downloadResume = () => {
    fetch("./src/docs/CV ERICK M L PACHECO.pdf").then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);

        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "CV ERICK M L PACHECO.pdf";
        alink.click();
      });
    });

    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-resume"
      aria-describedby="modal-curriculum-vitae-display"
    >
      <Box sx={mainBox}>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "right" }}>
          <IconButton aria-label="close" sx={{ p: 0, left: 5, color: "white" }} onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        {isMobile ? (
          <Button color="success" variant="contained" endIcon={<DownloadIcon />} onClick={() => downloadResume()}>
            Click to download my CV
          </Button>
        ) : (
          <iframe src="./src/docs/CV ERICK M L PACHECO.pdf" style={{ height: "90vh", border: 0 }}></iframe>
        )}
      </Box>
    </Modal>
  );
};

export default ResumeModal;
