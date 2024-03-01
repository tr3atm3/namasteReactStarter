import React, { useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [expandItems, setExpandItems] = useState("Recommended");
  if (resInfo === null) {
    return <Shimmer />;
  }
  const {
    id,
    name,
    cuisines,
    avgRating,
    areaName,
    totalRatingsString,
    feeDetails,
    costForTwoMessage,
  } = resInfo?.cards[0]?.card?.card?.info;
  // console.log(resInfo?.cards[0]?.card?.card?.info);

  const { itemCards } =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card.card;

  const categories =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  console.log(categories);

  return (
    <div className="mx-auto w-[40%] my-8">
      <div className=" flex justify-between ">
        <div>
          <h1 className=" font-bold my-4 text-2xl">{name}</h1>
          <h3 className="">{cuisines.join(", ")}</h3>
          <h3 className="">{areaName}</h3>

          <p className="my-3">
            🚴‍♀️
            {feeDetails.message}
          </p>
        </div>
        <div className="py-4">
          <h3 className="text-xl my-3 text-center">⭐{avgRating}</h3>
          <h3 className="text-sm text-center m-2">{totalRatingsString}</h3>
        </div>
      </div>
      <div className="w-[100%] h-0 my-8 border-t-2 border-dotted border-black"></div>
      <div className="">
        {categories.map((category) => (
          <RestaurantCategory
            key={category?.card?.card.title}
            data={category?.card?.card}
            showItems={expandItems === category?.card?.card.title}
            setExpandItems={setExpandItems}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
