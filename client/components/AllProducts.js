import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FilterProduct from "./FilterProduct";
import {
  setGuitarsThunk,
  setBassThunk,
  setProductsThunk,
  deleteProductThunk,
} from "../store/allproducts";
import { addToCartThunk, updateQuantityCartThunk, } from "../store/cart";

export function AllProducts(props) {
  let [cart, setCart] = useState([]);
  let localCart = localStorage.getItem("cart");

  const storedLocal = (item, num) => {
    if (!updateItem(item, num)) {
      addItem(item);
    }
  };


  const addItem = (item) => {
    let cartCopy = [...cart];
    let { id } = item;
    let copy = item;
    copy.orderProduct = {inventory: 1}
    let existingItem = cartCopy.find((cartItem) => cartItem.id == id);
    if (existingItem) {
      existingItem.orderProduct.inventory += 1;
    } else {
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
    existentItem.orderProduct.inventory += amount;
    if (existentItem.orderProduct.inventory <= 0) {
      cartCopy = cartCopy.filter((item) => item.ID != itemID);
    }
    setCart(cartCopy);
    let cartString = JSON.stringify(cartCopy);
    localStorage.setItem("cart", cartString);
  };


  useEffect(() => {
    props.fetchProducts();
    localCart = JSON.parse(localCart);
    if (localCart) setCart(localCart);
    if(props.user.id) setCart(props.cart)
  }, []);

  const checkIt = (product) => {
    const cart = props.cart;
    const userId = props.user.id;

    let filter = cart.filter((cartProd) => cartProd.id === product.id);
    if (filter.length) {
      let quantitynew = 1 + (1 * filter[0].orderProduct.inventory);
      console.log(quantitynew)
      if(quantitynew > product.inventory) {quantitynew = product.inventory}
      console.log(quantitynew)
      console.log('this is going in I guess')
      props.updateCart(userId, product.id, quantitynew);
    } else {
      let quantitynew = 1
      props.addToCart(userId, product.id,  quantitynew , product.price);
    }

  }







  if (!props.products.length) {
    return <div>No Products</div>;
  } else
    return (
      <div>
        <FilterProduct />
        <div className="productContainer">
          {props.user.isAdmin
            ? props.products.map((product) => (
                <div className="productItem" key={product.id}>
                  <img src={product.imageUrl} className="photo" />
                  <h2>
                    <Link
                      className="listingInfo"
                      to={`/products/${product.id}/admin`}
                    >
                      {product.year} {product.make} - {product.model}
                    </Link>
                    {product.price/100}
                    <button
                      type="submit"
                      className="delete"
                      onClick={() => props.deleteProduct(product.id)}
                    >
                      X
                    </button>
                    {product.inventory > 0 ?
                    <button
                      type="submit"
                      onClick={() => {
                        checkIt(
                          product)
                        }
                      }
                    >
                      Add to Cart
                    </button> : <p>Out of Stock</p>}
                  </h2>
                </div>
              ))
            : props.products.map((product) => (
                <div className="productItem" key={product.id}>
                  <img src={product.imageUrl} className="photo" />
                  <h2>
                    <Link
                      className="listingInfo"
                      to={`/products/${product.id}/`}
                    >
                      {product.year} {product.make} - {product.model}
                    </Link> <br />
                    ${product.price/100}
                    {product.inventory > 0 ?
                    <button
                      type="submit"
                      onClick={() => {
                        checkIt(
                          product)
                        storedLocal(product, 1);
                      }}
                    >
                      Add to Cart
                    </button>: <p>Out of Stock</p>}
                  </h2>
                </div>
              ))}
        </div>
      </div>
    );
}
const mapStateToProps = (reduxState) => ({
  products: reduxState.products,
  user: reduxState.auth,
  cart: reduxState.cart
});
const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(setProductsThunk()),
  fetchGuitars: () => dispatch(setGuitarsThunk()),
  fetchBass: () => dispatch(setBassThunk()),
  deleteProduct: (id) => dispatch(deleteProductThunk(id)),
  addToCart: (id, product, inventory, price) =>
    dispatch(addToCartThunk(id, product, inventory, price)),
    updateCart: (id, productId, qty) =>
    dispatch(updateQuantityCartThunk(id, productId, qty))

});
export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
