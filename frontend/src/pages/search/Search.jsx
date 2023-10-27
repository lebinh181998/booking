import NavBar from "../home/NavBar/NavBar";
import RegisterForm from "../home/RegisterForm/RegisterForm";
import Footer from "../home/Footer/Footer";
import SearchPopup from "./SearchPopup";
import SearchList from "./SearchList";
import "../home/Home.css";
import "./Search.css";
import { useContext, useEffect, useState } from "react";
import SearchContext from "../../context/search-context";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const ctx = useContext(SearchContext);
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!ctx.isLogin) {
      navigate("/login");
    }
    const fetchHotelsData = async () => {
      try {
        const res = await fetch("http://localhost:5000/search", {
          method: "POST",
          body: ctx.searchKeys ? JSON.stringify(ctx.searchKeys) : null,
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        // console.log(data);
        setHotels(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchHotelsData();
  }, [ctx.searchKeys]);

  return (
    <div>
      <div className="section">
        <NavBar />
      </div>
      <div className="container search-container">
        <SearchPopup />
        <SearchList hotels={hotels} />
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

export default Search;
