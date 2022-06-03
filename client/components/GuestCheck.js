
import React from 'react';
import { connect } from 'react-redux';
import { setProductsThunk } from '../store/allproducts';
import {
  closeOrderThunk,
  setCartThunk,
} from '../store/cart';
import { guestCheckThunk } from '../store/allproducts';

class GuestCheckout extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      zip: '',
      one: {display: 'none'},
      two: {display: 'none'},
      complete: false,
      cart: [],
    }
    this.handleChange=this.handleChange.bind(this)
    this.toggler=this.toggler.bind(this)
    this.guest=this.guest.bind(this)
  }

  componentDidMount() {

  }




guest(){
  console.log('hellllo?')
  this.props.cart.map((item) => {
    this.props.guestCheck(item.id, item.orderProduct.inventory)
  })
}




  componentDidUpdate(prevProps) {
 localStorage.setItem("cart", JSON.stringify(this.state.cart))

let localCart = localStorage.getItem("cart")
    localCart = JSON.parse(localCart)
    if (prevProps !== this.props) {
      if(!this.props.cart.length){
        this.setState({
          cart: localCart
        })
      }
      else {
      this.setState({
        cart: this.props.cart || [],
      });}
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
    if(!this.props.cart.length) {return <h1>No Items to Checkout</h1>}
    if(this.state.complete === true){return (<h1>Transaction complete! Thank you for your business.</h1>)}
  let total = 0;
     return (
  <div className="entryForm">
<div>
  {this.props.cart.map((item)=> {
    total = total + (item.price*item.orderProduct.inventory)

    return (<div key={item.id}>
    <p>{item.make} {item.model} {item.year}</p>
    <p className='relativeCheck'>${(item.price/100).toFixed(2)} x {item.orderProduct.inventory} = ${((item.price*item.orderProduct.inventory)/100).toFixed(2)}</p>
    </div>)
  })}
<h4 className='relativeCheck'>Sales Tax: ${((total/100)*0.08).toFixed(2)}</h4>
<h3 className='relativeCheck'>Total Price :${((total/100)*1.08).toFixed(2)}</h3>
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
<span> <input type="text" name="nameCard"  /> </span> <br />
<span><h3>Expiration Date:</h3></span>
<span> <input type="text" name="dateCard"  /> </span>
<span><h3>Security Code:</h3></span>
<span> <input type="text" name="securityCard"  /> </span><br />
<input type="checkbox" className="sameAddress" value="sameAddress"/>
<label> Use same addresss as shipping</label>
</form>


<button onClick = {() => {
  this.setState({complete: true})
  this.guest()
  let cartString = JSON.stringify([])
    localStorage.setItem("cart", cartString)

  }}>
  Checkout
</button>
</div>
    )
  }
}



const mapDispatch = (dispatch) => ({
  // upDatePay: (id) => dispatch(id),
  // upDateAddress:(id) => dispatch(id),
  guestCheck: (id, inventory) => dispatch(guestCheckThunk(id, inventory))
})
export default  connect(null, mapDispatch)(GuestCheckout)

