import React from "react";

import Typography from "@mui/material/Typography";

const SimpleText = ({ content }) => (
  <Typography align="justify" maxWidth="600px">
    {content}
  </Typography>
);

export default SimpleText;
