import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  setGuitarsThunk,
  setBassThunk,
  setProductsThunk,
  deleteProductThunk,
} from '../store/allproducts';

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    {
      console.log(this.props, 'These are props');
    }

    return (
      <div>
        <div className="guitarFilter">
          <Link onClick={() => this.props.fetchGuitars()}>Guitars</Link>
          <Link onClick={() => this.props.fetchBass()}>Bass</Link>
        </div>
        <div className="productList">
          {this.props.products.length ? (
            this.props.products.map((product) => (
              <div key={product.id}>
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
                </h2>
              </div>
            ))
          ) : (
            <h2>No Products</h2>
          )}
        </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  products: reduxState.products,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(setProductsThunk()),
  fetchGuitars: () => dispatch(setGuitarsThunk()),
  fetchBass: () => dispatch(setBassThunk()),
  deleteProduct: (id) => dispatch(deleteProductThunk(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);


