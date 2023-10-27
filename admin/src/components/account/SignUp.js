import NavBar from "../home/NavBar/NavBar";
import Form from "./Form";
// import "./SignUp.css";
import React, { useState } from "react";

const SignUp = () => {
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
