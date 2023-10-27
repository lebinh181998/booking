import "./Header.css";
import React, { useContext, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import SearchContext from "../../../context/search-context";
import { useNavigate } from "react-router-dom";
import useInput from "../../../hooks/use-input";

const Header = () => {
  const ctx = useContext(SearchContext);
  const navigate = useNavigate();

  const resolveDataInput = (data) => data.trim() != "";
  const {
    value: valueCity,
    eventChangeInput: eventChangeCity,
    isValid: validCity,
  } = useInput(resolveDataInput);
  const {
    value: valuePeopleAndRoom,
    eventChangeInput: eventChangePeopleAndRoom,
    isValid: validPeopleAndRoom,
  } = useInput(resolveDataInput);

  //cập nhật ngày tháng bằng thư viện DateRange
  //tạo state chứa start và and date
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  //tạo state hiện ngày vào input
  const [date, setDate] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const onDate = (ranges) => {
    //cập nhật start và end date dựa vào phạm vi chọn
    setSelectionRange(() => {
      return {
        startDate: ranges.selection.startDate,
        endDate: ranges.selection.endDate,
        key: "selection",
      };
    });

    let day = ranges.selection.startDate.getDate();
    let month = ranges.selection.startDate.getMonth() + 1;
    let year = ranges.selection.startDate.getFullYear();
    const startDate = `${year}/${month}/${day}`;

    day = ranges.selection.endDate.getDate();
    month = ranges.selection.endDate.getMonth() + 1;
    year = ranges.selection.endDate.getFullYear();
    const endDate = `${year}/${month}/${day}`;

    setDateStart(ranges.selection.startDate);
    setDateEnd(ranges.selection.endDate);
    //cập nhật ngày hiển thị vào input
    setDate(`${startDate} to ${endDate}`);
  };

  //hiện/ẩn form DateRange
  const [isDate, setIsDate] = useState(false);
  const toggleDate = () => {
    setIsDate(!isDate);
  };

  //chuyển trang đến trang search
  const gotoSearch = () => {
    navigate("/search");
    ctx.onGetSearchKeys({
      city: validCity && valueCity,
      dateStart: dateStart,
      dateEnd: dateEnd,
      roomCount:
        validPeopleAndRoom &&
        valuePeopleAndRoom.split(" ")[2] &&
        valuePeopleAndRoom.split(" ")[2],
      peopleCount:
        validPeopleAndRoom &&
        valuePeopleAndRoom.split(" ")[0] &&
        valuePeopleAndRoom.split(" ")[0],
    });
  };

  return (
    <div className="header">
      <h2>A lifetime of discounts? It's Genius.</h2>
      <p>
        Get rewarded for your travels - unlock instant savings of 100% or more
        with a free account.
      </p>
      <p className="sign-in">Sign in / Register</p>
      <form className="search">
        <div className="form-input">
          <label>
            <i className="fa fa-bed"></i>
          </label>
          <input
            type="text"
            placeholder="Where are you going?"
            value={valueCity}
            onChange={eventChangeCity}
          />
        </div>
        <div className="form-input">
          <label onClick={toggleDate}>
            <i className="fa fa-calendar"></i>
          </label>
          {/* hiện/ẩn form DateRange */}
          {isDate && (
            <DateRange
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              className="date"
              minDate={new Date()}
              onChange={onDate}
              ranges={[selectionRange]}
            />
          )}
          <input
            type="text"
            onClick={toggleDate}
            onChange={onDate}
            placeholder="2022/1/1 to 2022/1/1"
            value={date}
          />
        </div>
        <div className="form-input">
          <label>
            <i className="fa fa-female"></i>
          </label>
          <input
            type="text"
            placeholder="1 adult - 0 children - 1 room"
            value={valuePeopleAndRoom}
            onChange={eventChangePeopleAndRoom}
          />
        </div>
        <div className="form-input">
          <input type="button" onClick={gotoSearch} value="Search" />
        </div>
      </form>
    </div>
  );
};
export default Header;
