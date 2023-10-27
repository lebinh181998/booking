import React from "react";
import classes from "./DashBoard.module.css";
import InfoBoard from "./InfoBoard/InfoBoard";
import Transactions from "./transactions/Transactions";

const DashBoard = () => {
  return (
    <div className={`${classes.dashboard}`}>
      <InfoBoard />
      <Transactions />
    </div>
  );
};
export default DashBoard;
