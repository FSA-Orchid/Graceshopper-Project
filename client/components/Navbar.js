import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { setProductsThunk } from '../store/allproducts';

const Navbar = ({ handleClick, isLoggedIn, fetchAllProducts }) => (
  <div>
    <h1 className="storeTitle">Some Guitar Store</h1>
    <nav>
      {isLoggedIn ? (
        <div className="navBar">
          {/* The navbar will show these links after you log in */}
          <Link className="navText" to="/home">
            Home
          </Link>
          <Link
            className="navText"
            to="/products"
            onClick={() => fetchAllProducts()}
          >
            All Products
          </Link>
          <Link to="/cart/">Cart</Link>
          <a className="navText" href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>

          <Link to="/cart/">Cart</Link>

          {/* <Link to="/products">All Products</Link> */}
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
    fetchAllProducts: () => dispatch(setProductsThunk),
  };
};

export default connect(mapState, mapDispatch)(Navbar);
