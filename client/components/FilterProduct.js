import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  setProductsThunk,
  setBassThunk,
  setGuitarsThunk,
  setOldToNewThunk,
  setNewToOldThunk,
  setMakeThunk,
  setPriceMaxThunk,
  setPriceMinThunk,
} from "../store/allproducts";

export class AllProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      make: "",
      sortByYear: "select",
      sortByPrice: "select",
      instrument: "select",
    };

    this.handleMakeSubmit = this.handleMakeSubmit.bind(this);
    this.handleYearSubmit = this.handleYearSubmit.bind(this);
    this.handlePriceSubmit = this.handlePriceSubmit.bind(this);
    this.handleInstSubmit = this.handleInstSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleInstSubmit(evt) {
    evt.preventDefault();
    if (this.state.instrument === "select") {
      this.props.fetchProducts();
    } else if (this.state.instrument === "guitar") {
      this.props.fetchGuitars();
    } else if (this.state.instrument === "bass") {
      this.props.fetchBass();
    }
  }

  handleMakeSubmit(evt) {
    evt.preventDefault();
    this.props.fetchMake(this.state.make);
    this.clear();
  }

  handleYearSubmit(evt) {
    evt.preventDefault();
    if (this.state.sortByYear === "select") {
      this.props.fetchProducts();
    } else if (this.state.sortByYear === "newToOld") {
      this.props.fetchNewToOld();
    } else if (this.state.sortByYear === "oldToNew") {
      this.props.fetchOldToNew();
    }
    this.clear();
  }

  handlePriceSubmit(evt) {
    evt.preventDefault();
    if (this.state.sortByPrice === "select") {
      this.props.fetchProducts();
    } else if (this.state.sortByPrice === "maxToMin") {
      this.props.fetchMaxToMin();
    } else if (this.state.sortByYear === "minToMax") {
      this.props.fetchOMinToMax();
    }
    this.clear();
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
    this.props.fetchProducts();
  }

  clear = () => {
    this.setState({
      make: "",
      sortByYear: "select",
      sortByPrice: "select",
      instrument: "select",
    });
  };

  // componentDidMount() {
  //   this.props.fetchProducts();
  // }

  render() {
    return (
      <div>
        <div className="sidenav">
          <form onSubmit={this.handleInstSubmit}>
            <label>
              instrument:
              <select
                name="instrument"
                onChange={this.handleChange}
                value={this.state.instrument}
              >
                <option value="select">select</option>
                <option value="guitar">guitar</option>
                <option value="bass">bass</option>
              </select>
            </label>
            <button type="submit">Submit</button>
          </form>
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
            <button type="submit">Submit</button>
          </form>
          <form onSubmit={this.handleYearSubmit}>
            <label>
              Production Year:
              <select
                name="sortByYear"
                onChange={this.handleChange}
                value={this.state.sortByYear}
              >
                <option value="select">select</option>
                <option value="newToOld">Newest to Oldest</option>
                <option value="oldToNew">Oldest to Newest</option>
              </select>
            </label>
            <button type="submit">Submit</button>
          </form>
          <form>
            <label onSubmit={this.handlePriceSubmit}>
              Price:
              <select
                name="sortByPrice"
                onChange={this.handleChange}
                value={this.state.sortByPrice}
              >
                <option value="select">select</option>
                <option value="maxToMin">Highest To Lowest</option>
                <option value="minToMax">Lowest to Highest</option>
              </select>
            </label>
            <button type="submit">Submit</button>
          </form>
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
  fetchMake: (make) => dispatch(setMakeThunk(make)),
  fetchNewToOld: () => dispatch(setNewToOldThunk()),
  fetchOldToNew: () => dispatch(setOldToNewThunk()),
  fetchMaxToMin: () => dispatch(setPriceMaxThunk()),
  fetchMinToMax: () => dispatch(setPriceMinThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
