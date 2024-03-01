import ItemList from "./ItemList";

const RestaurantCategory = (props) => {
  console.log(props);
  const handleClick = () => {
    props.setExpandItems((last) =>
      props.data.title === last ? "" : props.data.title
    );
  };
  return (
    <div className="bg-white my-2 p-4 shadow-lg">
      <div
        className="flex justify-between cursor-pointer"
        onClick={handleClick}
      >
        <h2 className="font-bold text-xl">
          {props.data.title} ({props.data.itemCards.length})
        </h2>
        <span className="bg-transparent">{props.showItems ? "⬆" : "⬇"}</span>
      </div>
      {props.showItems && <ItemList items={props.data.itemCards} />}
    </div>
  );
};
export default RestaurantCategory;
