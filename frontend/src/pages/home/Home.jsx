import NavBar from "./NavBar/NavBar";
import Header from "./Header/Header";
import City from "./City/City";
import HotelTypes from "./HotelTypes/HotelTypes";
import HotelList from "./HotelList/HotelList";
import "./Home.css";
import RegisterForm from "./RegisterForm/RegisterForm";
import Footer from "./Footer/Footer";
import { useContext, useEffect } from "react";
import SearchContext from "../../context/search-context";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const ctx = useContext(SearchContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!ctx.isLogin) {
      navigate("/login");
    }
  }, [ctx.isLogin]);

  return (
    <div>
      <div className="section">
        <NavBar />
        <Header />
      </div>
      <div className="container">
        <City />
        <HotelTypes />
        <HotelList />
      </div>
      <div className="section">
        <RegisterForm />
      </div>
      <div className="container">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
