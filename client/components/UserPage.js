import React, { useState, useEffect, useRef } from "react";
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { setOrderThunk } from '../store/orderHistory';
import { fetchUserThunk } from '../store/singleUser';
import { updateUserThunk } from '../store/users';

//Wanted to make the order dates collapsible


function UserPage (props){
// constructor() {
//   super()
//   this.state = {
//     one: {display: 'none'},
//     two: {display: 'none'},
//   }
//   this.accordionContent =[]
// }
const [sesame, setSesame] = useState([
  {display: 'none'},{display: 'none'},
])
const [accordianContent, setContent] = useState([])

useEffect(()=> {
  props.fetcherOrders(props.auth.id);
  props.fetchUser(props.auth.id)
}, [])

useEffect(() => {
  if(props.orders.length > 0){
  let newAccord = Array(props.orders.length).fill(false)
  setContent(newAccord)
  }
}, [props.orders])

function toggler (id) {
  let nestState = sesame[id]
  if(nestState.display === 'none'){
    sesame[id] = {display : 'block'}
  setSesame([...sesame, sesame[id] = {display : 'block'}])
  return
}
else {
  sesame[id] = {display : 'none'}
  setSesame([...sesame, sesame[id] = {display : 'none'}])
}}

function accordionToggle(key) {
  let changes = accordianContent
  console.log(changes)
  if(!changes[key]){
    changes[key] = true
    setContent(changes)
    return
  }
  else {
    changes[key] = false
    setContent(changes)
  }
}
  console.log(accordianContent)
  console.log(sesame)


  return (
    <div>
    <ul className='sidenav'>
      <li><button onClick= {() => toggler(0)}>User Profile Information</button></li>
      <li><button onClick= {() => toggler(1)}> Order History</button></li>
    </ul>
    <div className= 'contentUser' style= {sesame[0]}>
    <h2>{props.auth.username} --- {props.auth.email}</h2>
    <h3>{props.auth.address}</h3>
    </div>

    <div className = 'contentUser' style= {sesame[1]}>
      {props.orders.map((order, key)=>{
      return (
      <div key = {key}>
      <button type="button" onClick={() => accordionToggle(key)} className="collapsible">Ordered on {(order.updatedAt).slice(0,10)} at {(order.updatedAt).slice(11,19)}</button>
      <form style={{display : accordianContent[key] ? 'block' : 'none'}} >
      {order.products.map((product, key) => {
        return (<div key={key}>
            <h5>{product.name}</h5>
            <p>{product.make} {product.model} {product.year}</p>
            <p> {product.orderProduct.inventory} for ${(product.orderProduct.totalPrice)/100} </p>
          </div>)
      })}
      <p>Total: ${(order.products.reduce((total, current) => {return total + (current.orderProduct.totalPrice/100)},0)*1.08).toFixed(2)}, with tax</p>
      </form>
      </div>)
    })}

    </div>
    </div>
  )

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
