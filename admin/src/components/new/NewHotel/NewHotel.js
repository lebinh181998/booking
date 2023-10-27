import React, { useEffect, useState } from "react";
import classes from "./NewHotel.module.css";
import useHttp from "../../../hooks/use-http";
import useInput from "../../../hooks/use-input";
import { useNavigate, useLoaderData } from "react-router-dom";

const NewHotel = (props) => {
  const { edit } = props;
  const data = useLoaderData();
  let hotel = {};
  const { SendToHttp } = useHttp();
  const [rooms, setRooms] = useState([]);
  const [valueRooms, setValueRooms] = useState([]);
  const [errorRooms, setErrorRooms] = useState(false);
  const [valueImages, setValueImages] = useState([]);
  const [errorImages, setErrorImages] = useState(false);

  if (edit) {
    hotel = data.res.hotel;
  }

  const resolveDataFetch = (data, err) => {
    if (!err) {
      // console.log(data);
      setRooms(data.rooms);
    }
  };
  useEffect(() => {
    SendToHttp("admin/rooms", resolveDataFetch);
    if (edit) {
      setValueRooms(hotel.rooms.map((item) => item._id));
      setValueImages(hotel.photos.join(", "));
    } else {
      resetName();
      resetType();
      resetCity();
      resetAddress();
      resetDistance();
      resetTitle();
      resetDescription();
      resetPrice();
      setValueImages([]);
      setValueRooms([]);
    }
  }, [edit]);

  const navigate = useNavigate();

  const resolveDataInput = (data) => data.trim() != "";
  const {
    value: valueName,
    error: errorName,
    valid: validName,
    eventChangeInput: eventChangeName,
    eventBlurInput: eventBlurName,
    resetInput: resetName,
  } = useInput(resolveDataInput, edit && hotel.name);
  const {
    value: valueType,
    error: errorType,
    valid: validType,
    eventChangeInput: eventChangeType,
    eventBlurInput: eventBlurType,
    resetInput: resetType,
  } = useInput(resolveDataInput, edit && hotel.type);
  const {
    value: valueCity,
    error: errorCity,
    valid: validCity,
    eventChangeInput: eventChangeCity,
    eventBlurInput: eventBlurCity,
    resetInput: resetCity,
  } = useInput(resolveDataInput, edit && hotel.city);
  const {
    value: valueAddress,
    error: errorAddress,
    valid: validAddress,
    eventChangeInput: eventChangeAddress,
    eventBlurInput: eventBlurAddress,
    resetInput: resetAddress,
  } = useInput(resolveDataInput, edit && hotel.address);
  const {
    value: valueDistance,
    error: errorDistance,
    valid: validDistance,
    eventChangeInput: eventChangeDistance,
    eventBlurInput: eventBlurDistance,
    resetInput: resetDistance,
  } = useInput(resolveDataInput, edit && hotel.distance);
  const {
    value: valueTitle,
    error: errorTitle,
    valid: validTitle,
    eventChangeInput: eventChangeTitle,
    eventBlurInput: eventBlurTitle,
    resetInput: resetTitle,
  } = useInput(resolveDataInput, edit && hotel.title);
  const {
    value: valueDescription,
    error: errorDescription,
    valid: validDescription,
    eventChangeInput: eventChangeDescription,
    eventBlurInput: eventBlurDescription,
    resetInput: resetDescription,
  } = useInput(resolveDataInput, edit && hotel.desc);
  const {
    value: valuePrice,
    error: errorPrice,
    valid: validPrice,
    eventChangeInput: eventChangePrice,
    eventBlurInput: eventBlurPrice,
    resetInput: resetPrice,
  } = useInput(resolveDataInput, edit && String(hotel.cheapestPrice));
  const {
    value: valueFeatured,
    valid: validFeatured,
    eventChangeInput: eventChangeFeatured,
    eventBlurInput: eventBlurFeatured,
    resetInput: resetFeatured,
  } = useInput(resolveDataInput, edit ? String(hotel.featured) : "false");

  const eventChangeImages = (e) => {
    setErrorImages(false);
    let images = e.target.value;
    setValueImages(images);
  };

  const onCheckedRoom = (roomID) => {
    setErrorRooms(false);
    if (!valueRooms.includes(roomID)) {
      setValueRooms((prevValueRooms) => [...prevValueRooms, roomID]);
    } else {
      setValueRooms((prevValueRooms) =>
        prevValueRooms.filter((item) => item != roomID)
      );
    }
  };

  const onSubmitNewHotel = (e) => {
    e.preventDefault();
    const validSubmit =
      validName &&
      validType &&
      validCity &&
      validAddress &&
      validDistance &&
      validTitle &&
      validDescription &&
      validPrice &&
      validFeatured &&
      valueImages.length > 0 &&
      valueRooms.length > 0;

    if (validSubmit) {
      const url = "admin/new-hotel";
      const method = "POST";
      const bodyRequest = {
        name: valueName,
        type: valueType,
        city: valueCity,
        address: valueAddress,
        distance: Number(valueDistance),
        title: valueTitle,
        desc: valueDescription,
        cheapestPrice: Number(valuePrice),
        photos: valueImages.split(",").filter((item) => item.trim() != ""),
        featured: valueFeatured,
        rooms: valueRooms,
      };
      const headers = { "Content-Type": "application/json" };
      if (edit) {
        SendToHttp(
          "admin/edit-hotel",
          (data, err) => {
            if (!err) {
              navigate("/admin/hotels");
            }
          },
          method,
          { ...bodyRequest, hotelID: hotel._id },
          headers
        );
      } else {
        SendToHttp(
          url,
          (data, err) => {
            if (!err) {
              navigate("/admin/hotels");
            }
          },
          method,
          bodyRequest,
          headers
        );
      }
    } else {
      eventBlurName();
      eventBlurType();
      eventBlurCity();
      eventBlurAddress();
      eventBlurDistance();
      eventBlurTitle();
      eventBlurDescription();
      eventBlurPrice();
      eventBlurFeatured();
      setErrorImages(true);
      setErrorRooms(true);
    }
  };

  return (
    <div className={`${classes["new-hotel"]}`}>
      <h2>Add New Hotel</h2>
      <form onSubmit={onSubmitNewHotel}>
        <div>
          <label>
            <span>Name</span>
            {errorName && (
              <span className={`text-danger mb-0 fw-normal`}>
                Please enter name
              </span>
            )}
          </label>
          <input
            type="text"
            placeholder="My Hotel"
            onChange={eventChangeName}
            value={valueName}
          />
        </div>
        <div>
          <label>
            <span>Type</span>
            {errorType && (
              <span className={`text-danger mb-0 fw-normal`}>
                Please enter type
              </span>
            )}
          </label>
          <input
            type="text"
            placeholder="hotel"
            onChange={eventChangeType}
            value={valueType}
          />
        </div>
        <div>
          <label>
            <span>City</span>
            {errorCity && (
              <span className={`text-danger mb-0 fw-normal`}>
                Please enter city
              </span>
            )}
          </label>
          <input
            type="text"
            placeholder="New York"
            onChange={eventChangeCity}
            value={valueCity}
          />
        </div>
        <div>
          <label>
            <span>Address</span>
            {errorAddress && (
              <span className={`text-danger mb-0 fw-normal`}>
                Please enter address
              </span>
            )}
          </label>
          <input
            type="text"
            placeholder="elton st, 216"
            onChange={eventChangeAddress}
            value={valueAddress}
          />
        </div>
        <div>
          <label>
            <span>Distance from City Center</span>
            {errorDistance && (
              <span className={`text-danger mb-0 fw-normal`}>
                Please enter distance
              </span>
            )}
          </label>
          <input
            type="number"
            placeholder="500"
            onChange={eventChangeDistance}
            value={valueDistance}
          />
        </div>
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
            placeholder="The best Hotel"
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
            placeholder="description"
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
            <span>Images</span>
            {errorImages && (
              <span className={`text-danger mb-0 fw-normal`}>
                Please enter images
              </span>
            )}
          </label>
          <textarea onChange={eventChangeImages} value={valueImages}></textarea>
        </div>
        <div>
          <label>
            <span>Featured</span>
          </label>
          <select onChange={eventChangeFeatured} value={valueFeatured}>
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
        </div>
        <div>
          <label>
            <span>Rooms</span>
            {errorRooms && (
              <span className={`text-danger mb-0 fw-normal`}>
                Please choose rooms
              </span>
            )}
          </label>
          <ul>
            {rooms.length > 0 &&
              rooms.map((room) => (
                <li
                  onClick={onCheckedRoom.bind(null, room._id)}
                  className={`${
                    valueRooms.includes(room._id) && classes["li-ckecked"]
                  }`}
                  key={room._id}
                >
                  {room.title}
                </li>
              ))}
          </ul>
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};
export default NewHotel;

export async function loader({ requset, params }) {
  const hotelID = params.hotelID;
  const res = await fetch("http://localhost:5000/admin/edit-hotel/" + hotelID);
  const data = await res.json();

  return { res: data };
}
