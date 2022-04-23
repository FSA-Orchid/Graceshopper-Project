import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  setGuitarsThunk,
  setBassThunk,
  setNewToOldThunk,
  setOldToNewThunk,
  setMakeThunk,
  setPriceMaxThunk,
  setPriceMinThunk,
  setProductsThunk,
  deleteProductThunk,
} from "../store/allproducts";

import { addToCartThunk } from "../store/cart";

export class AllProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      make: "",
      sortByYear: "",
      sortByPrice: "",
    };

    this.handleMakeSubmit = this.handleMakeSubmit.bind(this);
    this.handleYearSubmit = this.handleYearSubmit.bind(this);
    this.handlePriceSubmit = this.handlePriceSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleMakeSubmit(evt) {
    evt.preventDefault();
    this.props.fetchMake(this.state.make);
  }

  handleYearSubmit(evt) {
    evt.preventDefault();
    if (this.state.sortByYear === "newToOld") {
      this.props.fetchNewToOld();
    } else if (this.state.sortByYear === "oldToNew") {
      this.props.fetchOldToNew();
    }
  }

  handlePriceSubmit(evt) {
    evt.preventDefault();
    if (this.state.sortByPrice === "maxToMin") {
      this.props.fetchNewToOld();
    } else if (this.state.sortByYear === "minToMax") {
      this.props.fetchOldToNew();
    }
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: +evt.target.value });
  }

  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    return (
      <div>
        <div className="guitarFilter">
          <Link onClick={() => this.props.fetchGuitars()}>Guitars</Link>
          <Link onClick={() => this.props.fetchBass()}>Bass</Link>
          <Link onClick={() => this.props.fetchProducts()}>All Products</Link>
          {/* <Link onClick={() => this.props.fetchNewToOld()}>
            Production Year: New To Old
          </Link>
          <Link onClick={() => this.props.fetchOldToNew()}>
            Production Year: Old To New
          </Link> */}
          <form onSubmit={this.handleMakeSubmit}>
            <label>
              Make:
              <input
                value={this.state.make}
                name="make"
                placeholder="type here"
                onChange={this.handleChange}
              />
            </label>
          </form>
          <form onSubmit={this.handleYearSubmit}>
            <label>
              Production Year:
              <select
                name="sortByYear"
                onChange={this.handleChange}
                value={this.state.sortByYear}
              >
                <option value="newToOld">Newest to Oldest</option>
                <option value="oldToNew">Oldest to Newest</option>
              </select>
            </label>
          </form>
          <form onSubmit={this.handleYearSubmit}>
            <label>
              Price:
              <select
                name="sortByPrice"
                onChange={this.handleChange}
                value={this.state.sortByYear}
              >
                <option value="maxToMin">Highest To Lowest</option>
                <option value="minToMax">Lowest to Highest</option>
              </select>
            </label>
          </form>
          ;
        </div>
        <div className="productList">
          {this.props.products.length ? (
            this.props.products.map((product) => (
              <div key={product.id}>
                <img src={product.imageUrl} className="photo" />
                <h2>
                  <Link className="listingInfo" to={`/products/${product.id}/`}>
                    {product.year} {product.make} - {product.model}
                  </Link>
                  <button
                    type="submit"
                    className="delete"
                    onClick={() => this.props.deleteProduct(product.id)}
                  >
                    X
                  </button>
                  <button
                    type="submit"
                    onClick={() =>
                      this.props.addToCart(
                        this.props.user.id,
                        product.id,
                        product.inventory,
                        product.price
                      )
                    }
                  >
                    Add to Cart
                  </button>
                </h2>
              </div>
            ))
          ) : (
            <h2>No Products</h2>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  products: reduxState.products,
  user: reduxState.auth,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(setProductsThunk()),
  fetchGuitars: () => dispatch(setGuitarsThunk()),
  fetchBass: () => dispatch(setBassThunk()),
  fetchNewToOld: () => dispatch(setNewToOldThunk()),
  fetchOldToNew: () => dispatch(setOldToNewThunk()),
  fetchMake: (make) => dispatch(setMakeThunk(make)),
  fetchPriceMax: () => dispatch(setPriceMaxThunk()),
  fetchPriceMin: () => dispatch(setPriceMinThunk()),
  deleteProduct: (id) => dispatch(deleteProductThunk(id)),
  addToCart: (id, product, inventory, price) =>
    dispatch(addToCartThunk(id, product, inventory, price)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
