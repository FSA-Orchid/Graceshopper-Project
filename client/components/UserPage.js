
import React from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { setOrderThunk } from '../store/orderHistory';
import { fetchUserThunk } from '../store/singleUser';
import { updateUserThunk } from '../store/users';

//Wanted to make the order dates collapsible


class UserPage extends React.Component {
constructor() {
  super()
  this.state = {
    one: {display: 'none'},
    two: {display: 'none'},
  }
  this.accordionContent =[]
  this.toggler=this.toggler.bind(this)
  this.accordionToggle = this.accordionToggle.bind(this)
}

componentDidMount() {
  this.props.fetcherOrders(this.props.auth.id);
  this.props.fetchUser(this.props.auth.id)
}

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

accordionToggle(key) {
  let changes = this.accordionContent[key]
  console.log(changes)
  if(changes.style.display === 'none'){
    changes.style.display = 'block'
    return
  }
  else {
    changes.style.display = 'none'
  }
}


  render (){

  return (
    <div>
    <ul className='sidenav'>
      <li><button onClick= {() => this.toggler('one')}>User Profile Information</button></li>
      <li><button onClick= {() => this.toggler('two')}> Order History</button></li>
    </ul>
    <div className= 'contentUser' style= {{display: this.state.one.display}}>
    <h2>{this.props.auth.username} --- {this.props.auth.email}</h2>
    <h3>{this.props.auth.address}</h3>
    </div>

    <div className = 'contentUser' style= {{display: this.state.two.display}}>
      {this.props.orders.map((order, key)=>{
      return (
      <div key = {key}>
      <button type="button" onClick={() => this.accordionToggle(key)} className="collapsible">Ordered on {order.updatedAt}</button>
      <form style={{display: 'none'}} ref={accordionContent => this.accordionContent[key] = accordionContent}>
      {order.products.map((product, key) => {
        return (<div key={key}>
            <h5>{product.name}</h5>
            <p>{product.make} {product.model} {product.year}</p>
            <p> {(product.price)/100} x {product.orderProduct.inventory} = {(product.orderProduct.totalPrice)/100} </p>
          </div>)
      })}
      <p>Total: $</p>
      </form>
      </div>)
    })}

    </div>


    </div>
  )
}
}

const mapState = (state) => {
  return {
    user: state.user,
    auth: state.auth,
    orders: state.orders
  }
}
const mapDispatch = (dispatch) => {
  return {
  fetchUser: (id) => {dispatch(fetchUserThunk(id))},
  updateUser: (user) => {dispatch(updateUserThunk(user))},
  fetcherOrders: (id) => {dispatch(setOrderThunk(id))}
}}

export default connect(mapState, mapDispatch)(UserPage)
