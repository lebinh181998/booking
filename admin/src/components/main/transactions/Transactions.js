import React, { useEffect, useState } from "react";
import classes from "./Transactions.module.css";
import useHttp from "../../../hooks/use-http";
import Transaction from "./Transaction";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { SendToHttp } = useHttp();

  const resolveDataFetch = (data, err) => {
    if (!err) {
      setTransactions(data);
    }
  };
  useEffect(() => {
    SendToHttp("admin/transactions-latest", resolveDataFetch);
  }, []);

  return (
    <div className={`${classes.transactions}`}>
      <h2>Latest Transactions</h2>
      {transactions.length > 0 ? (
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
            {transactions.map((transaction, i) => (
              <Transaction
                key={transaction._id}
                transaction={transaction}
                i={i}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <h3>Not yet transaction.</h3>
      )}
    </div>
  );
};
export default Transactions;
