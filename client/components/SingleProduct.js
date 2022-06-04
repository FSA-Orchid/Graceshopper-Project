import React, { useEffect, useState } from "react";
import { setProductThunk } from "../store/singleProduct";
import { connect } from "react-redux";
import Link from "react-router-dom/Link";
import { addToCartThunk, updateQuantityCartThunk } from "../store/cart";
import { toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";

function SingleProduct(props) {
  const [quantity, setQuantity] = useState(1);
  let [cart, setCart] = useState([]);
  injectStyle();
  useEffect(() => {
    try {
      const productId = props.match.params.id;
      props.getProduct(productId);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChange = (evt) => {
    setQuantity(evt.target.value);
  };

  const handleSubmit = () => {
    //check to see if product is in cart if so increment qty of the cart if not add item to the cart
    const cart = props.cart;
    const product = props.product;
    const userId = props.user.id;
    let filter = cart.filter((cartProd) => cartProd.id === product.id);

    let status = "success";
    let message = `${product.year} ${product.make} ${product.model} added to cart!`;

    if (filter.length) {
      let newquantity = 1 * quantity + 1 * filter[0].orderProduct.inventory;
      if (newquantity > product.inventory) {
        newquantity = product.inventory;
      }
      if(filter[0].orderProduct.inventory >= product.inventory){
        message = `You already have max inventory of this item!!`
        status = 'error'
      }
      toast[status](message);
      props.updateCart(userId, product.id, newquantity);
    } else {
      let newquantity = quantity;
      message = `${newquantity} ${product.year} ${product.make} ${product.model} added to cart!`;
      if (newquantity > product.inventory) {
        newquantity = product.inventory;
        message =`Max amount of ${newquantity} ${product.year} ${product.make} ${product.model} added to cart!`
      }
      toast[status](message);
      props.addToCart(userId, product, newquantity);
    }
  };

  const product = props.product;
  return (
    <div>
      <img src={product.imageUrl} className="photo" />
      <p>Instrument: {product.instrument}</p>
      <p>Make: {product.make}</p>
      <p>Model: {product.model}</p>
      <p>Year: {product.year}</p>
      <p>Color: {product.color}</p>
      <p>Condition: {product.condition}</p>
      <p>Description: {product.description}</p>
      <p>Price: {product.price / 100}</p>
      <div>
        {product.inventory > 0 ? (
          <div>
            <input
              onChange={handleChange}
              type="number"
              min="1"
              max={`${product.inventory}`}
              placeholder="1"
              value={quantity}
            ></input>
            <button
              type="submit"
              onClick={() => {
                handleSubmit();
              }}
            >
              Add to Cart
            </button>{" "}
          </div>
        ) : (
          <h2>Out of Stock</h2>
        )}
      </div>
    </div>
  );
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
