import { IMAGE_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { info } = props.dat;
  return (
    <div className="m-2 p-2 w-[250px] bg-slate-200 rounded-lg hover:bg-slate-300">
      <img
        className="rounded-lg"
        src={IMAGE_URL + info.cloudinaryImageId}
      ></img>
      <h3 className="font-bold py-4 text-lg">{info.name}</h3>
      <h4>{info.cuisines.join(", ")}</h4>
      <h4>Rating: {info.avgRating}*</h4>
      <h4>{info.costForTwo}</h4>
      <h4>{info.sla.deliveryTime}min</h4>
    </div>
  );
};

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label>Promoted</label>
        <RestaurantCard dat={props.dat} />
      </div>
    );
  };
};

export default RestaurantCard;
