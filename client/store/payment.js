import axios from "axios"

const initialState = []

const FetchPayment = "FETCH_PAYMENTS"
const AddPayment = "ADD_PAYMENT";
const UpdatePayment = "UPDATE_PAYMENT";
const DeletePayment = "DELETE_PAYMENT";

export const fetchPayments = (payments) => {
  return {type: FetchPayment, payments}
}
export const addPayment = (payment) => {
  return { type: AddPayment, payment };
};
export const updatePayment = (payment) => {
  return { type: UpdatePayment, payment };
};
export const deletePayment = (payment) => {
  return { type: DeletePayment, payment };
};

export const fetchPaymentsThunk = (userId) => {
  return async function (dispatch) {
    try {
      let response = await axios.get(`/api/users/${userId}/payment`)
      let payments = response.data
      dispatch(fetchPayments(payments))
    }
    catch(err){
      console.log(err)
    }
  }
}
export const addPaymentThunk = (userId, payment, email) => {
  return async function (dispatch) {
    try {
      if(userId){
        let response = await axios.post(`/api/users/${userId}/payment`,
        payment,
        )
        const newPayment = response.data
        dispatch(addPayment(newPayment))
      }
      else {
        let response = await axios.post(`/api/users/notLoggedPayment`,
        payment,
        email)
        const newPayment = response.data
        dispatch(addPayment(newPayment))
      }
    }
    catch (err){console.log(err)}
  }
}

export const updatePaymentThunk = (userId, payment) => {
  return async function (dispatch) {
    try {
      let response = axios.put(`/api/users/paymentUp`,
      payment)
      let updatedPay = response.data
      dispatch(updatePayment(updatedPay))
    }
    catch(err){console.log(err)}
  }
}

export const deletePaymentThunk = (userId, payment) => {
  return async function (dispatch) {
    try {
      await axios.put(`/api/users/${userId}/payment`,
      payment)
      dispatch(deletePayment(payment))
    }
    catch(err) {console.log(err)}
  }
}

export default function paymentReducer(state = initialState, action) {
  switch (action.type){
    case FetchPayment:
      return action.payments
    case AddPayment:
      return [...state][action.payment]
    case UpdatePayment:
      return state.map((paymentState) => {
        if (paymentState.id === action.payment.id) {
          return action.payment
        }
        else {return paymentState}
      })
    case DeletePayment:
      return state.filter((paymentState) => paymentState.id !== action.payment.id)
    default:
      return state
  }
}
