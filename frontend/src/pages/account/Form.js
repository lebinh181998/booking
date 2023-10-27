import "./Form.css";
import React, { useContext, useState } from "react";
import useInput from "../../hooks/use-input";
import useHttp from "../../hooks/use-http";
import { useNavigate } from "react-router-dom";
import SearchContext from "../../context/search-context";

const Form = (props) => {
  const { SendToHttp } = useHttp();
  const navigate = useNavigate();
  const [errMessage, setErrMessage] = useState("");
  const ctx = useContext(SearchContext);

  const resolveDataInput = (data) => data.trim() != "";
  const {
    value: valueUserName,
    isError: errorUserName,
    eventChangeInput: eventChangeUserName,
    eventBlurInput: eventBlurUserName,
  } = useInput(resolveDataInput);

  const {
    value: valuePassword,
    isError: errorPassword,
    eventChangeInput: eventChangePassword,
    eventBlurInput: eventBlurPassword,
  } = useInput(resolveDataInput);

  const {
    value: valueFullName,
    isError: errorFullName,
    eventChangeInput: eventChangeFullName,
    eventBlurInput: eventBlurFullName,
  } = useInput(resolveDataInput);

  const {
    value: valuePhoneNumber,
    isError: errorPhoneNumber,
    eventChangeInput: eventChangePhoneNumber,
    eventBlurInput: eventBlurPhoneNumber,
  } = useInput(resolveDataInput);

  const {
    value: valueEmail,
    isError: errorEmail,
    eventChangeInput: eventChangeEmail,
    eventBlurInput: eventBlurEmail,
  } = useInput(resolveDataInput);

  const resolveDataFetch = (data, err) => {
    if (!err) {
      localStorage.setItem("USER", JSON.stringify({ user: data.user[0] }));
      ctx.onCreateUser(data.user[0]);
    } else {
      setErrMessage(data.message);
    }
  };

  const onSubmitAccount = async (e) => {
    e.preventDefault();
    if (props.loginForm) {
      const url = "login";
      const method = "POST";
      const bodyRequest = { username: valueUserName, password: valuePassword };
      const headers = { "Content-Type": "application/json" };
      const send = await SendToHttp(
        url,
        resolveDataFetch,
        method,
        bodyRequest,
        headers
      );

      if (send) {
        navigate("/");
      }
    } else {
      if (
        !errorUserName &&
        !errorPassword &&
        !errorFullName &&
        !errorPhoneNumber &&
        !errorEmail
      ) {
        const url = "signup";
        const method = "POST";
        const bodyRequest = {
          username: valueUserName,
          password: valuePassword,
          fullName: valueFullName,
          phoneNumber: valuePhoneNumber,
          email: valueEmail,
        };
        const headers = { "Content-Type": "application/json" };
        await SendToHttp(
          url,
          (data, err) =>
            !err ? navigate("/login") : setErrMessage(data.message),
          method,
          bodyRequest,
          headers
        );
      }
    }
  };

  return (
    <div className="sign-form">
      <h3>{props.loginForm ? "Login" : "Sign Up"}</h3>
      <h4 className="error-text">{errMessage}</h4>
      <form onSubmit={onSubmitAccount} className="form">
        <input
          type="text"
          value={valueUserName}
          onChange={eventChangeUserName}
          onBlur={eventBlurUserName}
          placeholder="Username"
        />
        {errorUserName && <p className="error-text">Please enter username.</p>}
        <input
          type="password"
          value={valuePassword}
          onChange={eventChangePassword}
          onBlur={eventBlurPassword}
          placeholder="Password"
        />
        {errorPassword && <p className="error-text">Please enter password.</p>}
        {props.loginForm ? (
          <input type="submit" value="Login" />
        ) : (
          <>
            <input
              type="text"
              value={valueFullName}
              onChange={eventChangeFullName}
              onBlur={eventBlurFullName}
              placeholder="Full Name"
            />
            {errorFullName && (
              <p className="error-text">Please enter full name.</p>
            )}
            <input
              type="text"
              value={valuePhoneNumber}
              onChange={eventChangePhoneNumber}
              onBlur={eventBlurPhoneNumber}
              placeholder="Phone Number"
            />
            {errorPhoneNumber && (
              <p className="error-text">Please enter phone number.</p>
            )}
            <input
              type="email"
              value={valueEmail}
              onChange={eventChangeEmail}
              onBlur={eventBlurEmail}
              placeholder="Email"
            />
            {errorEmail && <p className="error-text">Please enter email.</p>}
            <input type="submit" value="Create Account" />
          </>
        )}
      </form>
    </div>
  );
};
export default Form;
