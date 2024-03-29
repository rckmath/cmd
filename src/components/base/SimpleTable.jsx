import React from "react";

const SimpleTable = ({ children }) => {
  return (
    <table>
      <tbody>{children}</tbody>
    </table>
  );
};

export default SimpleTable;
