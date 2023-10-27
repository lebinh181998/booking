import { useNavigate } from "react-router-dom";
import SearchContext from "../../context/search-context";
import NavBar from "../home/NavBar/NavBar";
import Form from "./Form";
// import "./Login.css";
import React, { useContext, useEffect, useState } from "react";

const Login = () => {
  const ctx = useContext(SearchContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (ctx.isLogin) {
      navigate("/");
    }
  });

  return (
    <>
      <div className="section">
        <NavBar />
      </div>
      <div className="sign-container">
        <Form loginForm={true} />
      </div>
    </>
  );
};
export default Login;
