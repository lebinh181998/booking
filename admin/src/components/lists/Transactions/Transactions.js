import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import classes from "./Transactions.module.css";
import useHttp from "../../../hooks/use-http";
import Transaction from "./Transaction";

const Transactions = () => {
  const { SendToHttp, errMessage } = useHttp();
  const [transactions, setTransactions] = useState([]);

  const resolveDataFetch = (data, err) => {
    if (!err) {
      //   console.log(data);
      setTransactions(data.transactions.reverse());
    }
  };

  useEffect(() => {
    SendToHttp("admin/transactions", resolveDataFetch);
  }, []);

  return (
    <div className={`${classes.transactions}`}>
      <div className={`${classes.addnew}`}>
        <h2>Transactions List</h2>
      </div>
      {errMessage.trim() != "" && (
        <h4 className="text-center text-danger">{errMessage}.</h4>
      )}
      {transactions.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>
                <p>ID</p>
              </th>
              <th>
                <p>User</p>
              </th>
              <th>
                <p>Hotel</p>
              </th>
              <th>
                <p>Room</p>
              </th>
              <th>
                <p>Date</p>
              </th>
              <th>
                <p>Price</p>
              </th>
              <th>
                <p>Payment Method</p>
              </th>
              <th>
                <p>Status</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <Transaction key={transaction._id} transaction={transaction} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default Transactions;
