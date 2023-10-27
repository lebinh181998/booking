import "./SearchPopup.css";
import React, { useContext, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import SearchContext from "../../context/search-context";
import useInput from "../../hooks/use-input";

const SearchPopup = () => {
  const ctx = useContext(SearchContext);

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
  const {
    value: valueMinPrice,
    eventChangeInput: eventChangeMinPrice,
    isValid: validMinPrice,
  } = useInput(resolveDataInput);
  const {
    value: valueMaxPrice,
    eventChangeInput: eventChangeMaxPrice,
    isValid: validMaxPrice,
  } = useInput(resolveDataInput);
  const {
    value: valueAdult,
    eventChangeInput: eventChangeAdult,
    isValid: validAdult,
  } = useInput(resolveDataInput);
  const {
    value: valueChildren,
    eventChangeInput: eventChangeChildren,
    isValid: validChildren,
  } = useInput(resolveDataInput);
  const {
    value: valueRoomCount,
    eventChangeInput: eventChangeRoomCount,
    isValid: validRoomCount,
  } = useInput(resolveDataInput);

  //cập nhật ngày tháng bằng thư viện DateRange
  //tạo state chứa start và and date
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  //tạo state hiện ngày vào input
  const [date, setDate] = useState("2022/9/12 to 2022/9/16");
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
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

  const onSearch = () => {
    ctx.onGetSearchKeys({
      city: validCity && valueCity,
      dateStart: dateStart,
      dateEnd: dateEnd,
      roomCount: validRoomCount && valueRoomCount,
      maxPrice: validMaxPrice && valueMaxPrice,
      mixPrice: validMinPrice && valueMinPrice,
    });
  };

  return (
    <div className="search-popup">
      <h2>Search</h2>
      <form>
        <div className="form-group">
          <label>Destination</label>
          <input
            type="text"
            placeholder="Hà Nội"
            value={valueCity}
            onChange={eventChangeCity}
          />
        </div>
        <div className="form-group">
          <label onClick={toggleDate}>
            Check-in Date {"  "}
            <i className="fa fa-calendar"></i>
          </label>
          <p
            type="text"
            className="date-text"
            onClick={toggleDate}
            onChange={onDate}
          >
            {date}
          </p>
          {/* hiện/ẩn form DateRange */}
          {isDate && (
            <DateRange
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              className="date-search"
              minDate={new Date()}
              onChange={onDate}
              ranges={[selectionRange]}
            />
          )}
        </div>
        <div className="form-group">
          <label>Options</label>
          <div className="option">
            <label>Min price per night</label>
            <input
              type="number"
              value={valueMinPrice}
              onChange={eventChangeMinPrice}
            />
          </div>
          <div className="option">
            <label>Max price per night</label>
            <input
              type="number"
              value={valueMaxPrice}
              onChange={eventChangeMaxPrice}
            />
          </div>
          <div className="option">
            <label>Adult</label>
            <input
              type="number"
              value={valueAdult}
              onChange={eventChangeAdult}
            />
          </div>
          <div className="option">
            <label>Children</label>
            <input
              type="number"
              value={valueChildren}
              onChange={eventChangeChildren}
            />
          </div>
          <div className="option">
            <label>Room</label>
            <input
              type="number"
              value={valueRoomCount}
              onChange={eventChangeRoomCount}
            />
          </div>
        </div>
        <div className="form-group">
          <input type="button" onClick={onSearch} value="Search" />
        </div>
      </form>
    </div>
  );
};
export default SearchPopup;
