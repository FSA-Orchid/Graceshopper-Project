
import React from 'react';
import { connect } from 'react-redux';
import { setProductsThunk } from '../store/allproducts';
import {
  closeOrderThunk,
  setCartThunk,
} from '../store/cart';


class Checkout extends React.Component {
  constructor(){
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      zip: '',
      one: {display: 'none'},
      two: {display: 'none'},
    }
    this.handleChange=this.handleChange.bind(this)
    this.toggler=this.toggler.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart(this.props.auth.id);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.cart !== this.props.cart) {
      this.setState({
        cart: this.props.cart || [],
      });
    }
  }
  //toggler is used to make a form appear/disappear when it is clicked on. It changes its display style
  toggler (id) {
    let nestState = this.state[id]
    if(nestState.display === 'none'){
      nestState.display = 'block'
    this.setState({nestState})
    return
  }
  if(nestState.display === 'block'){
    nestState.display = 'none'
    this.setState({nestState})
  }}

  handleChange (evt) {

    // in case its not in number format
    let vars = this.state
    vars[evt.target.name] = evt.target.value
    this.setState({
    vars,
    })
  }



  render() {

  let total = 0;

     return (
  <div className="entryForm">
<div>
  {this.props.cart.map((item)=> {
    total = total + (item.orderProduct.totalPrice)

    return (<div key={item.id}>
    <p>{item.make} {item.model} {item.year}</p>
    <p>${(item.price/100).toFixed(2)} x {item.orderProduct.inventory} = ${(item.orderProduct.totalPrice/100).toFixed(2)}</p>
    </div>)
  })}
<h4>Sales Tax:{(total/100).toFixed(2)}</h4>
<h3>Total Price :${(total/100).toFixed(2)}</h3>
</div>

<button type="button" className="collapsible"  onClick ={() => this.toggler('one')}
  >Shipping {'&'} Contact Information </button>
<form className = 'content' style ={{display: this.state.one.display}} onChange={this.handleChange}>
<span><h3>First Name:</h3></span>
<span><input type="text" name="firstName"  /></span>

<span><h3>Last Name:</h3></span>
<span> <input type="text" name="lastName"  />
</span><br />
<span><h3>Email:</h3></span>
<span><input type="text" name="email"  /></span>

<span><h3>Address:</h3></span>
<span><input type="text" name="address" /></span><br />
<span><h3>Zipcode:</h3></span>
<span><input type="text" name="zip" /></span><br />
</form>

<button type="button" className="collapsible"  onClick ={() => this.toggler('two')}
  >Payment Information </button>

<form className = 'content' style = {{display: this.state.two.display}}
onChange={this.handleChange} >
  <span><h3>Credit Cart:</h3></span>
<span> <input type="text" name="numberCard"  /> </span>
<span><h3>Name on Card:</h3></span>
<span> <input type="text" name="nameCard"  /> </span>
<span><h3>Expiration Date:</h3></span>
<span> <input type="text" name="dateCard"  /> </span>
<span><h3>Security Code:</h3></span>
<span> <input type="text" name="securityCard"  /> </span><br />
<input type="checkbox" className="sameAddress" value="sameAddress"/>
<label> Use same addresss as shipping</label>
</form>


<button onClick = {() => this.props.closeOrder(this.props.auth.id)}>
  Checkout
</button>
</div>
    )
  }
}

const mapState = (state) => ({
  cart: state.cart,
  auth: state.auth,
})

const mapDispatch = (dispatch) => ({
  fetchCart: (id) => dispatch(setCartThunk(id)),
  // upDatePay: (id) => dispatch(id),
  // upDateAddress:(id) => dispatch(id),
  closeOrder: (id) => dispatch(closeOrderThunk(id))
})

export default connect(mapState, mapDispatch)(Checkout)