import RestaurantCard from "./RestaurantCard";

import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [res, setRes] = useState([]);
  const [data, setData] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const onlineStatus = useOnlineStatus();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    setRes(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
    setData(
      json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
    );
  };

  const filterClickHandler = () => {
    setData(() => {
      return res.filter((dat) => dat.info.avgRating > 4.5);
    });
  };

  const searchClickHandler = () => {
    console.log(searchedText);
    setData(() => {
      return res.filter((dat) =>
        dat.info.name.toLowerCase().includes(searchedText.toLowerCase())
      );
    });
  };
  const searchChangeHandler = (e) => {
    setSearchedText(e.target.value);
  };
  if (!onlineStatus) {
    return (
      <h1 style={{ width: "80%", margin: "0 auto" }}>
        Check your internet connection
      </h1>
    );
  }

  if (data.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="body">
      <div className="filter">
        <input
          type="text"
          className="search-box"
          value={searchedText}
          onChange={searchChangeHandler}
        ></input>
        <button onClick={searchClickHandler}>Search</button>

        <button className="filter-btn" onClick={filterClickHandler}>
          Top rated Restaurant
        </button>
      </div>
      <div className="res-container">
        {data.map((dat) => (
          <Link key={dat.info.id} to={"/restaurants/" + dat.info.id}>
            <RestaurantCard dat={dat} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
