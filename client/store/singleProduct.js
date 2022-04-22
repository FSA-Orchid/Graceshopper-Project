import axios from "axios";

const initialState = {};

const SetSingleProduct = 'SET_SINGLE_PRODUCT'

//for single product view
export const setSingleProduct = (product) => {
  return {type: SetSingleProduct,
          product}
}


export const setProductThunk = (id) => {
  return async function (dispatch) {
  try {
    let response = await axios.get(`/api/products/${id}`)
    let product = response.data
    dispatch(setSingleProduct(product))
  }
  catch (err){console.log(err)}
}}

export default function singleProductReducer(state = initialState, action) {
  switch (action.type){
    case SetSingleProduct:
      return action.product
    default:
      return state
  }
}
