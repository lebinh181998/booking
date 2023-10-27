import React, { useEffect } from "react";
import classes from "./Info.module.css";

const Info = (props) => {
  const { title, content, icon, styleIcon } = props;

  return (
    <div className={`${classes.info}`}>
      <p className={`${classes.title} mb-2`}>{title}</p>
      <p className="fs-2">{content}</p>
      <p className="text-end">
        <i
          style={styleIcon}
          className={`${icon} ${classes.icon} p-2 rounded-1 `}
        ></i>
      </p>
    </div>
  );
};
export default Info;
