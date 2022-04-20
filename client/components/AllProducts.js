<<<<<<< HEAD
import React from 'react';
import { connect } from 'react-redux';
import { fetchCampuses, deleteCampusThunk } from '../redux/campuses';
import { Link } from 'react-router-dom';

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts;
  }
  render() {
    return (
      <div className="productList">
        {this.props.products.length ? (
          this.props.products.map((product) => (
            <div key={product.id}>
              <img src={product.imgUrl} className="photos" />
              <h2>
                <Link to={`/products/${product.id}`}>{product.name}</Link>
                <button
                  type="submit"
                  className=""
                  onClick={() => {
                    this.props.addToCart(product.id);
                  }}
                >
                  Add To Cart
                </button>
              </h2>
            </div>
          ))
        ) : (
          <h2>Currently no products :(</h2>
        )}
      </div>
    );
  }
}

const mapState = (state) => ({
  products: state.products,
});

const mapDispatch = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProducts()),
  addToCart: (id) => dispatch(addToCartThunk(id)),
});

export default connect(mapState, mapDispatch)(AllProducts);

// MAIN VERSION ********************
// import React from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { setProductsThunk } from '../store/products';

// class AllProducts extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       products: [],
//     };
//   }
//   componentDidMount() {
//     this.setState({
//       products: this.props.products,
//     });
//   }

//   componentDidUpdate(prevProps) {
//     if (prevProps.products !== this.props.products) {
//       this.setState({
//         products: this.props.products || [],
//       });
//     }
//   }

//   render() {
//     // if(!this.props.)
//     if (!this.props.products) {
//       return <h1>No Products!</h1>;
//     }
//     let products = this.state.products;

//     return (
//       <div className="AllProducts">
//         <form className="filters"></form>

//         <div className="Flex-Products-Container">
//           {products.map((product) => {
//             return (
//               <form key={product.id} className="productBox">
//                 <Link to={`/products/${product.id}`}>
//                   <h2>{product.instrument}</h2>
//                   <h4>{product.make}</h4>
//                   <h5>
//                     A {product.model} from {product.year}
//                   </h5>
//                   <img src={product.imageUrl} />
//                 </Link>
//                 <button
=======
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setProductsThunk } from "../store/products";

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    return (
      <div className="productList">
        {this.props.products.length ? (
          this.props.products.map((product) => (
            <div key={product.id}>
              <img src={product.imageUrl} className="photo" />
              <h2>
                <Link to={`/campuses/${product.id}/`}>{campus.name}</Link>
                <button
                  type="submit"
                  className="delete"
                  onClick={() => this.props.deleteCampus(product.id)}
                >
                  X
                </button>
              </h2>
            </div>
          ))
        ) : (
          <h2>No Products</h2>
        )}
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  products: reduxState.products,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProducts()),
  deleteProduct: (id) => dispatch(deleteProductThunk(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);

// class AllProducts extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       products: []
//     }
//   }
//   componentDidMount() {
//     this.setState({
//       products: this.props.products
//     })
//   }

//   componentDidUpdate(prevProps) {
//     if(prevProps.products !== this.props.products) {
//       this.setState({
//         products: this.props.products || [],
//       })
//     }
//   }

//   render () {
//     if(!this.props.addToCart){return <h1>Page Loading!</h1>}
//     if(!this.props.products.length){return <h1>No Products!</h1>}
//     let products = this.state.products

//     return (
//       <div className="AllProducts">
//         <form className='filters'>

//         </form>

//         <div className='Flex-Products-Container'>
//           {products.map((product) => {
//          return (
//            <form key={product.id} className="productBox">
//          <Link to={`/products/${product.id}`} >
//           <h2>{product.instrument}</h2>
//           <h4>{product.make}</h4>
//           <h5>A {product.model} from {product.year}</h5>
//           <img src={product.imageUrl} />
//          </Link>
//           <button
>>>>>>> 39f63a1da22f0978315fa8d528235b637443eb9c
//                   type="submit"
//                   className=""
//                   onClick={() => {
//                     this.props.addToCart(product.id);
//                   }}
//                 >
//                   Add To Cart
<<<<<<< HEAD
//                 </button>
//               </form>
//             );
//           })}
//         </div>
//       </div>
//     );
//   }
// }
// const mapState = (state) => {
//   return state.products;
// };
=======
//           </button>
//          </form>
//          )})}
//         </div>
//       </div>
//     )
//   }
// }
// const mapState = (state) => {
//   return state.products
// }
>>>>>>> 39f63a1da22f0978315fa8d528235b637443eb9c

// const mapDispatch = (dispatch) => {
//   return {
//     loadProducts: () => dispatch(setProductsThunk()),
<<<<<<< HEAD
//     addToCart: () => dispatch(addToCart()),
//   };
// };

// export default connect(mapState, mapDispatch)(AllProducts);
=======
//     addToCart: () => dispatch(addToCart())
//   }
// }

// export const AllProductsPaged = connect(null, mapDispatch)(AllProducts)
// export default connect(mapState, mapDispatch)(AllProducts)
>>>>>>> 39f63a1da22f0978315fa8d528235b637443eb9c
