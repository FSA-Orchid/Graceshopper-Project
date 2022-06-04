import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FilterProduct from './FilterProduct';
import {
  setGuitarsThunk,
  setBassThunk,
  setProductsThunk,
  deleteProductThunk,
} from '../store/allproducts';
import { addToCartThunk, updateQuantityCartThunk } from '../store/cart';

export function AllProducts(props) {


  useEffect(() => {
    props.fetchProducts();
  }, []);

  const checkIt = (product) => {
    const cart = props.cart;
    const userId = props.user.id;
    console.log(cart)
    let filter = cart.filter((cartProd) => cartProd.id === product.id);
    if (filter.length) {
      let quantitynew = 1 + 1 * filter[0].orderProduct.inventory;
      console.log(quantitynew)
      if (quantitynew > product.inventory) {
        quantitynew = product.inventory;
      }
      props.updateCart(userId, product.id, quantitynew);
    } else {
      let quantitynew = 1;
      props.addToCart(userId, product, quantitynew);
    }
  };

  if (!props.products.length) {
    return(
      <div>
      <FilterProduct />
      <div className='productContainer'>
    <h1>No Products</h1>
    </div>
    </div>);
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
                    <div className="price">{`$${(product.price / 100).toFixed(
                      2
                    )}`}</div>
                    <button
                      type="submit"
                      className="delete"
                      onClick={() => props.deleteProduct(product.id)}
                    >
                      X
                    </button>
                    {product.inventory > 0 ? (
                      <button
                        type="submit"
                        onClick={() => {
                          checkIt(product);
                        }}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <p>Out of Stock</p>
                    )}
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
                    </Link>{' '}
                    <br />
                    <div className="price">{`$${(product.price / 100).toFixed(
                      2
                    )}`}</div>
                    {product.inventory > 0 ? (
                      <button
                        type="submit"
                        onClick={() => {
                          checkIt(product);

                        }}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <p>Out of Stock</p>
                    )}
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
  cart: reduxState.cart,
});
const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(setProductsThunk()),
  fetchGuitars: () => dispatch(setGuitarsThunk()),
  fetchBass: () => dispatch(setBassThunk()),
  deleteProduct: (id) => dispatch(deleteProductThunk(id)),
  addToCart: (id, product, inventory, price) =>
    dispatch(addToCartThunk(id, product, inventory, price)),
  updateCart: (id, productId, qty) =>
    dispatch(updateQuantityCartThunk(id, productId, qty)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
