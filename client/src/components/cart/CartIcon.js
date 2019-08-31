import React from "react";
import { connect } from "react-redux";
import { toggleCartHidden } from "../../actions/cartAction";

import { ReactComponent as ShoppingIcon } from "../../img/cart.svg";

const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count">{itemCount}</span>
  </div>
);

const mapStateToProps = state => {
  return {
    itemCount: state.cart.cartItems.reduce(
      (acc, cartItem) => acc + cartItem.quantity,
      0
    )
  };
};

export default connect(
  mapStateToProps,
  { toggleCartHidden }
)(CartIcon);
