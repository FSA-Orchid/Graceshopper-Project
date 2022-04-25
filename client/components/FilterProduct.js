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
  }

  handlePriceSubmit(evt) {
    evt.preventDefault();
    if (this.state.sortByPrice === "select") {
      this.props.fetchProducts();
    } else if (this.state.sortByPrice === "maxToMin") {
      this.props.fetchNewToOld();
    } else if (this.state.sortByYear === "minToMax") {
      this.props.fetchOldToNew();
    }
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {

    return (
      // <div>
      //   <div className="guitarFilter">
      //     <form onSubmit={this.handleInstSubmit}>
      //       <label>
      //         instrument:
      //         <select
      //           name="instrument"
      //           onChange={this.handleChange}
      //           value={this.state.instrument}
      //         >
      //           <option value="select">select</option>
      //           <option value="guitar">guitar</option>
      //           <option value="bass">bass</option>
      //         </select>
      //       </label>
      //       <button type="submit">Submit</button>
      //     </form>
      //     <form onSubmit={this.handleMakeSubmit}>
      //       <label>
      //         Make:
      //         <input
      //           value={this.state.make}
      //           name="make"
      //           placeholder="type here"
      //           onChange={this.handleChange}
      //         />
      //       </label>
      //       <button type="submit">Submit</button>
      //     </form>
      //     <form onSubmit={this.handleYearSubmit}>
      //       <label>
      //         Production Year:
      //         <select
      //           name="sortByYear"
      //           onChange={this.handleChange}
      //           value={this.state.sortByYear}
      //         >
      //           <option value="select">select</option>
      //           <option value="newToOld">Newest to Oldest</option>
      //           <option value="oldToNew">Oldest to Newest</option>
      //         </select>
      //       </label>
      //       <button type="submit">Submit</button>
      //     </form>
      //     <form>
      //       <label onSubmit={this.handlePriceSubmit}>
      //         Price:
      //         <select
      //           name="sortByPrice"
      //           onChange={this.handleChange}
      //           value={this.state.sortByPrice}
      //         >
      //           <option value="select">select</option>
      //           <option value="maxToMin">Highest To Lowest</option>
      //           <option value="minToMax">Lowest to Highest</option>
      //         </select>
      //       </label>
      //       <button type="submit">Submit</button>
      //     </form>
      //   </div>
      //   <div className="productList">

//     if (!this.props.products.length) {
//       return <div>No Products</div>;
//     } else
//       return (
//         <div>
//           <div className="guitarFilter">
//             <Link onClick={() => this.props.fetchGuitars()}>Guitars</Link>
//             <Link onClick={() => this.props.fetchBass()}>Bass</Link>
//             <Link onClick={() => this.props.fetchProducts()}>All Products</Link>
//           </div>
//           <div className="productContainer">
//             {this.props.user.isAdmin
//               ? this.props.products.map((product) => (
//                   <div className="productItem" key={product.id}>
//                     <img src={product.imageUrl} className="photo" />
//                     <h2>
//                       <Link
//                         className="listingInfo"
//                         to={`/products/${product.id}/admin`}
//                       >
//                         {product.year} {product.make} - {product.model}
//                       </Link>
//                       <button
//                         type="submit"
//                         className="delete"
//                         onClick={() => this.props.deleteProduct(product.id)}
//                       >
//                         X
//                       </button>
//                       <button
//                         type="submit"
//                         onClick={() =>
//                           this.props.addToCart(
//                             this.props.user.id,
//                             product.id,
//                             product.inventory,
//                             product.price
//                           )
//                         }
//                       >
//                         Add to Cart
//                       </button>
//                     </h2>
//                   </div>
//                 ))
//               : this.props.products.map((product) => (
//                   <div className="productItem" key={product.id}>
//                     <img src={product.imageUrl} className="photo" />
//                     <h2>
//                       <Link
//                         className="listingInfo"
//                         to={`/products/${product.id}/`}
//                       >
//                         {product.year} {product.make} - {product.model}
//                       </Link>
//                       <button
//                         type="submit"
//                         onClick={() =>
//                           this.props.addToCart(
//                             this.props.user.id,
//                             product.id,
//                             product.inventory,
//                             product.price
//                           )
//                         }
//                       >
//                         Add to Cart
//                       </button>
//                     </h2>
//                   </div>
//                 ))}
//           </div>

        // </div>
