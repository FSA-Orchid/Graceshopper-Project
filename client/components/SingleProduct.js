import React from 'react';
import { setProductThunk } from '../store/singleProduct';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import { addToCartThunk, updateQuantityCartThunk } from '../store/cart';

class SingleProduct extends React.Component {
  constructor() {
    super();
    this.state = { quantity: 1 };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    try {
      console.log(this.props, 'single product props');
      const productId = this.props.match.params.id;
      this.props.getProduct(productId);
    } catch (error) {
      console.log(error);
    }
  }

  handleChange(evt) {
    this.setState({ quantity: evt.target.value });
    console.log(this.state.quantity, 'this is target  qt value');
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
      this.state.quantity,
      '',
      cart
    );
      let filter = cart.filter((cartProd) => cartProd.id === product.id)
      if(filter.length){
        console.log(filter)
        let quantity = 1*(this.state.quantity) + 1*(filter[0].orderProduct.inventory)
      this.props.updateCart(
        userId,
        product.id,
        quantity)}
     else {
      this.props.addToCart(
        userId,
        product.id,
        this.state.quantity,
        product.price
      );
    }
  }

  render() {
    const product = this.props.product;
    return (
      <div>
        <img src={product.imageUrl} className="photo" />
        <p>Instrument: {product.instrument}</p>
        <p>make: {product.make}</p>
        <p>model: {product.model}</p>
        <p>year: {product.year}</p>
        <p>color: {product.color}</p>
        <p>condition: {product.condition}</p>
        <p>description: {product.description}</p>
        <div>
          <input
            onChange={this.handleChange}
            type="number"
            min="1"
            max={`${product.inventory}`}
            placeholder="1"
            value={this.state.quantity}
          ></input>
          <button type="submit" onClick={this.handleSubmit}>
            Add to Cart
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.singleProduct,
    cart: state.cart,
    user: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProduct: (productId) => dispatch(setProductThunk(productId)),
  addToCart: (id, productId, inventory, price) =>
    dispatch(addToCartThunk(id, productId, inventory, price)),
  updateCart: (id, productId, qty) =>
    dispatch(updateQuantityCartThunk(id, productId, qty)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
