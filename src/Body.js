import RestaurantCard from "./RestaurantCard";

import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
const Body = () => {
  const [res, setRes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    setRes(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
  };

  const filterClickHandler = () => {
    setRes(() => {
      return data.filter((dat) => dat.rating > 4);
    });
  };

  if (res.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="body">
      <div className="search">Search</div>
      <div className="filter">
        <button className="filter-btn" onClick={filterClickHandler}>
          Top rated Restaurant
        </button>
      </div>
      <div className="res-container">
        {res.map((dat) => (
          <RestaurantCard key={dat.info.id} dat={dat} />
        ))}
      </div>
    </div>
  );
};

export default Body;
