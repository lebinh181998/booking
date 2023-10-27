import React from "react";

const Room = (props) => {
  const { room, deleteRoom, editRoom } = props;

  const onDeleteRoom = () => {
    deleteRoom(room._id);
  };

  const onEditRoom = () => {
    editRoom(room._id);
  };

  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>{room._id}</td>
      <td>{room.title}</td>
      <td>{room.desc}</td>
      <td>{room.price}</td>
      <td>{room.maxPeople}</td>
      <td>
        <button onClick={onDeleteRoom} className={``}>
          Delete
        </button>
        <button onClick={onEditRoom} className={``}>
          Edit
        </button>
      </td>
    </tr>
  );
};
export default Room;
