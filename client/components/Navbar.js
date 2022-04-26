import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { setProductsThunk } from '../store/allproducts';
import { setCartThunk } from '../store/cart';
import AllUsers from './AllUsers';

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    this.props.fetchCart(this.props.auth.id);
    this.setState({
      cart: this.props.cart,
    });
    console.log(this.props, 'component updated');
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cart !== this.props.cart) {
      this.setState({
        cart: this.props.cart || [],
      });
    }
  }

  render() {
    return (
      <div>
        <h1 className="storeTitle">Some Guitar Store</h1>
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
              <Link to="/cart/">Cart{`(${this.props.cart.length})`}</Link>{' '}
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
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>

              <Link to="/cart/">Cart{`(${this.props.cart.length})`}</Link>

              {/* <Link to="/products">All Products</Link> */}
            </div>
          )}
        </nav>
        <hr />
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

// **** FUNCTION COMPONENT *****
// const Navbar = ({ handleClick, isLoggedIn, fetchAllProducts, cart }) => {
//   return (
//     <div>
//       <h1 className="storeTitle">Some Guitar Store</h1>
//       <nav>
//         {isLoggedIn ? (
//           <div className="navBar">
//             {/* The navbar will show these links after you log in */}
//             <Link className="navText" to="/home">
//               Home
//             </Link>
//             <Link
//               className="navText"
//               to="/products"
//               onClick={() => fetchAllProducts()}
//             >
//               All Products
//             </Link>
//             <a className="navText" href="#" onClick={handleClick}>
//               Logout
//             </a>{' '}
//             <Link to="/cart/">Cart{`(${cart.length})`}</Link>
//           </div>
//         ) : (
//           <div>
//             {/* The navbar will show these links before you log in */}
//             <Link to="/login">Login</Link>
//             <Link to="/signup">Sign Up</Link>

//             <Link to="/cart/">Cart{`(${cart.length})`}</Link>

//             {/* <Link to="/products">All Products</Link> */}
//           </div>
//         )}
//       </nav>
//       <hr />
//     </div>
//   );
// };
