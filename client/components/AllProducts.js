import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setProductsThunk, deleteProductThunk } from "../store/allproducts";
import FilterProduct from "./FilterProduct";
import {
  setGuitarsThunk,
  setBassThunk,
  setProductsThunk,
  deleteProductThunk,
} from "../store/allproducts";



import { addToCartThunk } from '../store/cart';

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    console.log(this.props);
    if (!this.props.products.length) {
      return <div>No Products</div>;
    } else
      return (
        <div>

          <FilterProduct />


          <div className="productContainer">
            {this.props.user.isAdmin
              ? this.props.products.map((product) => (
                  <div className="productItem" key={product.id}>
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
                        onClick={() => this.props.deleteProduct(product.id)}
                      >
                        X
                      </button>
                      <button
                        type="submit"
                        onClick={() =>
                          this.props.addToCart(
                            this.props.user.id,
                            product.id,
                            1,
                            product.price
                          )
                        }
                      >
                        Add to Cart
                      </button>
                    </h2>
                  </div>
                ))
              : this.props.products.map((product) => (
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
                          this.props.addToCart(
                            this.props.user.id,
                            product.id,
                            1,
                            product.price
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
}

const mapStateToProps = (reduxState) => ({
  products: reduxState.products,
  user: reduxState.auth,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(setProductsThunk()),
  fetchGuitars: () => dispatch(setGuitarsThunk()),
  fetchBass: () => dispatch(setBassThunk()),
  deleteProduct: (id) => dispatch(deleteProductThunk(id)),
  addToCart: (id, product, inventory, price) =>
    dispatch(addToCartThunk(id, product, inventory, price)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
