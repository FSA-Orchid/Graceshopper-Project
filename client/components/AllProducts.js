import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { setProductsThunk } from '../store/products'

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: []
    }
  }
  componentDidMount() {
    this.setState({
      products: this.props.products
    })
  }

  componentDidUpdate(prevProps) {
    if(prevProps.products !== this.props.products) {
      this.setState({
        products: this.props.products || [],
      })
    }
  }

  render () {
    if(!this.props.)
    if(!this.props.products){return <h1>No Products!</h1>}
    let products = this.state.products


    return (
      <div className="AllProducts">
        <form className='filters'>


        </form>


        <div className='Flex-Products-Container'>
          {products.map((product) => {
         return (
           <form key={product.id} className="productBox">
         <Link to={`/products/${product.id}`} >
          <h2>{product.instrument}</h2>
          <h4>{product.make}</h4>
          <h5>A {product.model} from {product.year}</h5>
          <img src={product.imageUrl} />
         </Link>
          <button
                  type="submit"
                  className=""
                  onClick={() => {
                    this.props.addToCart(product.id);
                  }}
                >
                  Add To Cart
          </button>
         </form>
         )})}
        </div>
      </div>
    )
  }
}
const mapState = (state) => {
  return state.products
}

const mapDispatch = (dispatch) => {
  return {
    loadProducts: () => dispatch(setProductsThunk()),
    addToCart: () => dispatch(addToCart())
  }
}



export default connect(mapState, mapDispatch)(AllProducts)
