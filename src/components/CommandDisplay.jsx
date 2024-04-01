import React, { Fragment } from "react";

const CommandDisplay = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

export default React.memo(CommandDisplay);
