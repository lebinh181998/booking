import React from "react";
import classes from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { accountActions } from "../../store/reducer/accountReducer";

const Sidebar = () => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(accountActions.ON_LOGOUT());
  };
  return (
    <div className={`${classes.popup}`}>
      <p>MAIN</p>
      <ul>
        <li>
          <Link to="/admin">
            <i className="fa-solid fa-house text-primary me-2"></i>Dashboard
          </Link>
        </li>
      </ul>
      <p>LISTS</p>
      <ul>
        <li>
          <Link>
            <i className="fa-solid fa-user text-primary me-2"></i>Users
          </Link>
        </li>
        <li>
          <Link to="/admin/hotels">
            <i className="fa-solid fa-hotel text-primary me-2"></i>Hotels
          </Link>
        </li>
        <li>
          <Link to="/admin/rooms">
            <i className="fa-solid fa-door-closed text-primary me-2"></i>Rooms
          </Link>
        </li>
        <li>
          <Link to="/admin/transactions">
            <i className="fa-solid fa-van-shuttle text-primary me-2"></i>
            Transactions
          </Link>
        </li>
      </ul>
      <p>NEW</p>
      <ul>
        <li>
          <Link to="/admin/new-hotel">
            <i className="fa-solid fa-hotel text-primary me-2"></i>New Hotel
          </Link>
        </li>
        <li>
          <Link to="/admin/new-room">
            <i className="fa-solid fa-door-closed text-primary me-2"></i>New
            Room
          </Link>
        </li>
      </ul>
      <p>USER</p>
      <ul>
        <li>
          <button onClick={onLogout}>
            <i className="fa-solid fa-right-from-bracket text-primary me-2"></i>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
