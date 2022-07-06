import axios from "axios"

const initialState = []

const FetchShipping = "FETCH_SHIPPING"
const AddShipping = "ADD_SHIPPING";
const UpdateShipping = "UPDATE_SHIPPING";
const DeleteShipping = "DELETE_SHIPPING";

export const fetchShipping = (shipping) => {
  return {type: FetchShipping, shipping}
}
export const addShipping = (shipping) => {
  return { type: AddShipping, shipping };
};
export const updateShipping = (shipping) => {
  return { type: UpdateShipping, shipping };
};
export const deleteShipping = (shipping) => {
  return { type: DeleteShipping, shipping };
};

export const fetchShippingThunk = (userId) => {
  return async function (dispatch) {
    try {
      let response = await axios.get(`/api/users/${userId}/shipping`)
      let shipping = response.data
      dispatch(fetchShipping(shipping))
    }
    catch(err){
      console.log(err)
    }
  }
}

export const addShippingThunk = (userId, shipping, email) => {
  return async function (dispatch) {
    try{
      if(userId){
      shipping.email = email
      let response = await axios.post(`/api/users/${userId}/shipping`, shipping,
      )
      const newShipping = response.data
      console.log(newShipping)
      dispatch(addShipping(newShipping))
      }
      else {
        localStorage.setItem("shipping", JSON.stringify(shipping))
        let response = await axios.post(`/api/users/notLoggedShipping`,
        shipping)
        const newShipping = response.data
        dispatch(addShipping(newShipping))
      }
    }
    catch(err){console.log(err)}
  }
}

export const deleteShippingThunk = (userId, shipping) => {
  return async function (dispatch) {
    try {
        await axios.put(`/api/users/${userId}/shipping`,
        shipping
        )
        dispatch(deleteShipping(shipping))
    }
    catch (err) {console.log(err)}
  }
}

export const updateShippingThunk = (userId, shipping) => {
  return async function (dispatch) {
    try {
      let response = axios.put(`/api/users/shippingUp`,
      shipping)
      let updateShip = (await response).data
      dispatch(updateShipping(updateShip))
    }
    catch(err){console.log(err)}
  }
}


export default function shippingReducer(state = initialState, action) {
  switch (action.type){
    case FetchShipping:
      return action.shipping
    case AddShipping:
      return [...state][action.shipping]
    case UpdateShipping:
      return state.map((shipping) => {
        if (shipping.id === action.shipping.id) {
          return action.shipping
        }
        else {return shipping}
      })
    case DeleteShipping:
      return state.filter((shippingState) => shippingState.id !== action.shipping.id)
    default:
      return state
  }
}
