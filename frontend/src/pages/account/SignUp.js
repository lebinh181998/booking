import NavBar from "../home/NavBar/NavBar";
import Form from "./Form";
// import "./SignUp.css";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchContext from "../../context/search-context";

const SignUp = () => {
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
      <div className="sign">
        <Form />
      </div>
    </>
  );
};
export default SignUp;
