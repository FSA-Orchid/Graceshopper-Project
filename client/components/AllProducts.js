import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FilterProduct from './FilterProduct';
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

  handleSubmit() {
    //check to see if product is in cart if so increment qty of the cart if not add item to the cart

    const cart = this.props.cart
    const product = this.props.product;
    const userId = this.props.user.id;
    console.log(
      userId,
      'product:',
      product,
      'stateqt:',
      1,
      '',
      cart
    );
      let filter = cart.filter((cartProd) => cartProd.id === product.id)
      if(filter.length){
        console.log(filter)
        let quantity = 1*(1) + 1*(filter[0].orderProduct.inventory)
      this.props.updateCart(
        userId,
        product.id,
        quantity)}
     else {
      this.props.addToCart(
        userId,
        product.id,
        1,
        product.price
      );
    }
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
