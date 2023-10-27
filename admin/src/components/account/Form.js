import "./Form.css";
import React, { useEffect, useState } from "react";
import useInput from "../../hooks/use-input";
import useHttp from "../../hooks/use-http";
import { useNavigate } from "react-router-dom";
import { accountActions } from "../../store/reducer/accountReducer";
import { useDispatch, useSelector } from "react-redux";

const Form = (props) => {
  const { SendToHttp, errMessage } = useHttp();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.account.isAdmin);
  const isLogin = useSelector((state) => state.account.isLogin);

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
      dispatch(accountActions.ON_LOGIN(data.user[0]));
    }
  };

  const onSubmitAccount = async (e) => {
    e.preventDefault();
    if (props.loginForm) {
      const url = "login";
      const method = "POST";
      const bodyRequest = { username: valueUserName, password: valuePassword };
      const headers = { "Content-Type": "application/json" };
      await SendToHttp(url, resolveDataFetch, method, bodyRequest, headers);
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
        const send = await SendToHttp(
          url,
          () => {},
          method,
          bodyRequest,
          headers
        );
        if (send) {
          navigate("/login");
        }
      }
    }
  };

  useEffect(() => {
    if (isLogin) {
      navigate("/admin");
    }
  }, [isLogin]);

  return (
    <div className="sign-form">
      <h3>{props.loginForm ? "Login" : "Sign Up"}</h3>
      <h4 className="text-danger">{errMessage}</h4>
      {!isAdmin && <h4 className="text-danger">This account is not admin. </h4>}
      <form onSubmit={onSubmitAccount} className="form">
        <input
          type="text"
          value={valueUserName}
          onChange={eventChangeUserName}
          onBlur={eventBlurUserName}
          placeholder="Username"
        />
        {errorUserName && <p className="text-danger">Please enter username.</p>}
        <input
          type="password"
          value={valuePassword}
          onChange={eventChangePassword}
          onBlur={eventBlurPassword}
          placeholder="Password"
        />
        {errorPassword && <p className="text-danger">Please enter password.</p>}
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
              <p className="text-danger">Please enter full name.</p>
            )}
            <input
              type="text"
              value={valuePhoneNumber}
              onChange={eventChangePhoneNumber}
              onBlur={eventBlurPhoneNumber}
              placeholder="Phone Number"
            />
            {errorPhoneNumber && (
              <p className="text-danger">Please enter phone number.</p>
            )}
            <input
              type="email"
              value={valueEmail}
              onChange={eventChangeEmail}
              onBlur={eventBlurEmail}
              placeholder="Email"
            />
            {errorEmail && <p className="text-danger">Please enter email.</p>}
            <input type="submit" value="Create Account" />
          </>
        )}
      </form>
    </div>
  );
};
export default Form;
