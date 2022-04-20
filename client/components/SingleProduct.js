import React from "react";
import { setProductThunk } from "../store/singleProduct";
import { connect } from "react-redux";
import Link from "react-router-dom/Link";

class SingleProduct extends React.Component {
  componentDidMount() {
    try {
      console.log(this.props)
      const productId = this.props.match.params.id;
      this.props.getProduct(productId);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const product = this.props.product;

    console.log("this.props.product", product);

    return (
      <div>
        <p>Instrument: {product.instrament}</p>
        <p>make: {product.make}</p>
        <p>model: {product.model}</p>
        <p>year: {product.year}</p>
        <p>color: {product.color}</p>
        <p>condition: {product.condition}</p>
        <p>description: {product.description}</p>
        <Link to={`/products`}>All Products</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.singleProduct,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProduct: (productId) => dispatch(setProductThunk(productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
