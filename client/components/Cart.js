import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setProductsThunk } from "../store/allproducts";
import {
  clearCartThunk,
  updateQuantityCartThunk,
  removeFromCartThunk,
  setCartThunk,
} from "../store/cart";
import Checkout from "./Checkout";
import GuestCheck from "./GuestCheck";

//Possible rendition of Cart, piggy-backed off of AllProducts page, have to add quantity change option.
// NOT ADDED TO ROUTES YET

export function Cart(props) {
  const [quantity, setQuantity] = useState([]);
  let [cart, setCart] = useState([]);

  let quantityArr = [];


  const handleChange = (evt) => {
    setQuantity([evt.target.value]);
    quantityArr[evt.target.name] = evt.target.value;
  };




  const handleSubmit = (product) => {
    //check to see if product is in cart if so increment qty of the cart if not add item to the cart
    const cart = props.cart;
    const userId = props.auth.id;
    let filter = cart.filter((cartProd) => cartProd.id === product.id);
    if (filter.length) {
      let newquantity = 1 * quantity;
      if (newquantity > product.inventory) {
        newquantity = product.inventory;
      }
      props.updateCart(userId, product.id, newquantity);
    }
  };

  useEffect(() => {
    props.fetchCart(props.auth.id);
    setCart(props.cart);
  }, []);

  if (!cart.length && !props.cart.length) {
    return <h2>Cart Empty</h2>;
  }
  return (
    <div className="productList">
      {props.cart.map((product) => {
            return (
              <div key={product.id}>
                <img src={product.imageUrl} className="photo" />
                <h4>
                  <Link to={`/products/${product.id}/`}>
                    {` ${product.instrument}
                ${product.make} ${product.model} -
                $${(product.price / 100).toFixed(2)}`}
                  </Link>
                  <input
                    onChange={handleChange}
                    type="number"
                    min="1"
                    max={`${product.inventory}`}
                    placeholder="1"
                    value={
                      (quantityArr[product.id] = product.orderProduct.inventory)
                    }
                  ></input>
                  <button
                    type="submit"
                    onClick={() => {
                      handleSubmit(product);
                    }}
                  >
                    Change Amount
                  </button>
                  <button
                    type="submit"
                    className="delete"
                    onClick={() => props.removeProduct(props.auth.id, product)}
                  >
                    X
                  </button>
                </h4>
              </div>
            );
          })}
      <button
        type="submit"
        className="clear"
        onClick={() => {
          props.clearCart(props.auth.id);
        }}
      >
        Clear Cart
      </button>
      {props.auth.id ? (
        <Link to="/checkout">Checkout</Link>
      ) : (
        <GuestCheck cart={cart} />
      )}
    </div>
  );
}

const mapStateToProps = (reduxState) => ({
  cart: reduxState.cart,
  auth: reduxState.auth,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCart: (id) => dispatch(setCartThunk(id)),
  removeProduct: (id, product) => dispatch(removeFromCartThunk(id, product)),
  clearCart: (id) => dispatch(clearCartThunk(id)),
  changeQuantity: (id) => dispatch(updateQuantityCartThunk(id)),
  updateCart: (id, productId, qty) =>
    dispatch(updateQuantityCartThunk(id, productId, qty)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
