import React from "react";
import classes from "./Transaction.module.css";

const Transaction = (props) => {
  const { transaction } = props;
  let rooms = [];
  let totalPrice = 0;
  let date =
    new Date(transaction.dateEnd).getDate() -
    new Date(transaction.dateStart).getDate();
  transaction.room.map((r) => {
    totalPrice += r.price;
    r.roomNumbers.map((rn) => rooms.push(rn));
  });

  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>{transaction._id}</td>
      <td>{transaction.user.fullName}</td>
      <td>{transaction.hotel.name}</td>
      <td>{rooms.join(",")}</td>
      <td>{`
      ${new Date(transaction.dateStart).getDate()}/${
        new Date(transaction.dateStart).getMonth() + 1
      }/${new Date(transaction.dateStart).getFullYear()}
       - 
      ${new Date(transaction.dateEnd).getDate()}/${
        new Date(transaction.dateEnd).getMonth() + 1
      }/${new Date(transaction.dateEnd).getFullYear()}
      `}</td>
      <td>${totalPrice * date}</td>
      <td>{transaction.payment}</td>
      <td>
        <button
          className={
            transaction.status == "Booked"
              ? classes["bg-danger"]
              : transaction.status == "Checkin"
              ? classes["bg-success"]
              : classes["bg-primary-basic"]
          }
        >
          {transaction.status}
        </button>
      </td>
    </tr>
  );
};
export default Transaction;
