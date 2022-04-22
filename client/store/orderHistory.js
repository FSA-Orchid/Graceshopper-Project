import axios from "axios"
const initialState = []

const SetOrders = "SET_ORDERS"

const setOrders = (orders) => {
  return {type: SetOrders, orders}
}

export const setOrderThunk = (id) => {
  return async function (dispatch) {
    try {
      let response = await axios.get(`/api/cart/${id}/`);
      let orders = response.data;
      dispatch(setOrders(orders));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case SetOrders:
      return action.orders
    default:
      return state;
  }
}
