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
    if(!this.props.products){return <h1>Loading Page!</h1>}
    let products = this.state.products


    return (
      <div className="AllProducts">
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
    loadProducts: () => dispatch(setProductsThunk())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
