import "./HotelList.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HotelList = () => {
  const [hotelListData, setHotelListData] = useState([]);

  useEffect(() => {
    const fetcHotelsListData = async () => {
      try {
        const res = await fetch("http://localhost:5000/hotels");
        const data = await res.json();
        // console.log(data);
        const hotelListData = data.hotels.filter(
          (item) => item.featured == true
        );
        setHotelListData(hotelListData);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetcHotelsListData();
  }, []);

  return (
    <div className="hotel-list-container">
      <h3>Homes guests love</h3>
      <div className="hotel-list">
        {/* hiển thị danh sách các khách sạn */}
        {hotelListData.map((hotel) => (
          <div key={hotel.name} className="hotel">
            <img src={hotel.photos[0].trim()} alt={hotel.name} />
            <h4>
              <Link to={`/detail/${hotel._id}`}>{hotel.name}</Link>
            </h4>
            <p className="city-name">{hotel.city}</p>
            <p className="hotel-price">{`Startling from $${hotel.cheapestPrice}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default HotelList;
