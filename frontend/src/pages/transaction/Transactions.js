import { useNavigate } from "react-router-dom";
import SearchContext from "../../context/search-context";
import useHttp from "../../hooks/use-http";
import Footer from "../home/Footer/Footer";
import NavBar from "../home/NavBar/NavBar";
import RegisterForm from "../home/RegisterForm/RegisterForm";
import Transaction from "./Transaction";
import "./Transactions.css";
import React, { useContext, useEffect, useState } from "react";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { SendToHttp } = useHttp();
  const user =
    localStorage.getItem("USER") &&
    JSON.parse(localStorage.getItem("USER")).user;

  const resolveDataFetch = (data, err) => {
    if (!err) {
      // console.log(data);
      setTransactions(data.transactions);
    }
  };

  const ctx = useContext(SearchContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!ctx.isLogin) {
      navigate("/login");
    } else {
      const url = "transactions/" + user._id;
      SendToHttp(url, resolveDataFetch);
    }
  }, []);

  return (
    <div>
      <div className="section">
        <NavBar />
      </div>
      <div className="transactions-container">
        <h2>Your Transactions</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Hotel</th>
              <th>Room</th>
              <th>Date</th>
              <th>Price</th>
              <th>Payment Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, i) => (
              <Transaction
                key={transaction._id}
                transaction={transaction}
                i={i}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="section">
        <RegisterForm />
      </div>
      <div className="container">
        <Footer />
      </div>
    </div>
  );
};
export default Transactions;
