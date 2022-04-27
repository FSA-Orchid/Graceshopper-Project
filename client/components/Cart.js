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

//Possible rendition of Cart, piggy-backed off of AllProducts page, have to add quantity change option.
// NOT ADDED TO ROUTES YET

export function Cart(props) {
  const [quantity, setQuantity] = useState([])
  let [cart, setCart] = useState([]);
  let localCart = localStorage.getItem("cart");
  let quantityArr = []
  let previousState = usePrevious(cart);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }
  const clearCart = () => {
    let cartString = JSON.stringify([])
    localStorage.setItem("cart", cartString)
    setCart([])
  }
  const removeItem = (id) => {
    console.log(id, "id");
    let cartCopy = [...cart];
    cartCopy = cartCopy.filter((item) => item.id !== id);
    setCart(cartCopy);

    let cartString = JSON.stringify(cartCopy);
    localStorage.setItem("cart", cartString);
  };

  const handleChange = (evt) => {
    console.log(quantityArr)
    setQuantity([evt.target.value]);
    quantityArr[evt.target.name]=evt.target.value
    console.log({ quantity }, "this is target  qt value");
  };

  const storedLocal = (item) => {
    if (!updateItem(item.id, quantity)) {
      addItem(item);
    }
  };
  const addItem = (item) => {
    let cartCopy = [...cart];
    let { id } = item;
    let copy = item
    let existingItem = cartCopy.find((cartItem) => cartItem.id == id);
    if (existingItem) {
      existingItem.orderProduct.inventory += (1*quantity);
      if(existingItem.orderProduct.inventory > item.inventory){
        existingItem.orderProduct.inventory = 1*(item.inventory)
      }
    } else {
      copy.orderProduct = {inventory: 1}
      cartCopy.push(copy);
    }
    setCart(cartCopy);
    let stringCart = JSON.stringify(cartCopy);
    localStorage.setItem("cart", stringCart);
  };
  const updateItem = (itemID, amount) => {
    let cartCopy = [...cart];
    let existentItem = cartCopy.find((item) => item.ID == itemID);
    if (!existentItem) return false;
    existentItem.orderProduct.inventory += (1*amount);
    if (existentItem.inventory <= 0) {
      cartCopy = cartCopy.filter((item) => item.ID != itemID);
    }
    setCart(cartCopy);
    let cartString = JSON.stringify(cartCopy);
    localStorage.setItem("cart", cartString);
  };


  const handleSubmit = () => {
    //check to see if product is in cart if so increment qty of the cart if not add item to the cart

    const cart = props.cart;
    const product = props.product;
    const userId = props.user.id;
    let filter = cart.filter((cartProd) => cartProd.id === product.id);
    if (filter.length) {
      console.log(filter);
      let newquantity = (1 *  quantity)  + (1 * filter[0].orderProduct.inventory);
      if(newquantity > product.inventory){
        newquantity = product.inventory
      }
      props.updateCart(userId, product.id, newquantity);
    } else {
      let newquantity = quantity
      if(newquantity > product.inventory){
        newquantity = product.inventory
      }
      props.addToCart(userId, product.id,  newquantity , product.price);
    }
  };









  useEffect(() => {
    props.fetchCart(props.auth.id)
    if(props.auth.id){
      setCart(props.cart)
    return}
    localCart = JSON.parse(localCart);
    if (localCart) setCart(localCart);
    if (!props.auth.length) {
      let userCart = localStorage.getItem("cart");
      userCart = JSON.parse(userCart);
      console.log(userCart, "parsedCart");
      if (userCart) {
        setCart(userCart);
        console.log(userCart, "it is working");
      }
    }
  }, []);

  // useEffect((previousState) => {
  //   if (previousState !== props.cart) {
  //     setCart(props.cart || []);
  //   }
  // });

  // console.log(props, "this is cart props");
  console.log(cart);
  if (!cart.length && !props.cart.length) {
    return <h2>Cart Empty</h2>;
  }
  return (
    <div className="productList">
      {!props.auth.length
        ? cart.map((product) => {
            return (
              <div key={product.id}>
                {quantityArr[product.id]=product.orderProduct.inventory}
                <img src={product.imageUrl} className="photo" />
                <h4>
                  <Link to={`/products/${product.id}/`}>
                    {`${product.orderProduct.inventory} ${product.instrument}
                  ${product.make} ${product.model} -
                 $${(product.price / 100).toFixed(2)}`}
                  </Link>
                  <input
          onChange={handleChange}
          type="number"
          name={product.id}
          min="1"
          max={`${product.inventory}`}
          placeholder="1"
          value={quantity}
        ></input>
         <button type="submit" onClick={ () =>{
           storedLocal(product)
           handleSubmit()}}>
          Change Amount
        </button>
                  <button
                    type="submit"
                    className="delete"
                    onClick={() => removeItem(product.id)}
                  >
                    X
                  </button>
                </h4>
              </div>
            );
          })
        : props.cart.map((product) => {
            return (
              <div key={product.id}>
                <img src={product.imageUrl} className="photo" />
                <h4>
                  <Link to={`/products/${product.id}/`}>
                    {`${product.inventory} ${product.instrument}
                ${product.make} ${product.model} -
                $${(product.price / 100).toFixed(2)}`}
                  </Link>
                  <input
          onChange={handleChange}
          type="number"
          min="1"
          max={`${product.inventory}`}
          placeholder="1"
          value={quantityArr[product.id]=product.orderProduct.inventory}
        ></input>
         <button type="submit" onClick={ () =>{
           storedLocal(product)
           handleSubmit()}}>
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
                  onClick={() =>{
                    clearCart()
                    props.clearCart(props.auth.id)}}
                >
                  Clear Cart
                </button>
          <Link to="/checkout" cart={localCart} >Checkout</Link>
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
