import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setProductsThunk } from "../store/allproducts";
import { clearCartThunk, updateQuantityCartThunk, removeFromCartThunk, setCartThunk } from "../store/cart";

//Possible rendition of Cart, piggy-backed off of AllProducts page, have to add quantity change option.
// NOT ADDED TO ROUTES YET


export class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchCart();
  }
  render() {
    {
      console.log(this.props);
    }

    return (
      <div className="productList">
        {this.props.products.length ? (
          this.props.products.map((product) => (
            <div key={product.id}>
              <img src={product.imageUrl} className="photo" />
              <h2>
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
              </h2>
              <button type='submit' className="clear"
              onClick={() => this.props.clearCart(product.id)}>Clear Cart</button>
            </div>
          ))
        ) : (
          <h2>Cart Empty</h2>
        )}
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  products: reduxState.cart,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCart: (id) => dispatch(setCartThunk(id)),
  removeProduct: (id) => dispatch(removeFromCartThunk(id)),
  clearCart: (id) => dispatch(clearCartThunk(id)),
  changeQuantity: (id) => dispatch(updateQuantityCartThunk(id))

});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
