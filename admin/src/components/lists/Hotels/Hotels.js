import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import classes from "./Hotels.module.css";
import useHttp from "../../../hooks/use-http";
import Hotel from "./Hotel";

const Hotels = () => {
  const { SendToHttp, errMessage } = useHttp();
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  const resolveDataFetch = (data, err) => {
    if (!err) {
      //   console.log(data);
      setHotels(data.hotels.reverse());
    }
  };

  const onDeleteHotel = (hotelID) => {
    const confirm = window.confirm("You sure delete this hotel.");
    if (confirm) {
      SendToHttp("admin/delete-hotel/" + hotelID, resolveDataFetch);
    }
  };
  const onEditHotel = (hotelID) => {
    navigate("/admin/edit-hotel/" + hotelID);
  };

  const goToNewHotel = () => {
    navigate("/admin/new-hotel");
  };

  useEffect(() => {
    SendToHttp("admin/hotels", resolveDataFetch);
  }, []);

  return (
    <div className={`${classes.hotels}`}>
      <div className={`${classes.addnew}`}>
        <h2>Hotels List</h2>
        <button onClick={goToNewHotel}>Add New</button>
      </div>
      {errMessage.trim() != "" && (
        <h4 className="text-center text-danger">{errMessage}.</h4>
      )}
      {hotels.length > 0 && (
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
                <p>Name</p>
              </th>
              <th>
                <p>Type</p>
              </th>
              <th>
                <p>Title</p>
              </th>
              <th>
                <p>City</p>
              </th>
              <th>
                <p>Action</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => (
              <Hotel
                key={hotel._id}
                hotel={hotel}
                deleteHotel={onDeleteHotel}
                editHotel={onEditHotel}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default Hotels;
