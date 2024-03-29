import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {addShippingThunk, fetchShippingThunk} from "../store/shipAddress"

function ShippingList (props) {
const [picked, setPicked] = useState(-1)
useEffect(() => {
  props.fetchShipping(props.user.id)
}, [])

return(
  <div>
    <h3>Select A Shipping Address Below:</h3>
    {props.shipping.map((shipAdd) => {
      return (
        <button className={picked == shipAdd.id ? 'pickedShipping' : 'shippingListItem'} onClick={()=> {props.pickedShipping(shipAdd.id), setPicked(shipAdd.id)}}key={shipAdd.id}>
          <h5>{shipAdd.firstName} {shipAdd.lastName}</h5>
          <h6>{shipAdd.streetAddress}</h6>
          <h6>{shipAdd.state}, {shipAdd.zipCode}</h6>
        </button>
      )
    })}
  </div>
)


}
const mapStateToProps = (reduxState) => ({
  shipping: reduxState.shippingAddresses,
  user: reduxState.auth,
})

const mapDispatchToProps = (dispatch) => ({
  fetchShipping: (id) => dispatch(fetchShippingThunk(id)),
  addShipping: (id, shipping, email) => dispatch(addShippingThunk(id, shipping, email)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ShippingList);
