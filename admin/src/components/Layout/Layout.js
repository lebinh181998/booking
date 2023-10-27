import { Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./Layout.module.css";
import Sidebar from "../sidebar/Sidebar";

const Layout = () => {
  const isLogin = useSelector((state) => state.account.isLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/admin/login");
    }
  }, [isLogin]);
  return (
    <div className={`${classes.layout}`}>
      <div className={`${classes["title-page"]} text-primary fs-5`}>
        Admin Page
      </div>
      <Sidebar />
      <div className={`${classes.outlet}`}>
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
