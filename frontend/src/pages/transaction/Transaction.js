import React from "react";

const Transaction = (props) => {
  const { transaction, i } = props;
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
      <td>0{i + 1}</td>
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
              ? "bg-danger"
              : transaction.status == "Checkin"
              ? "bg-succsess"
              : "bg-primary-basic"
          }
        >
          {transaction.status}
        </button>
      </td>
    </tr>
  );
};
export default Transaction;
