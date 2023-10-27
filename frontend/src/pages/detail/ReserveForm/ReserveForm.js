import "./ReserveForm.css";
import React, { useContext, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import SearchContext from "../../../context/search-context";
import { useParams } from "react-router-dom";
import HotelRooms from "../HotelRoom/HotelRooms";
import useHttp from "../../../hooks/use-http";
import useInput from "../../../hooks/use-input";

const ReserveForm = () => {
  const ctx = useContext(SearchContext);
  const params = useParams();
  const hotelID = params.hotelID;
  const [rooms, setRooms] = useState([]);
  const user = localStorage.getItem("USER")
    ? JSON.parse(localStorage.getItem("USER")).user
    : [];

  //cập nhật ngày tháng bằng thư viện DateRange
  //tạo state chứa start và and date
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const resolveDataFetch = (data, err) => {
    if (!err) {
      setRooms(data[0].rooms);
    }
  };

  const { SendToHttp } = useHttp();
  const [isFetch, setIsFetch] = useState(false);
  const [isShowRooms, setIsShowRooms] = useState(false);
  const [date, setDate] = useState("");
  const [dateCount, setDateCount] = useState(0);
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const onDate = async (ranges) => {
    setIsFetch((prev) => !prev);
    //cập nhật start và end date dựa vào phạm vi chọn
    setSelectionRange(() => {
      return {
        startDate: ranges.selection.startDate,
        endDate: ranges.selection.endDate,
        key: "selection",
      };
    });
    setDateStart(ranges.selection.startDate);
    setDateEnd(ranges.selection.endDate);

    if (isFetch) {
      setIsShowRooms(true);

      let day = ranges.selection.endDate.getDate();
      let month = ranges.selection.endDate.getMonth() + 1;
      let year = ranges.selection.endDate.getFullYear();
      const endDate = `${year}/${month}/${day}`;
      setDate(` ${endDate}`);

      setDateCount(
        ranges.selection.endDate.getDate() -
          ranges.selection.startDate.getDate() +
          1
      );

      const url = "search";
      const method = "POST";
      const bodyRequest = {
        hotelID: hotelID,
        dateStart: ranges.selection.startDate,
        dateEnd: ranges.selection.endDate,
      };
      const headers = { "Content-Type": "application/json" };
      SendToHttp(url, resolveDataFetch, method, bodyRequest, headers);
    }
  };
  const resolveDataInput = (data) => {};
  const { value: valueFullName, eventChangeInput: eventChangeFullName } =
    useInput(resolveDataInput, user && user.fullName && user.fullName);
  const { value: valueEmail, eventChangeInput: eventChangeEmail } = useInput(
    resolveDataInput,
    user && user.email && user.email
  );
  const { value: valuePhoneNumber, eventChangeInput: eventChangePhoneNumber } =
    useInput(resolveDataInput, user && user.phoneNumber && user.phoneNumber);
  const { value: valueCardNumber, eventChangeInput: eventChangeCardNumber } =
    useInput(resolveDataInput, user && user.cardNumber && user.cardNumber);

  return (
    <div className="reserve-contianer">
      <div className="reserve_date-and-user_info">
        <div className="reserve-date">
          <h3>Date</h3>
          <DateRange
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            className="date-search"
            minDate={new Date()}
            onChange={onDate}
            ranges={[selectionRange]}
          />
        </div>
        <form>
          <h3>Reserve Info</h3>
          <div className="form-group">
            <label>Your Full Name:</label>
            <input
              type="text"
              placeholder="Full Name"
              value={valueFullName}
              onChange={eventChangeFullName}
            />
          </div>
          <div className="form-group">
            <label>Your Email:</label>
            <input
              type="text"
              placeholder="Email"
              value={valueEmail}
              onChange={eventChangeEmail}
            />
          </div>
          <div className="form-group">
            <label>Your Phone Number:</label>
            <input
              type="text"
              placeholder="Phone Number"
              value={valuePhoneNumber}
              onChange={eventChangePhoneNumber}
            />
          </div>
          <div className="form-group">
            <label>Your Identity Card Number:</label>
            <input
              type="text"
              placeholder="Card Number"
              value={valueCardNumber}
              onChange={eventChangeCardNumber}
            />
          </div>
        </form>
      </div>
      {isShowRooms && (
        <HotelRooms
          roomsData={rooms}
          date={date}
          dateCount={dateCount}
          user={{
            userID: user._id,
            username: user.username,
            fullName: valueFullName,
            email: valueEmail,
            phoneNumber: valuePhoneNumber,
            cardNumber: valueCardNumber,
          }}
          hotelID={hotelID}
          dateStart={dateStart}
          dateEnd={dateEnd}
        />
      )}
    </div>
  );
};
export default ReserveForm;
