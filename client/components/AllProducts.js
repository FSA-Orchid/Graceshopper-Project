import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  setGuitarsThunk,
  setBassThunk,
  setProductsThunk,
  deleteProductThunk,
} from "../store/allproducts";

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    {
      console.log(this.props, "These are props");
    }

    return (
      <div className="productList">
        <Link onClick={() => this.props.fetchGuitars()}>Guitars</Link>
        <Link onClick={() => this.props.fetchbass()}>Bass</Link>
        {this.props.products.length ? (
          this.props.products.map((product) => (
            <div key={product.id}>
              <img src={product.imageUrl} className="photo" />
              <h2>
                <Link to={`/products/${product.id}/`}>
                  {product.year} {product.make} - {product.model}
                </Link>
                <button
                  type="submit"
                  className="delete"
                  onClick={() => this.props.deleteProduct(product.id)}
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
  fetchProducts: () => dispatch(setProductsThunk()),
  fetchGuitars: () => dispatch(setGuitarsThunk()),
  fetchBass: () => dispatch(setBassThunk()),
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
//                   type="submit"
//                   className=""
//                   onClick={() => {
//                     this.props.addToCart(product.id);
//                   }}
//                 >
//                   Add To Cart
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

// const mapDispatch = (dispatch) => {
//   return {
//     loadProducts: () => dispatch(setProductsThunk()),
//     addToCart: () => dispatch(addToCart())
//   }
// }

// export const AllProductsPaged = connect(null, mapDispatch)(AllProducts)
// export default connect(mapState, mapDispatch)(AllProducts)
