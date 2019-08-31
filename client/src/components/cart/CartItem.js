import React from "react";

const CartItem = ({ item }) => {
  console.log(item);
  return (
    <div className="cart-item">
      <img src={item.avatar} alt="item" />
      <div className="item-details">
        <span className="name">{item.brand}</span>
        <span className="name">
          {item.volume} x {item.quantity}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
