import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setProductsThunk } from '../store/allproducts';
import {
  clearCartThunk,
  updateQuantityCartThunk,
  removeFromCartThunk,
  setCartThunk,
} from '../store/cart';

//Possible rendition of Cart, piggy-backed off of AllProducts page, have to add quantity change option.
// NOT ADDED TO ROUTES YET

export class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    this.props.fetchCart(this.props.auth.id);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.cart !== this.props.cart) {
      this.setState({
        cart: this.props.cart || [],
      });
    }
  }

  render() {
    const products = this.props.cart.products;
    console.log(this.props);
    return (
      <div className="productList">
        {this.props.cart.length ? (
          this.props.cart.map((product) => (
            <div key={product.id}>
              <img src={product.imageUrl} className="photo" />
              <h4>
                <Link to={`/products/${product.id}/`}>
                  {product.instrument} - {product.make} - {product.model}
                </Link>
                <button
                  type="submit"
                  className="delete"
                  onClick={() => this.props.removeProduct(product.id)}
                >
                  X
                </button>
              </h4>
              <button
                type="submit"
                className="clear"
                onClick={() => this.props.clearCart(this.props.auth.id)}
              >
                Clear Cart
              </button>
            </div>
          ))
        ) : (
          <h2>Cart Empty</h2>
        )}
        <Link to='/checkout'>Checkout</Link>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  cart: reduxState.cart,
  auth: reduxState.auth,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCart: (id) => dispatch(setCartThunk(id)),
  removeProduct: (id) => dispatch(removeFromCartThunk(id)),
  clearCart: (id) => dispatch(clearCartThunk(id)),
  changeQuantity: (id) => dispatch(updateQuantityCartThunk(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
