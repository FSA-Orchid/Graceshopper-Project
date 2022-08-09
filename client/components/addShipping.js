import React,  { useEffect, useState } from "react";
import {addShippingThunk,} from "../store/shipAddress"
import { connect } from "react-redux";
import { toast } from "react-toastify";

export function shippingForm (props) {
const [address, setAddress] = useState({
  firstName: "",
        lastName: "",
        streetAddress: "",
        state: "",
        apartmentNumber: "",
        zipCode: "",
        city: "",
        email: "",
})


function handleChange (evt) {
  let name = evt.target.name
  let value = evt.target.value

  setAddress(prev => ({...prev, [`${name}`]: value}))
}
useEffect(() => {
  let evt = {target: {}}
  evt.target.name = 'email'
  evt.target.value = props.auth.email
  handleChange(evt)
}, [props.auth])


function handleShipment() {
try {
  const {
    firstName,
    lastName,
    streetAddress,
    state,
    city,
    apartmentNumber,
    zipCode,
  } = address;

  if (
    firstName == "" ||
    lastName == "" ||
    streetAddress == "" ||
    state == "" ||
    city == "" ||
    zipCode == ""
  ) {
    toast.error(
      "All marked fields need to be entered to register address"
    );
    return;
  }
  if(zipCode.length< 5) {
    toast.error("Zip codes need a length of five or more.")
  }
  props.addShipping(props.auth.id, address, address.email)
  props.selfClose()
  toast.success("Shipping Address Added!")
}
catch(err){
  toast.error('There was an error.')
}
}


  return (

  <div className="centerStage">
    <div className="addinBox">

    <form
          className="content"
          onChange={handleChange}
        >
            <h2>Shipping Information</h2>
          <span>
            <h3>First Name*:</h3>
          </span>
          <span>
            <input type="text" name="firstName" value={address.firstName} />
          </span>

          <span>
            <h3>Last Name*:</h3>
          </span>
          <span>

            <input type="text" name="lastName" value={address.lastName}/>
          </span>
          <br />
          {/*Email is needed for unlogged in users, otherwise it should get it from auth*/}
          {props.auth.id ? <></> :
          <div>
          <span>
            <h3>Email*:</h3>
          </span>
          <span>
            <input type="text" name="email" value={address.email} />
          </span>
          <br />
          </div>
           }

          <span>
            <h3>Address*:</h3>
          </span>
          <span>
            <input type="text" name="streetAddress" value={address.streetAddress}/>
          </span>
          <span>
            <h3>Apartment Number:</h3>
          </span>
          <span>
            <input type="text" name="apartmentNumber" value={address.apartmentNumber} />
          </span>
          <br />

          <span>
            <h3>Zipcode*:</h3>
          </span>
          <span>
            <input type="text" name="zipCode" maxLength='5'value={address.zipCode} />
          </span>

          <span>
            <h3>City*:</h3>
          </span>
          <span>
            <input type="text" name="city" value={address.city} />
          </span>
          <br />
          <span>
            <h3>State*:</h3>
          </span>
          <span>
            <input type="text" name="state" value = {address.state}/>
          </span>
          <br />
          <span>Shipping is limited to to the continental United States</span>
        <button
          type='button'
          onClick={() => {

            handleShipment()
            }}>
           Save Address
        </button>
        </form>
  </div>
</div>
)}

const mapState = (state) => ({
  auth: state.auth,
});


const mapDispatch = (dispatch) => ({
  addShipping: (id, shipping, email) => dispatch(addShippingThunk(id, shipping, email))
})
export const AddShipping = connect(mapState, mapDispatch)(shippingForm)

