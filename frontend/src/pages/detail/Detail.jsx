import NavBar from "../home/NavBar/NavBar";
import RegisterForm from "../home/RegisterForm/RegisterForm";
import Footer from "../home/Footer/Footer";
import "../home/Home.css";
import "./Detail.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReserveForm from "./ReserveForm/ReserveForm";
import SearchContext from "../../context/search-context";

const Detail = () => {
  const param = useParams();
  const [hotel, setHotel] = useState(null);
  //hiện/ẩn form reserve
  const [isReserve, setIsReserve] = useState(false);
  const toggleReserve = () => {
    setIsReserve((prevIsReserve) => !prevIsReserve);
  };

  const ctx = useContext(SearchContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!ctx.isLogin) {
      navigate("/login");
    }
    const fetchHotelData = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/detail/" + param.hotelID
        );
        const data = await res.json();
        // console.log(data);
        setHotel(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchHotelData();
  }, []);

  return (
    <div>
      <div className="section">
        <NavBar />
      </div>
      {hotel && (
        <div className="detail-container">
          <div className="detail-info">
            <div className="detail-show">
              <h2>{hotel.name}</h2>
              <p className="detail-address">
                <i className="fa fa-map-marker"></i>
                {hotel.address}
              </p>
              <p className="detail-distance">{hotel.distance}m from center</p>
              <p className="detail-price">
                Book a stay over ${hotel.cheapestPrice} at this property and get
                a free airport taxi
              </p>
            </div>
            <div className="book-or-not">
              <button onClick={toggleReserve}>Reserve or Book Now!</button>
            </div>
          </div>
          <div className="detail-img">
            {hotel.photos.map((photo) => (
              <img key={photo} src={photo.trim()} alt={hotel.name} />
            ))}
          </div>
          <div className="detail-description">
            <div className="detail-descroption_text">
              <h2>{hotel.title}</h2>
              <p>{hotel.desc}</p>
            </div>
            <div className="detail-nine_nights">
              <p>Perfect for a 9-night stay</p>
              <p>
                Located in the new heart of Krakow, this property has an
                exellent location score of 9.8!
              </p>
              <p className="detail-price">
                <span>${hotel.cheapestPrice} </span>
                (9 nights)
              </p>
              <button onClick={toggleReserve}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
      )}
      {isReserve && <ReserveForm />}
      <div className="section">
        <RegisterForm />
      </div>
      <div className="container">
        <Footer />
      </div>
    </div>
  );
};

export default Detail;
