import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";

import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [res, setRes] = useState([]);
  const [data, setData] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const onlineStatus = useOnlineStatus();
  // console.log(res);

  const RestaurantPromotedCard = withPromotedLabel(RestaurantCard);
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
    <div className="">
      <div className="flex m-4 p-4 items-center">
        <input
          type="text"
          className=" border border-solid border-black h-8"
          value={searchedText}
          onChange={searchChangeHandler}
        ></input>
        <button
          className="px-4 py-1 bg-blue-200 m-4 rounded-lg"
          onClick={searchClickHandler}
        >
          Search
        </button>

        <button
          className="px-6 py-2 bg-blue-200 m-4 rounded-lg"
          onClick={filterClickHandler}
        >
          Top rated Restaurant
        </button>
      </div>
      <div className="flex flex-wrap mx-auto my-0 w-[95%]">
        {data.map((dat) => (
          <Link key={dat.info.id} to={"/restaurants/" + dat.info.id}>
            {dat.info.promoted ? (
              <RestaurantPromotedCard dat={dat} />
            ) : (
              <RestaurantCard dat={dat} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
