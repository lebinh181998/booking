import React, { useEffect, useState } from "react";
import classes from "./NewRoom.module.css";
import useHttp from "../../../hooks/use-http";
import useInput from "../../../hooks/use-input";
import { useNavigate, useLoaderData } from "react-router-dom";

const NewRoom = (props) => {
  const { edit } = props;
  const data = useLoaderData();
  let room = {};
  const { SendToHttp } = useHttp();
  const [hotels, setHotels] = useState([]);
  const [valueRooms, setValueRooms] = useState([]);
  const [errorRooms, setErrorRooms] = useState(false);
  const navigate = useNavigate();

  if (edit) {
    room = data.res.room;
  }

  const resolveDataFetch = (data, err) => {
    if (!err) {
      // console.log(data);
      setHotels(data.hotels);
    }
  };
  useEffect(() => {
    SendToHttp("admin/hotels", resolveDataFetch);
    if (edit) {
      setValueRooms(room.roomNumbers.join(", "));
    } else {
      resetTitle();
      resetDescription();
      resetPrice();
      resetPeople();
      setValueRooms([]);
    }
  }, [edit]);

  const resolveDataInput = (data) => data.trim() != "";
  const {
    value: valueTitle,
    error: errorTitle,
    valid: validTitle,
    eventChangeInput: eventChangeTitle,
    eventBlurInput: eventBlurTitle,
    resetInput: resetTitle,
  } = useInput(resolveDataInput, edit && room.title);
  const {
    value: valueDescription,
    error: errorDescription,
    valid: validDescription,
    eventChangeInput: eventChangeDescription,
    eventBlurInput: eventBlurDescription,
    resetInput: resetDescription,
  } = useInput(resolveDataInput, edit && room.desc);
  const {
    value: valuePrice,
    error: errorPrice,
    valid: validPrice,
    eventChangeInput: eventChangePrice,
    eventBlurInput: eventBlurPrice,
    resetInput: resetPrice,
  } = useInput(resolveDataInput, edit && String(room.price));
  const {
    value: valuePeople,
    error: errorPeople,
    valid: validPeople,
    eventChangeInput: eventChangePeople,
    eventBlurInput: eventBlurPeople,
    resetInput: resetPeople,
  } = useInput(resolveDataInput, edit && String(room.maxPeople));
  const {
    value: valueHotel,
    eventChangeInput: eventChangeHotel,
    resetInput: resetHotel,
  } = useInput(resolveDataInput, edit && room.hotelID);

  const eventChangeRooms = (e) => {
    setErrorRooms(false);
    let rooms = e.target.value;
    setValueRooms(rooms);
  };

  const onSubmitNewRoom = (e) => {
    e.preventDefault();
    const validSubmit =
      validTitle &&
      validDescription &&
      validPrice &&
      valuePeople &&
      valueRooms.length > 0;
    if (validSubmit) {
      const url = "admin/new-room";
      const method = "POST";
      const bodyRequest = {
        title: valueTitle,
        desc: valueDescription,
        price: Number(valuePrice),
        maxPeople: Number(valuePeople),
        roomNumbers: valueRooms.split(",").filter((item) => item.trim() != ""),
        hotelID: valueHotel.trim() != "" ? valueHotel : null,
      };
      const headers = { "Content-Type": "application/json" };
      if (edit) {
        SendToHttp(
          "admin/edit-room",
          (data, err) => {
            if (!err) {
              navigate("/admin/rooms");
            }
          },
          method,
          { ...bodyRequest, roomID: room._id },
          headers
        );
      } else {
        SendToHttp(
          url,
          (data, err) => {
            if (!err) {
              navigate("/admin/rooms");
            }
          },
          method,
          bodyRequest,
          headers
        );
      }
    } else {
      eventBlurTitle();
      eventBlurDescription();
      eventBlurPrice();
      eventBlurPeople();
      setErrorRooms(true);
    }
  };

  return (
    <div className={`${classes["new-room"]}`}>
      <h2>Add New Room</h2>
      <form onSubmit={onSubmitNewRoom}>
        <div>
          <label>
            <span>Title</span>
            {errorTitle && (
              <span className={`text-danger mb-0 fw-normal`}>
                Please enter title
              </span>
            )}
          </label>
          <input
            type="text"
            placeholder="2 Bed Room"
            onChange={eventChangeTitle}
            value={valueTitle}
          />
        </div>
        <div>
          <label>
            <span>Description</span>
            {errorDescription && (
              <span className={`text-danger mb-0 fw-normal`}>
                Please enter description
              </span>
            )}
          </label>
          <input
            type="text"
            placeholder="King size bed, 1 bathroom"
            onChange={eventChangeDescription}
            value={valueDescription}
          />
        </div>
        <div>
          <label>
            <span>Price</span>
            {errorPrice && (
              <span className={`text-danger mb-0 fw-normal`}>
                Please enter price
              </span>
            )}
          </label>
          <input
            type="number"
            placeholder="100"
            onChange={eventChangePrice}
            value={valuePrice}
          />
        </div>
        <div>
          <label>
            <span>Max People</span>
            {errorPeople && (
              <span className={`text-danger mb-0 fw-normal`}>
                Please enter people
              </span>
            )}
          </label>
          <input
            type="number"
            placeholder="2"
            onChange={eventChangePeople}
            value={valuePeople}
          />
        </div>
        <div className="div-last">
          <div>
            <label>
              <span>Rooms</span>
              {errorRooms && (
                <span className={`text-danger mb-0 fw-normal`}>
                  Please enter rooms
                </span>
              )}
            </label>
            <textarea
              onChange={eventChangeRooms}
              placeholder="give comma between room numbers."
              value={valueRooms}
            ></textarea>
          </div>
          <div>
            <label>
              <span>Choose a Hotel</span>
            </label>
            <select onChange={eventChangeHotel} value={valueHotel}>
              <option value="">Choose a Hotel</option>
              {hotels.length > 0 &&
                hotels.map((hotel) => (
                  <option key={hotel._id} value={hotel._id}>
                    {hotel.name}
                  </option>
                ))}
            </select>
          </div>
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};
export default NewRoom;
export async function loader({ requset, params }) {
  const roomID = params.roomID;
  const res = await fetch("http://localhost:5000/admin/edit-room/" + roomID);
  const data = await res.json();

  return { res: data };
}
