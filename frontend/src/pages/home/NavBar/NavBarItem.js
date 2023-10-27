import NavBar from "./NavBarItem.css";
import React from "react";

const NavBarItem = (props) => {
  return (
    <li
      onClick={props.onActiveType}
      className={`type ${props.data.active === true && "active"}`}
    >
      <i className={`fa ${props.data.icon}`}></i>
      {props.data.type}
    </li>
  );
};
export default NavBarItem;
