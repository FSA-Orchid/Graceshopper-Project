import axios from "axios";

const initialState = {};

const SetSingleProduct = 'SET_SINGLE_PRODUCT'


export const setSingleProduct = (product) => {
  return {type: SetSingleProduct,
          product}
}


export const setProductThunk = (id) => {
  return async function (dispatch) {
  try {
    let response = await axios.get(`PLACEHOLDERFORROUTE/${id}`)
    let product = response.data
    dispatch(setSingleProduct(product))
  }
  catch (err){console.log(err)}
}}

export default function singleProductReducer(state = initialState, action) {
  switch (action.type){
    case SetSingleProduct:
      return {...state, product : action.product}
    default:
      return state
  }
}
