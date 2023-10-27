import React, { useEffect, useState } from "react";
import classes from "./InfoBoard.module.css";
import Info from "./Info";
import useHttp from "../../../hooks/use-http";

const InfoBoard = () => {
  const { SendToHttp } = useHttp();
  const [infoBoard, setInfoBoard] = useState(null);

  const resolveDataFetch = (data, err) => {
    if (!err) {
      setInfoBoard(data);
    }
  };
  useEffect(() => {
    SendToHttp("admin/infoboard", resolveDataFetch);
  }, []);

  return (
    <div className={`${classes["info-board"]}`}>
      <Info
        title="USERS"
        content={infoBoard ? infoBoard.userCount : 0}
        icon="fa-solid fa-user"
        styleIcon={{ backgroundColor: "#ffbebe", color: "#f00" }}
      />
      <Info
        title="ORDERS"
        content={infoBoard ? infoBoard.transactionCount : 0}
        icon="fa-solid fa-cart-shopping"
        styleIcon={{ backgroundColor: "#fdfbbf", color: "#e1db00" }}
      />
      <Info
        title="EARNINGS"
        content={`$${infoBoard ? infoBoard.income : 0}`}
        icon="fa-solid fa-dollar-sign"
        styleIcon={{ backgroundColor: "#c7fdb9", color: "#03c500" }}
      />
      <Info
        title="BALANCE"
        content={`$${infoBoard ? infoBoard.averageIncomeByMonth : 0}`}
        icon="fa-solid fa-scale-balanced"
        styleIcon={{ backgroundColor: "#f5c3ff", color: "#d800ff" }}
      />
    </div>
  );
};
export default InfoBoard;
