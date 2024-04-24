import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import "./App.css";

import CommandPrompt from "./pages/CommandPrompt";

const App = () => {
  const theme = createTheme({
    typography: {
      allVariants: { fontFamily: "Consolas" },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CommandPrompt />
    </ThemeProvider>
  );
};

export default App;
