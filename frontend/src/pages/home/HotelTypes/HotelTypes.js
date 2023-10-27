import "./HotelTypes.css";
import React, { useEffect, useState } from "react";

const HotelTypes = () => {
  const [hotelTypesData, setHotelTypesData] = useState([]);

  useEffect(() => {
    const fetcHotelTypesData = async () => {
      try {
        const res = await fetch("http://localhost:5000/hotels");
        const data = await res.json();
        // console.log(data);
        const hotelTypesData = [
          {
            name: "Hotels",
            count: data.hotels.filter((item) => item.type === "hotel").length,
            image: "./images/type_1.webp",
          },
          {
            name: "Apartments",
            count: data.hotels.filter((item) => item.city === "apartment")
              .length,
            image: "./images/type_2.jpg",
          },
          {
            name: "Resorts",
            count: data.hotels.filter((item) => item.city === "resort").length,
            image: "./images/type_3.jpg",
          },
          {
            name: "Villas",
            count: data.hotels.filter((item) => item.city === "villa").length,
            image: "./images/type_4.jpg",
          },
          {
            name: "Cabins",
            count: data.hotels.filter((item) => item.city === "cabin").length,
            image: "./images/type_5.jpg",
          },
        ];
        setHotelTypesData(hotelTypesData);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetcHotelTypesData();
  }, []);

  return (
    <div className="hotel-types-container">
      <h3>Browse by property type</h3>
      <div className="hotel-types">
        {/* hiển thị các loại kahcsh sạn */}
        {hotelTypesData.map((type) => (
          <div key={type.name} className="hotel-type">
            <img src={type.image} alt={type.name} />
            <h3>{type.name}</h3>
            <p>{`${type.count} hotels`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default HotelTypes;
