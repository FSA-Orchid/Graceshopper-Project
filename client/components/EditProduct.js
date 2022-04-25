import React from "react";
import { connect } from "react-redux";
import { editProductThunk, addProductThunk } from "../store/allproducts";
import { Link } from "react-router-dom";

class EditProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      instrument: "",
      make: "",
      model: "",
      year: "",
      color: "",
      condition: "",
      description: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    if (this.props.match.location === "/products") {
      this.props.addProduct(this.state);
    } else {
      this.props.updateProduct(this.props.product.id, this.state);
    }
    this.setState({
      instrument: "",
      make: "",
      model: "",
      year: "",
      color: "",
      condition: "",
      description: "",
    });
  }
  render() {
    const { instrument, make, model, year, color, condition, description } =
      this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <div>
        <h2>Edit Product</h2>
        <form id="product-form" onSubmit={handleSubmit}>
          <label htmlFor="instrument">Instrument type:</label>
          <input name="instrument" onChange={handleChange} value={instrument} />

          <label htmlFor="make">Make:</label>
          <input name="make" onChange={handleChange} value={make} />

          <label htmlFor="model">Model:</label>
          <input name="model" onChange={handleChange} value={model} />
          <label htmlFor="year">Year:</label>
          <input name="year" onChange={handleChange} value={year} />
          <label htmlFor="color">Color:</label>
          <input name="color" onChange={handleChange} value={color} />
          <label htmlFor="condition">Condition:</label>
          <input name="condition" onChange={handleChange} value={condition} />
          <label htmlFor="description">Description:</label>
          <input
            name="description"
            onChange={handleChange}
            value={description}
          />
          <button type="submit">Submit</button>
          <Link to="/products">Cancel</Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (ReduxState) => ({
  product: ReduxState.singleProduct,
});

const mapDispatchToProps = (dispatch) => ({
  updateProduct: (id, product) => dispatch(editProductThunk(id, product)),
  addProduct: (product) => dispatch(addProductThunk(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
