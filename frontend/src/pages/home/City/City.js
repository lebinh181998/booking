import "./City.css";
import React, { useEffect, useState } from "react";

const City = () => {
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    const fetcHotelsData = async () => {
      try {
        const res = await fetch("http://localhost:5000/hotels");
        const data = await res.json();
        // console.log(data);
        const cityData = [
          {
            name: "Ha Noi",
            subText:
              data.hotels.filter((item) => item.city === "Ha Noi").length +
              " properties",
            image: "./cityImages/Ha Noi.jpg",
          },

          {
            name: "Ho Chi Minh",
            subText:
              data.hotels.filter((item) => item.city === "Ho Chi Minh").length +
              " properties",
            image: "./cityImages/HCM.jpg",
          },
          {
            name: "Da Nang",
            subText:
              data.hotels.filter((item) => item.city === "Da Nang").length +
              " properties",
            image: "./cityImages/Da Nang.jpg",
          },
        ];
        setCityData(cityData);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetcHotelsData();
  }, []);

  return (
    <div className="city">
      {/* hiển thị từng thành phố */}
      {cityData.map((city) => (
        <div key={city.name} className="city-item">
          <img src={city.image} alt={city.name} />
          <div className="city-subtext">
            <h1>{city.name}</h1>
            <h2>{city.subText}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};
export default City;
