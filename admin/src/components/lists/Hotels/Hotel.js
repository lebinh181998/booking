import React from "react";

const Hotel = (props) => {
  const { hotel, deleteHotel, editHotel } = props;

  const onDeleteHotel = () => {
    deleteHotel(hotel._id);
  };

  const onEditHotel = () => {
    editHotel(hotel._id);
  };

  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>{hotel._id}</td>
      <td>{hotel.name}</td>
      <td>{hotel.type}</td>
      <td>{hotel.title}</td>
      <td>{hotel.city}</td>
      <td>
        <button onClick={onDeleteHotel} className={``}>
          Delete
        </button>
        <button onClick={onEditHotel} className={``}>
          Edit
        </button>
      </td>
    </tr>
  );
};
export default Hotel;
