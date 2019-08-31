import React from "react";
import { connect } from "react-redux";

import { clearItemFromCart } from "../../actions/cartAction";

const CheckoutItem = ({ cartItem, clearItemFromCart }) => {
  const { name, avatar, volume, quantity } = cartItem;
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={avatar} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">{quantity}</span>
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
  { clearItemFromCart }
)(CheckoutItem);
