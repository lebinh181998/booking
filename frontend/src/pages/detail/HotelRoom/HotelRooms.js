import { useNavigate } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import "./HotelRooms.css";
import React, { useEffect, useState } from "react";
import Room from "./Room";

const HotelRooms = (props) => {
  const { roomsData, date, dateCount, user, hotelID, dateStart, dateEnd } =
    props;
  const [rooms, setRooms] = useState([]);
  const [roomNumbers, setRoomNumbers] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const { SendToHttp } = useHttp();
  const navigate = useNavigate();

  const onCheckedRoom = (room) => {
    //kiểm tra checked 1 phòng
    //true: kiểm tra mảng phân loại các phòng
    /////// > 0: kiêm tra loại phòng và phòng đã được thêm trước đó chưa
    //////////// có: update mảng phòng trong loại phòng
    //////////// chưa: thêm loại phòng và phòng vào mảng

    ////// < 0: thêm loại phòng và phòng vào mảng

    //false: kiểm tra mảng phân loại các phòng
    /////// > 0: xoá 1 phòng khỏi loại phòng
    if (room.checked) {
      let updatedRoomNumbers = [...roomNumbers];
      let flagRoom = false;
      // > 0: kiêm tra loại phòng và phòng đã được thêm trước đó chưa
      if (roomNumbers.length > 0) {
        for (let i = 0; i < roomNumbers.length; i++) {
          // có: update mảng phòng trong loại phòng
          if (roomNumbers[i]._id == room._id) {
            updatedRoomNumbers[i] = {
              _id: roomNumbers[i]._id,
              price: room.price,
              roomNumbers: [...roomNumbers[i].roomNumbers, room.roomNumber],
            };
            flagRoom = true;
            break;
          }
        }
        // chưa: thêm loại phòng và phòng vào mảng
        if (!flagRoom) {
          updatedRoomNumbers.push({
            _id: room._id,
            price: room.price,
            roomNumbers: [room.roomNumber],
          });
        }
      }
      //< 0: thêm loại phòng và phòng vào mảng
      else {
        updatedRoomNumbers.push({
          _id: room._id,
          price: room.price,
          roomNumbers: [room.roomNumber],
        });
      }
      setRoomNumbers(updatedRoomNumbers);
      setTotalBill((prevTotal) => prevTotal + room.price);
    }
    //false: kiểm tra mảng phân loại các phòng
    else {
      // > 0: xoá 1 phòng khỏi mảng phòng  trong loại phòng
      if (roomNumbers.length > 0) {
        let total = totalBill;
        let updatedRoomNumbers = [];
        roomNumbers.filter((item) => {
          let roomNbs = [];
          //kiểm tra loại phòng có tồn tại trong mảng phân  loại phòng
          // có: xoá 1 phong trong loai phòng và trừ tiền 1 phòng
          if (item._id == room._id) {
            roomNbs = item.roomNumbers.filter((rn) => {
              if (rn != room.roomNumber) {
                return rn;
              } else {
                total = total - room.price;
              }
            });

            //loại phòng có mảng phòng là 0 thì xoá khỏi mảng phân loại phòng
            if (roomNbs.length > 0) {
              item = {
                _id: item._id,
                price: room.price,
                roomNumbers: roomNbs,
              };
              updatedRoomNumbers.push(item);
            }
          } else {
            updatedRoomNumbers.push(item);
          }
        });

        setRoomNumbers(updatedRoomNumbers);
        setTotalBill(total);
      }
    }
  };

  //lấy payment method
  const [payment, setPayment] = useState("");
  const onPay = (e) => {
    setPayment(e.target.value);
  };

  const resolveDataFetch = (data, err) => {
    if (!err) {
      console.log(data);
      localStorage.setItem("USER", JSON.stringify({ user: data.user }));
    }
  };
  //tạo transaction và chỉnh sửa thông tin user
  const onCreateTransaction = () => {
    const url = "create-transaction";
    const method = "POST";
    const bodyRequest = {
      user: user.userID,
      fullName: user.fullName,
      hotel: hotelID,
      room: roomNumbers,
      dateStart: dateStart,
      dateEnd: dateEnd,
      price: totalBill,
      payment: payment,
      status: "Booked",
    };
    const headers = { "Content-Type": "application/json" };
    SendToHttp(
      "edit-user",
      resolveDataFetch,
      method,
      {
        userID: user.userID,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        cardNumber: user.cardNumber,
      },
      headers
    );

    SendToHttp(
      url,
      (data, err) => {
        if (!err) {
          navigate("/transactions/" + user.username);
        }
      },
      method,
      bodyRequest,
      headers
    );
  };

  //reset thông tin về phòng mà user chọn trước đó
  useEffect(() => {
    setRooms(roomsData);
    setTotalBill(0);
    setRoomNumbers([]);
  }, [roomsData]);

  // console.log(dateCount);
  return (
    <div className="select-rooms">
      <h3>Select Rooms</h3>
      <div className="rooms">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <Room
              key={room._id}
              room={room}
              onCheckedRoom={onCheckedRoom}
              date={date}
              roomNumbers={roomNumbers}
            />
          ))
        ) : (
          <h2>no room empty.</h2>
        )}
      </div>
      {rooms.length > 0 && <h2>Total Bill: ${totalBill * dateCount}</h2>}
      <div className="pay-method">
        <select onChange={onPay}>
          <option value="">Select Payment Method </option>
          <option value="Creadit Card">Credit Card</option>
          <option value="Cash">Cash</option>
        </select>
        <button onClick={onCreateTransaction}>Reserve Now</button>
      </div>
    </div>
  );
};
export default HotelRooms;
