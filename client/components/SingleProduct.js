import React, { useEffect, useState } from "react";
import { setProductThunk } from "../store/singleProduct";
import { connect } from "react-redux";
import Link from "react-router-dom/Link";
import { addToCartThunk, updateQuantityCartThunk } from "../store/cart";

function SingleProduct(props) {
  const [quantity, setQuantity] = useState(1);
  let [cart, setCart] = useState([]);
  let localCart = localStorage.getItem("cart");

  const storedLocal = (item) => {
    if (!updateItem(product.id, quantity)) {
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

  useEffect(() => {
    try {
      console.log(props, "single product props");
      const productId = props.match.params.id;
      props.getProduct(productId);
      localCart = JSON.parse(localCart);
      if (localCart) setCart(localCart);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChange = (evt) => {
    setQuantity(evt.target.value);
    console.log({ quantity }, "this is target  qt value");
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

  const product = props.product;
  return (
    <div>
      <img src={product.imageUrl} className="photo" />
      <p>Instrument: {product.instrument}</p>
      <p>Make: {product.make}</p>
      <p>Model: {product.model}</p>
      <p>Year: {product.year}</p>
      <p>Color: {product.color}</p>
      <p>Condition: {product.condition}</p>
      <p>Description: {product.description}</p>
      <p>Price: {product.price/100}</p>
      <div>
        {product.inventory > 0 ?
      <div>
      <input
          onChange={handleChange}
          type="number"
          min="1"
          max={`${product.inventory}`}
          placeholder="1"
          value={quantity}
        ></input>
         <button type="submit" onClick={ () =>{
           storedLocal(product)
           handleSubmit()}}>
          Add to Cart
        </button> </div> : <h2>Out of Stock</h2>}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    product: state.singleProduct,
    cart: state.cart,
    user: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProduct: (productId) => dispatch(setProductThunk(productId)),
  addToCart: (id, productId, inventory, price) =>
    dispatch(addToCartThunk(id, productId, inventory, price)),
  updateCart: (id, productId, qty) =>
    dispatch(updateQuantityCartThunk(id, productId, qty)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
