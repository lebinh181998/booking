import { Link } from "react-router-dom";
import "./SearchListItem.css";
import React from "react";

const SearchListItem = (props) => {
  return (
    <div className="hotel-result">
      <img src={props.data.photos[0]} alt={props.data.name} />
      <div className="hotel-info">
        <h2>{props.data.name}</h2>
        <p>{props.data.distance} from center</p>
        <p className="hotel-description">{props.data.desc}</p>
        <p>{props.data.type}</p>
      </div>
      <div className="hotel-detail">
        <div className="hotel-rate">
          <p>{props.data.rating > 7 ? "Excellent" : "Good"}</p>
          <p>{props.data.rating && props.data.rating.toFixed(1)}</p>
        </div>
        <div className="hotel-price">
          <p>${props.data.cheapestPrice}</p>
          <p>includes taxis and frees</p>
          <Link to={`/detail/${props.data._id}`}>See availability</Link>
        </div>
      </div>
    </div>
  );
};
export default SearchListItem;
