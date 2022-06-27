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
import { toast } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
export function AllProducts(props) {
  useEffect(() => {
    props.fetchProducts();
  }, []);
  injectStyle();

  const checkIt = (product) => {
    const cart = props.cart;
    const userId = props.user.id;

    let filter = cart.filter((cartProd) => cartProd.id === product.id);
    if (filter.length) {
      let quantitynew = 1 + 1 * filter[0].orderProduct.inventory;
      let message = 'More Of The Same Added To Cart.';
      let status = 'success';
      if (quantitynew > product.inventory) {
        quantitynew = product.inventory;
        message = 'Max Quantity Already In Cart!';
        status = 'error';
      }
      props.updateCart(userId, product.id, quantitynew);
      toast[status](message);
    } else {
      let quantitynew = 1;
      props.addToCart(userId, product, quantitynew);
      toast.success('Item Added To Cart Successfully!');
    }
  };

  if (!props.products.length) {
    return (
      <div>
        <FilterProduct />
        <div className="productContainer">
          <h1>No Products</h1>
        </div>
      </div>
    );
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
                        type="button"
                        className="btn btn-danger"
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
                        type="button"
                        className="btn btn-danger"
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
