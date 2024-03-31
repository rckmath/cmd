import React, { Fragment } from "react";

const CommandDisplay = ({ children }) => {
  console.log("Re-rendering");
  return <Fragment>{children}</Fragment>;
};

export default React.memo(CommandDisplay);
