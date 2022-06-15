import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { setProductsThunk } from '../store/allproducts';
import { setCartThunk } from '../store/cart';
import AllUsers from './AllUsers';

import { Login, Signup } from "./AuthForm";

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    this.props.fetchCart(this.props.auth.id);

    let total = this.props.cart.reduce((total, item) => total + 1*(item.orderProduct.inventory), 0)
    this.setState({
      count: total
    });

  }

  componentDidUpdate(prevProps) {
    if (prevProps.cart !== this.props.cart) {
      let total = this.props.cart.reduce((total, item) => total + 1*(item.orderProduct.inventory), 0)
      this.setState({
        count: total
      });
    }

  }

  render() {


    return (
      <div className='topScreen'>
        <div>
        <h1 className="storeTitle">Guitar Store</h1>
        <nav>
          {this.props.isLoggedIn ? (
            <div className="navBar">
              {/* The navbar will show these links after you log in */}
              <Link className="navText" to="/home">
                Home
              </Link>
              <Link
                className="navText"
                to="/products"
                onClick={() => this.props.fetchAllProducts()}
              >
                All Products
              </Link>
              <Link to="/user/">User Profile</Link>
              <Link to="/cart/">Cart{` (${this.state.count})`}</Link>{' '}
              {this.props.isLoggedIn && this.props.auth.isAdmin ? (
                <Link to="/users/">All Users</Link>
              ) : (
                <div />
              )}
              <a className="navText" href="#" onClick={this.props.handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Log In</Link>
              <Link to="/cart/">Cart{` (${this.state.count})`}</Link>
              <Link
                className="navText"
                to="/products"
                onClick={() => this.props.fetchAllProducts()}
              >
                All Products
              </Link>

              {/* <Link to="/products">All Products</Link> */}
            </div>
          )}
        </nav>
        <hr />
        </div>
      </div>
    );
  }
}
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    cart: state.cart,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
    fetchAllProducts: () => dispatch(setProductsThunk),
    fetchCart: (id) => dispatch(setCartThunk(id)),
  };
};

export default connect(mapState, mapDispatch)(Navbar);

