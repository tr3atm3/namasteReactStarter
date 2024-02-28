import { IMAGE_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { info } = props.dat;
  return (
    <div className="res-card">
      <img
        className="res-card-img"
        src={IMAGE_URL + info.cloudinaryImageId}
      ></img>
      <h3>{info.name}</h3>
      <h4>{info.cuisines.join(", ")}</h4>
      <h4>Rating: {info.avgRating}*</h4>
      <h4>{info.costForTwo}</h4>
      <h4>{info.sla.deliveryTime}min</h4>
    </div>
  );
};

export default RestaurantCard;
