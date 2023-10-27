import React from "react";
const Room = (props) => {
  const { room, onCheckedRoom, roomNumbers, date } = props;
  return (
    <div className="room" key={room._id}>
      <div className="room-info">
        <p className="room-title">{room.title}</p>
        <p className="room-date">Pay nothing until {date}</p>
        <p className="room-people">
          Max people: <span>{room.maxPeople}</span>
        </p>
        <p className="room-price">${room.price}</p>
      </div>
      <div className="room-numbers">
        <ul>
          {room.roomNumbers.map((rn) => {
            const roomNbs = roomNumbers.filter((item) => item._id == room._id);
            const isChecked =
              roomNbs && roomNbs[0]
                ? roomNbs[0].roomNumbers.includes(rn)
                : false;
            return (
              <li key={rn}>
                <label htmlFor={room._id + "" + rn}>{rn}</label>
                <input
                  id={room._id + "" + rn}
                  className="checkbox"
                  onClick={(e) =>
                    onCheckedRoom({
                      _id: room._id,
                      roomNumber: rn,
                      price: room.price,
                      checked: e.target.checked,
                    })
                  }
                  onChange={() => {}}
                  checked={isChecked}
                  type="checkbox"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Room;
