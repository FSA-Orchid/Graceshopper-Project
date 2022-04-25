
import React from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { setOrderThunk } from '../store/orderHistory';
import { fetchUserThunk } from '../store/singleUser';
import { updateUserThunk } from '../store/users';

class UserPage extends React.Component {
constructor() {
  super()
  this.state = {
    one: {display: 'none'},
    two: {display: 'none'},
  }
  this.toggler=this.toggler.bind(this)
  this.innerToggle=this.innerToggle.bind(this)
}

componentDidMount() {
  this.props.fetcherOrders(this.props.auth.id);
  this.props.fetchUser(this.props.auth.id)
}

innerToggle (order) {
  let changes = ReactDOM.findDOMNode(UserPage).getElementsByClassName(`contentOrder${order.id}`)
  console.log(changes)
      if(changes.style.display === 'none'){
        changes.style.display === 'block'
        return
      }
      if(changes.style.display === 'block'){
        changes.style.display === 'none'
      }

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


  render (){

  return (
    <div>
    <ul className='sidenav'>
      <li><button onClick= {() => this.toggler('one')}>User Profile Information</button></li>
      <li><button onClick= {() => this.toggler('two')}> Order History</button></li>
    </ul>
    <div className= 'contentUser' style= {{display: this.state.one.display}}>
    <h2>{this.props.user.userName}</h2>
    <h3>{this.props.user.address}</h3>
    </div>

    <div className = 'contentUser' style= {{display: this.state.two.display}}>
      {this.props.orders.map((order)=>{
      return (
      <div key = {order.id}>
      <button type="button" className="collapsible"  onClick = {() => this.innerToggle(order)}>Ordered on {order.updatedAt}</button>
      <form className={`contentOrder${order.id}`} style={{display: 'none'}}>
      {order.products.map((product) => {
        return (<div key={product.id}>
            <h5>{product.name}</h5>
            <p>{product.make} {product.model} {product.year}</p>
            <p> {product.price} </p>
          </div>)
      })}
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
    orders: state.orders}
}
const mapDispatch = (dispatch) => {
  return {
  fetchUser: (id) => {dispatch(fetchUserThunk(id))},
  updateUser: (user) => {dispatch(updateUserThunk(user))},
  fetcherOrders: (id) => {dispatch(setOrderThunk(id))}
}}

export default connect(mapState, mapDispatch)(UserPage)
