import "./RegisterForm.css";
import React from "react";

const RegisterForm = () => {
  return (
    <div className="register-form">
      <h1>Save time, save money</h1>
      <p>Sign up and we'll send the best deals to you</p>
      <form>
        <input type="gmail" placeholder="Your Email" />
        <input type="button" value="Subscribe" />
      </form>
    </div>
  );
};
export default RegisterForm;
