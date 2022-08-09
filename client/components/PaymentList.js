import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { fetchPaymentsThunk } from "../store/payment";


function PaymentList (props) {
const [picked, setPicked] = useState(-1)
useEffect(() => {
  if(props.user.id){
  props.fetchPayments(props.user.id)
  }
}, [])


return(
  <div>
    <h3>Select a Credit Card Below:</h3>
    {props.payment.map((payment) => {
      return (
        <button className={picked == payment.id ? "pickedPayment" : 'paymentListItem'} onClick={()=> {props.pickedPayment(payment.id), setPicked(payment.id)}}key={payment.id}>
          <h5>{payment.name}</h5>
          <h6>{payment.cardPreview}</h6>
          <h6>{payment.expirationDate}</h6>
        </button>
      )
    })}
  </div>
)


}
const mapStateToProps = (reduxState) => ({
  payment: reduxState.paymentInfo,
  user: reduxState.auth,
})

const mapDispatchToProps = (dispatch) => ({
  fetchPayments: (id) => dispatch(fetchPaymentsThunk(id)),
})
export default connect(mapStateToProps, mapDispatchToProps)(PaymentList);
