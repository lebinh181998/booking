import "./NavBar.css";
import React, { useContext, useState } from "react";
import NavBarItem from "./NavBarItem";
import { Link, useNavigate } from "react-router-dom";
import SearchContext from "../../../context/search-context";

const NavBar = () => {
  const ctx = useContext(SearchContext);
  const navigate = useNavigate();
  const user = ctx.user;

  const NAVBAR_DATA = [
    {
      type: "Stays",
      icon: "fa-bed",
      active: true,
    },
    {
      type: "Flights",
      icon: "fa-plane",
      active: false,
    },
    {
      type: "Car rentals",
      icon: "fa-car",
      active: false,
    },
    {
      type: "Attractions",
      icon: "fa-bed",
      active: false,
    },
    {
      type: "Airport taxis",
      icon: "fa-taxi",
      active: false,
    },
  ];
  const [navbarData, setNavBarData] = useState(NAVBAR_DATA);

  // thêm border cho item được click vào
  const onActiveType = (e) => {
    const type = e.target.textContent;
    navbarData.map((data, i) => {
      if (data.type === type) {
        data.active = true;
      } else {
        data.active = false;
      }
    });
    setNavBarData(() => {
      return [...navbarData];
    });
  };

  const onLogout = () => {
    localStorage.removeItem("USER");
    ctx.onCreateUser(undefined);
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="title">
        <p className="webname">
          <a href="/">Booking Website</a>
        </p>
        {user ? (
          <div className="account-container">
            <p>{user.username}</p>
            <Link to={`/transactions/${user.username}`}>Transactions</Link>
            <button onClick={onLogout}>Logout</button>
          </div>
        ) : (
          <div className="account-container">
            <Link to="/signup">Register</Link>
            <Link to="/login">Login</Link>
          </div>
        )}
      </div>
      <ul className="types">
        {/* hiển thị các item */}
        {navbarData.map((data) => (
          <NavBarItem key={data.type} data={data} onActiveType={onActiveType} />
        ))}
      </ul>
    </div>
  );
};

export default NavBar;
