import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setProductsThunk } from '../store/allproducts';
import {
  clearCartThunk,
  updateQuantityCartThunk,
  removeFromCartThunk,
  setCartThunk,
} from '../store/cart';

//Possible rendition of Cart, piggy-backed off of AllProducts page, have to add quantity change option.
// NOT ADDED TO ROUTES YET

export function Cart(props) {
  let [cart, setCart] = useState([]);
  let localCart = localStorage.getItem('cart');

  let previousState = usePrevious(cart);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }
  const removeItem = (id) => {
    console.log(id, 'id');
    let cartCopy = [...cart];
    cartCopy = cartCopy.filter((item) => item.id !== id);
    setCart(cartCopy);

    let cartString = JSON.stringify(cartCopy);
    localStorage.setItem('cart', cartString);
  };
  useEffect(() => {
    localCart = JSON.parse(localCart);
    if (localCart) setCart(localCart);
    if (!props.auth.length) {
      let userCart = localStorage.getItem('cart');
      userCart = JSON.parse(userCart);
      console.log(userCart, 'parsedCart');
      if (userCart) {
        setCart(userCart);
        console.log(userCart, 'it is working');
      }
    } else props.fetchCart(props.auth.id);
  }, []);

  // useEffect((previousState) => {
  //   if (previousState !== props.cart) {
  //     setCart(props.cart || []);
  //   }
  // });

  return (
    <div className="productList">
      {this.props.cart.length ? (
        <div>
          {this.props.cart.map((product) => {
            return (
              <div key={product.id}>
                <img src={product.imageUrl} className="photo" />
                <h4>
                  <Link to={`/products/${product.id}/`}>
                    {`${product.orderProduct.inventory} ${product.instrument}
                  ${product.make} ${product.model} -
                 $${(product.price / 100).toFixed(2)}`}
                  </Link>
                  <button
                    type="submit"
                    className="delete"
                    onClick={() =>
                      this.props.removeProduct(this.props.auth.id, product)
                    }
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
            onClick={() => this.props.clearCart(this.props.auth.id)}
          >
            Clear Cart
          </button>
          <Link to="/checkout">Checkout</Link>;
        </div>
      ) : (
        <h2>Cart Empty</h2>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
