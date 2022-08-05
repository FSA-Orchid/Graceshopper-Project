import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { setProductsThunk } from '../store/allproducts';
import { setCartThunk } from '../store/cart';
import AllUsers from './AllUsers';

import { Login, Signup } from './AuthForm';

function Navbar (props) {

  const [count, setCartCount] = useState(0)

  useEffect(()=> {
    props.fetchCart(props.auth.id)
  }, [props.auth.id])

  useEffect(() => {
    let total = props.cart.reduce(
      (total, item) => total + 1 * item.orderProduct.inventory,
      0
    )
    setCartCount(total)
  }, [props.cart])

  // componentDidMount() {
  //   this.props.fetchCart(this.props.auth.id);

  //   let total = this.props.cart.reduce(
  //     (total, item) => total + 1 * item.orderProduct.inventory,
  //     0
  //   );

  //   this.setState({
  //     count: total,
  //   });
  // }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.cart !== this.props.cart) {
  //     let total = this.props.cart.reduce(
  //       (total, item) => total + 1 * item.orderProduct.inventory,
  //       0
  //     );
  //     this.setState({
  //       count: total,
  //     });
  //   }
  // }


    return (
      <div className="navContainer">
        {/* <h1 className="storeTitle">Some Guitar Store</h1> */}

        <nav>
          {props.isLoggedIn ? (
            <div className="navLogged  position-relative">
              {/* The navbar will show these links after you log in */}
              <Link className="navText" to="/">
              <img className ='logo'src="guitarmart.png" />

              </Link>
              <Link
                className="navText"
                to="/products"
                onClick={() => props.fetchAllProducts()}
              >
                All Products
              </Link>
              <Link to="/user/">User Profile</Link>
              <Link className="bi bi-cart" to="/cart/">
                {` (${count})`}
              </Link>
              {props.isLoggedIn && props.auth.isAdmin ? (
                <Link to="/users/">All Users</Link>
              ) : (
                <></>
              )}
              <a className="navText" href="#" onClick={props.handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div className="navLogged  position-relative">
              {/* The navbar will show these links before you log in */}
              <Link className="navText" to="/">
              <img className ='logo' src="guitarmart.png" />
              </Link>
              <Link className="navText" to="/signup">
                Sign Up
              </Link>
              <Link className="navText " to="/login">
                Log In
              </Link>
              <Link
                className="navText"
                to="/products"
                onClick={() => props.fetchAllProducts()}
              >
                All Products
              </Link>{' '}
              <Link className="bi bi-cart navText cartClass " to="/cart/">
                {` (${count})`}
              </Link>
              {/* <Link to="/products">All Products</Link> */}
            </div>
          )}

          <hr />
        </nav>
      </div>
    );

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
