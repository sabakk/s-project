import React from "react";
import { connect } from "react-redux";

import {
  clearItemFromCart,
  addItem,
  deleteItem
} from "../../actions/cartAction";

const CheckoutItem = ({ cartItem, clearItemFromCart, addItem, deleteItem }) => {
  const { name, avatar, volume, quantity } = cartItem;
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={avatar} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => deleteItem(cartItem)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItem(cartItem)}>
          &#10095;
        </div>
      </span>
      <span className="price">{volume}</span>
      <div
        className="remove-button"
        onClick={() => clearItemFromCart(cartItem)}
      >
        &#10005;
      </div>
    </div>
  );
};

export default connect(
  null,
  { clearItemFromCart, addItem, deleteItem }
)(CheckoutItem);
