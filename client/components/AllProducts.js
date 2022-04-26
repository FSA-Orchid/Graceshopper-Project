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
  const storedLocal = (item) => {
    if (!updateItem) {
      addItem(item);
    }
  };

  const addItem = (item) => {
    let cartCopy = [...cart];
    let { id } = item;
    let existingItem = cartCopy.find((cartItem) => cartItem.id == id);
    if (existingItem) {
      existingItem.quantity += item.inventory;
    } else {
      cartCopy.push(item);
    }
    setCart(cartCopy);
    let stringCart = JSON.stringify(cartCopy);
    localStorage.setItem("cart", stringCart);
  };
  const updateItem = (itemID, amount) => {
    let cartCopy = [...cart];
    let existentItem = cartCopy.find((item) => item.ID == itemID);
    if (!existentItem) return false;
    existentItem.quantity += amount;
    if (existentItem.quantity <= 0) {
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
  }, []);

  const checkIt = (product) => {
    const cart = props.cart;
    const userId = props.user.id;
    console.log(props)

    let filter = cart.filter((cartProd) => cartProd.id === product.id);
    if (filter.length) {
      console.log(filter);
      let quantitynew = 1 + (1 * filter[0].orderProduct.inventory);
      props.updateCart(userId, product.id, quantitynew);
    } else {
      let quantitynew = 1
      console.log(userId, product, quantitynew)
      props.addToCart(userId, product.id,  quantitynew , product.price);
    }

  }


  if (!props.products.length) {
    return <div>No Products</div>;
  } else
    return (
      <div>
        <div className="productContainer">
          {props.user.isAdmin
            ? props.products.map((product) => {
                return <div className="productItem" key={product.id}>
                  <img src={product.imageUrl} className="photo" />
                  <h2>
                    <Link
                      className="listingInfo"
                      to={`/products/${product.id}/admin`}
                    >
                      {product.year} {product.make} - {product.model}
                    </Link>
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
                      onClick={() =>
                        checkIt(
                            product
                        )
                      }
                    >
                      Add to Cart
                    </button> : <p>Out of Stock</p>}
                  </h2>
                </div>
})
            : props.products.map((product) => (
                <div className="productItem" key={product.id}>
                  <img src={product.imageUrl} className="photo" />
                  <h2>
                    <Link
                      className="listingInfo"
                      to={`/products/${product.id}/`}
                    >
                      {product.year} {product.make} - {product.model}
                    </Link>
                    <button
                      type="submit"
                      onClick={() =>
                        checkIt(
                            product
                        )
                      }
                    >
                      Add to Cart
                    </button>
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
