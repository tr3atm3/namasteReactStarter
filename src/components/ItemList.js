import { CATEGORIES_IMAGE } from "../utils/constants";

const ItemList = ({ items }) => {
  //   console.log(items);

  return (
    <div>
      {items.map((item) => {
        const { id, isVeg, name, description, price, imageId } = item.card.info;
        return (
          <div key={id} className="flex justify-between my-8 border-b-2">
            <div className="w-[60%]">
              <div className="text-xs">{isVeg ? "🟢" : "🔴"}</div>
              <h2 className="font-bold">{name}</h2>
              <h3 className="font-bold">₹{price / 100}</h3>
              <p className="my-6 text-gray-500">{description}</p>
            </div>
            <div className="relative">
              <img
                className="w-40 h-28 rounded-lg"
                src={CATEGORIES_IMAGE + imageId}
              ></img>
              <button className="shadow-lg text-lg px-6 py-2 z-10 absolute bottom-24 bg-white right-10 rounded-lg text-green-400">
                Add
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
