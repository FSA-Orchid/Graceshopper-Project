import React,  { ReactDOM, useEffect, useState } from "react";
import {addPaymentThunk, fetchPaymentsThunk} from "../store/payment"
import { connect } from "react-redux";
import { toast } from "react-toastify";

export function paymentForm (props) {
  const [payment, setPayment] = useState({
    name: "",
        streetAddress: "",
        city: "",
        state: "",
        apartmentNumber: "",
        zipCode: "",
        cardNumber: "",
        securityCode: "",
        expirationDate: "",
        cardType: "",
        email: '',
  })

  function handleChangeCard (evt) {
    let name = evt.target.name
    let value = evt.target.value

    setPayment(prev => ({...prev, [`${name}`]: value}))
  }
  // useEffect(() => {
  //   let evt = {target: {}}
  //   evt.target.name = 'email'
  //   evt.target.value = props.auth.email
  //   handleChangeCard(evt)
  // }, [props.auth])


  function handlePayment() {
    try {
    const {
      name,
      streetAddress,
      zipCode,
      city,
      state,
      cardNumber,
      securityCode,
      expirationDate,
      cardType,
    } = payment
    if (
      name == "" ||
      cardNumber == "" ||
      streetAddress == "" ||
      state == "" ||
      city == "" ||
      zipCode == "" ||
      securityCode == "" ||
      expirationDate == "" || cardType == ""
    ) {
      toast.error(
        "All marked fields need to be entered to register address"
      );
      return;

    }
    if(cardNumber.length < 16){
      toast.error("A valid creedit card number must have 16 digits.")
      return;
    }
    if(!props.auth.id){
      props.passToParent(payment)
      props.selfClose()
      toast.success("Payment Information Added!")
      return
    }
    else {
    props.addPayment(props.auth.id, payment, payment.email)
    props.selfClose()
    toast.success("Payment Information Added!")
    }
  }
  catch(err) {
    toast.error("There Was An Error")
    console.log(err)
    return;
  }

  }
  console.log(props)
  return (
    <div className="centerStage">
      <form
          className="card"
          onChange={(evt) => handleChangeCard(evt)}
        >
          <div>
          <span>
            <h3>Credit Card*:</h3>
          </span>
          <span>

          <select name="cardType">
          <option value={null} >-</option>
            <option value={"Visa"} >Visa</option>
            <option value={"Mastercard"} >Mastercard</option>
            <option value={"Discover"} >Discover</option>
            <option value={"American Express"}>AMEX</option>
            </select>
          </span>
          <span>
            <h3>Card Number*:</h3>
          </span>
          <span>
            <input type="text"
            maxLength='16' name="cardNumber" value={payment.cardNumber} />
          </span>
          <span>
            <h3>Name on Card*:</h3>
          </span>
          <span>
            <input type="text" name="name" value={payment.name} />
          </span>
          <br />
          <span>
            <h3>Expiration Date*:</h3>
          </span>
          <span>
            <input type="text"  size="10" name="expirationDate" value={payment.expirationDate}/>
          </span>
          <span>
            <h3>Security Code*:</h3>
          </span>
          <span>
            <input type="text"
            maxLength='4' size="10"name="securityCode" value={payment.securityCode} />
          </span>

          <span>

            <h3>Email:</h3>
          </span>
          <span>
          <input type='text'
          name='email'
          value={payment.email} />
          </span>
          </div>


          <span><label> Use same address as shipping</label></span>
          {props.shipping && props.shipping.length ?
          <div className="addressBox">
     { props.shipping.map((info, index) =>(
      <div className='addressInfo'key={index}>
        <div>
          <h4>{info.lastName}, {info.firstName}</h4>
          <h5>{info.streetAddress}</h5>
          <h5>{info.apartmentNumber}</h5>
          <h6>{info.city}</h6>
          <h6>{info.zipCode}</h6>
          </div>
      </div>))}
      </div>

        :
        <></>
    }
          <br />
          <div className="cardAddress">
          <span>
            <h3>Address:</h3>
          </span>
          <span>
            <input type="text" name="streetAddress" value={payment.streetAddress}/>
          </span>
           <span>
            <h3>Apartment Number:</h3>
          </span>
          <span>
            <input type="text" name="apartmentNumber" value={payment.apartmentNumber}/>
          </span>
          <br />

          <span>
            <h3>City:</h3>
          </span>
          <span>
            <input type="text" name="city" value={payment.city} />
          </span>


          <br />
          <span>
            <h3>State:</h3>
          </span>
          <span>
            <input type="text" name="state" value={payment.state}/>
          </span>


          <span>
            <h3>Zipcode:</h3>
          </span>
          <span>
            <input type="text" name="zipCode" value={payment.zipCode}
            size='5'
            maxLength='5'
            />
          </span>

          </div>
          <button
          type='button'
          onClick={() => {handlePayment()}}
          >
            Save Payment Information
          </button>
        </form>
    </div>
  )

}
const mapState = (state) => ({
  auth: state.auth,
  shipping: state.shippingAddresses
});

const mapDispatch = (dispatch) => {
 return {
  addPayment: (id, payment, email) => dispatch(addPaymentThunk(id, payment, email)),
 }}

export const AddPayment = connect(mapState, mapDispatch)(paymentForm)
