import React, { useState, useEffect, useRef } from "react";
import { connect } from 'react-redux';
import { setOrderThunk } from '../store/orderHistory';
import { fetchUserThunk } from '../store/singleUser';
import { updateUserThunk } from '../store/users';
import {fetchPaymentsThunk, addPaymentThunk, updatePaymentThunk} from '../store/payment'
import { fetchShippingThunk } from "../store/shipAddress";
import {AddShipping} from "./addShipping"
import {AddPayment} from "./addPayment"
//Wanted to make the order dates collapsible


function UserPage (props){

const [sesame, setSesame] = useState([
  {display: 'block'},{display: 'none'},
])
const [accordianContent, setContent] = useState([])
const [toggleShipping, setShippingToggle] = useState(false)
const [togglePayment, setPaymentToggle] = useState(false)
const [pickedDiv, setPicked] = useState()

useEffect(()=> {
  props.fetcherOrders(props.auth.id);
  props.fetchUser(props.auth.id)
  props.fetchAddresses(props.auth.id)
  props.fetchPayments(props.auth.id)
}, [])


useEffect(()=> {
 toggleClick()
}, [toggleShipping, togglePayment])

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

//This function will darken and lock the screen so the user can enter in information
function toggleClick () {
  if(!togglePayment && !toggleShipping){
    document.body.style.overflow = "visible"
    document.body.classList.remove("no-scroll")
  }
  if(togglePayment || toggleShipping)
  {
    window.scrollTo(0, 0)
    document.body.style.overflow = "hidden"
    document.body.classList.add("no-scroll")
  }
}

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
  // console.log(accordianContent)
  // console.log(sesame)

  return (
    <div className="userPage">
    <ul className='sidenav'>
      <li><button onClick= {() => toggler(0)}>User Profile Information</button></li>
      <li><button onClick= {() => toggler(1)}> Order History</button></li>
    </ul>

    <div className="userInfo">
    <div className= 'contentUser' style= {sesame[0]}>
    <h2>{props.auth.username} --- {props.auth.email}</h2>

    <div>
      <h1>User Shipping Information</h1>

      {props.shipping && props.shipping.length ?
      <div className="addressBox">
      {props.shipping.map((info, index) =>(
      <div className='addressInfo'key={index}>
        <div>
          <h4>{info.lastName}, {info.firstName}</h4>
          <h5>{info.streetAddress}</h5>
          {info.apartmentNumber ?
          <h5>Apt.: {info.apartmentNumber}</h5> :<></>}
          <h6>{info.city}, {info.state}</h6>
          <h6>{info.zipCode}</h6>
          </div>
      </div>))} </div>
        :
        <h3>User has no current shipping information</h3>
    }
     <button type='button' onClick={() => setShippingToggle(true)}>Add a Shipping Address</button>
     </div>
     <div>
      <h1>User Payment Information</h1>
    {props.payment && props.payment.length ?
      <div className='profilePaymentList'>
          {props.payment.map((info, index) => (
          <div className='profilePayment'key={index}>
          <h4>{info.name}</h4>
          <h5>{info.cardPreview}</h5>
          <h5>Billing Information</h5>
          {info.streetAddress}
          {info.city},{info.state}
          {info.zipcode}
          {info.expirationDate}
          </div>
          ))
        }
      </div> :
      <h3>No payment information stored.</h3>
    }
    <button type='button' onClick={() => setPaymentToggle(true)}>Add Payment Method</button>
      </div>
    </div>

    <div className = 'contentUser' style= {sesame[1]}>
    {props.orders && props.orders.length ?
      props.orders.map((order, key)=>{
      return (
      <div key = {key}>
      <button type="button" onClick={() => setPicked(key)} className="collapsible">Ordered on {(order.updatedAt).slice(0,10)} at {(order.updatedAt).slice(11,19)}</button>
      <form className={pickedDiv == key ? "chosenDiv" : "hiddenDiv"}>
      {order.products.map((product, key) => {
        return (<div key={key}>
            <h5>{product.name}</h5>
            <p>{product.make} {product.model} {product.year}</p>
            <p> {product.orderProduct.inventory} for ${(product.orderProduct.totalPrice)/100} </p>
          </div>)
      })}
      <p>Total: ${(order.products.reduce((total, current) => {return total + (current.orderProduct.totalPrice/100)},0)*1.08).toFixed(2)}, with tax</p>
      <p>Was paid by {order.paymentInfo.name}</p>
      <p>Using card {order.paymentInfo.cardPreview}, Expiration {order.paymentInfo.expirationDate}</p>
      <h5>Shipping Information</h5>
      <p>{order.shippingInfo.firstName} {order.shippingInfo.lastName}</p>
      <p>{order.shippingInfo.streetAddress},
      {order.shippingInfo.city}</p>
      <p>{order.shippingInfo.state}, {order.shippingInfo.zipCode}</p>
      </form>
      </div>)
    })
    : <h3>User has not placed any orders.</h3>
    }

    </div>
    </div>
  {/* We're passing in the functions to close the component by signaling back to the parent */}
    {toggleShipping ?
    <div className="fullScreenForm">
    <AddShipping selfClose={() => {setShippingToggle(false)}}/>
    <button type='button' className="cancel" onClick={() => setShippingToggle(false)}>X</button>
    </div>
     :<></>
    }
    {togglePayment ?
    <div className="fullScreenForm">
    <AddPayment selfClose={() => {setPaymentToggle(false)}}/>
    <button type='button' className="cancel" onClick={() => setPaymentToggle(false)}>X</button>
    </div> : <></>
    }
    </div>
  )

}

const mapState = (state) => {
  return {
    user: state.user,
    auth: state.auth,
    orders: state.orders,
    shipping: state.shippingAddresses,
    payment: state.paymentInfo
  }
}
const mapDispatch = (dispatch) => {
  return {
  fetchUser: (id) => {dispatch(fetchUserThunk(id))},
  updateUser: (user) => {dispatch(updateUserThunk(user))},
  fetcherOrders: (id) => {dispatch(setOrderThunk(id))},
  fetchPayments: (id) => {dispatch (fetchPaymentsThunk(id))},
  fetchAddresses: (id) => {dispatch(fetchShippingThunk(id))},
}}

export default connect(mapState, mapDispatch)(UserPage)
