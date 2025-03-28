import React from "react";
import "./ItemList.css";
import { CDN_URL } from "../../utils/Contrants";
// redux disptach
import { useDispatch } from "react-redux";
import { addItems } from "../../utils/cartSlice";

const ItemList = ({ items }) => {
  // Redux Things
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    // Dispatch and Action
    dispatch(addItems(item));
  };
  return (
    <div className="item-list">
      {items.map((item) => (
        <div key={item.card.info.id} className="item-card">
          <div className="item-image">
            <img
              src={`${CDN_URL}${item?.card?.info?.imageId}`}
              alt={item.card.info.name}
            />

            <div className="add-btn-container">
              <button className="add-btn" onClick={() => handleAddItem(item)}>
                Add +
              </button>
            </div>
          </div>

          <div className="item-details">
            <h3 className="item-title">{item.card.info.name}</h3>
            <p className="item-price">
              ₹
              {item.card.info.price
                ? item.card.info.price / 100
                : item.card.info.defaultPrice / 100}
            </p>
            <p className="item-description">{item.card.info.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
