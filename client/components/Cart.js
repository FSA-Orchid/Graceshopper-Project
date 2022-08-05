import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { setProductsThunk } from "../store/allproducts";
import {
  clearCartThunk,
  updateQuantityCartThunk,
  removeFromCartThunk,
  setCartThunk,
} from "../store/cart";



//Possible rendition of Cart, piggy-backed off of AllProducts page, have to add quantity change option.
// NOT ADDED TO ROUTES YET

export function Cart(props) {

  const [cart, setCart] = useState([]);




  const handleChange = (evt) => {
    const value = evt.target.value * 1
    let copy = cart
    copy[evt.target.name].orderProduct.inventory = value
    setCart(copy)
  };

  useEffect(() => {
    setCart(props.cart)
  }, [props.cart]);


  const handleSubmit = (index) => {
    //check to see if product is in cart if so increment qty of the cart if not add item to the cart

    const userId = props.auth.id;
    let product = cart[index]
    let newquantity = product.orderProduct.inventory

    if(newquantity === 0) {
      toast.error('Okay, smartass. Use the remove button instead')
      return
    }
    let message = `Quantity Changed`
    let status = 'success'
      if (newquantity> product.inventory) {
        newquantity = product.inventory;
        message = `There is a max of ${product.inventory} in stock for ${product.year} ${product.make} ${product.model}`
        status='error'
      }
      toast[status](message)
      props.updateCart(userId, product.id, newquantity);
  };

  useEffect(() => {
    props.fetchCart(props.auth.id);
    setCart(props.cart);
  }, []);

  if (!cart.length && !props.cart.length && !cart[1]) {
    return <h2>Cart Empty</h2>;
  }

  return (
    <div className="productList">
      {props.cart.map((product, index) => {
            return (
              <div  classname='cartItem'key={product.id}>
                <img src={product.imageUrl} className="photo" />
                <h4>
                  <Link to={`/products/${product.id}/`}>
                    {` ${product.instrument}
                ${product.make} ${product.model} -
                $${(product.price / 100).toFixed(2)}`}
                  </Link>
                  <input
                    onChange={(evt) =>handleChange(evt)}
                    type="number"
                    name={index}
                    min="1"
                    max={`${product.inventory}`}
                    placeholder={`${props.cart[index].orderProduct.inventory}`}
                    // value={
                    //   (product.orderProduct.inventory)
                    // }
                  ></input>
                  <div className="editCartButtons">
                  <button
                    type="submit"
                    onClick={() => {
                      handleSubmit(index);
                    }}
                  >
                    Change Amount
                  </button>
                  <button
                    type="submit"
                    className="delete"
                    onClick={() =>
                      {toast.success("Product Removed From Cart")
                      props.removeProduct(props.auth.id, product)}}
                  >
                    X
                  </button>
                  </div>
                </h4>
              </div>
            );
          })}
          <div>
      <button
        type="submit"
        className="clear"
        onClick={() => {
          toast.success("Cart Cleared")
          props.clearCart(props.auth.id)
          setCart([])
        }}
      >
        Clear Cart
      </button>

        <Link to="/checkout"><button type="button">Checkout</button></Link>
        </div>
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
