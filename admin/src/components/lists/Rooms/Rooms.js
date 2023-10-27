import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import classes from "./Rooms.module.css";
import useHttp from "../../../hooks/use-http";
import Room from "./Room";

const Rooms = () => {
  const { SendToHttp, errMessage } = useHttp();
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  const resolveDataFetch = (data, err) => {
    if (!err) {
      //   console.log(data);
      setRooms(data.rooms.reverse());
    }
  };

  const onDeleteRoom = (roomID) => {
    const confirm = window.confirm("You sure delete this room.");
    if (confirm) {
      SendToHttp("admin/delete-room/" + roomID, resolveDataFetch);
    }
  };

  const onEditRoom = (roomID) => {
    navigate("/admin/edit-room/" + roomID);
  };

  const goToNewRoom = () => {
    navigate("/admin/new-room");
  };

  useEffect(() => {
    SendToHttp("admin/rooms", resolveDataFetch);
  }, []);

  return (
    <div className={`${classes.rooms}`}>
      <div className={`${classes.addnew}`}>
        <h2>Rooms List</h2>
        <button onClick={goToNewRoom}>Add New</button>
      </div>
      {errMessage.trim() != "" && (
        <h4 className="text-center text-danger">{errMessage}.</h4>
      )}
      {rooms.length > 0 && (
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
                <p>Title</p>
              </th>
              <th>
                <p>Description</p>
              </th>
              <th>
                <p>Price</p>
              </th>
              <th>
                <p>Max People</p>
              </th>
              <th>
                <p>Action</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <Room
                key={room._id}
                room={room}
                deleteRoom={onDeleteRoom}
                editRoom={onEditRoom}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default Rooms;
