import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  setGuitarsThunk,
  setBassThunk,
  setProductsThunk,
  deleteProductThunk,
} from '../store/allproducts';

import { addToCartThunk } from '../store/cart';

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    return (
      <div>
        <div className="guitarFilter">
          <Link onClick={() => this.props.fetchGuitars()}>Guitars</Link>
          <Link onClick={() => this.props.fetchBass()}>Bass</Link>
          <Link onClick={() => this.props.fetchProducts()}>All Products</Link>
        </div>
        <div className="productContainer">
          {this.props.products.length ? (
            this.props.products.map((product) => (
              <div className="productItem" key={product.id}>
                <img src={product.imageUrl} className="photo" />
                <h2>
                  <Link className="listingInfo" to={`/products/${product.id}/`}>
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
                        product.inventory,
                        product.price
                      )
                    }
                  >
                    Add to Cart
                  </button>
                </h2>
              </div>
            ))
          ) : (
            <h2>No Products</h2>
          )}
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
