import axios from 'axios';

const initialState = {};

// ACTION CONSTANTS
const SetSingleProduct = 'SET_SINGLE_PRODUCT';
const UpdateProduct = 'UPDATE_PRODUCT';

// ACTION CREATORS
export const setSingleProduct = (product) => {
  return { type: SetSingleProduct, product };
};

// THUNKS
export const setProductThunk = (id) => {
  return async function (dispatch) {
    try {
      let response = await axios.get(`PLACEHOLDERFORROUTE/${id}`);
      let product = response.data;
      dispatch(setSingleProduct(product));
    } catch (err) {
      console.log(err);
    }
  };
};

export const editProductThunk = (product) => {
  return async function (dispatch) {
    try {
      let response = await axios.put(`PLACEHOLDER/${product.id}`, product);
      let updatedProduct = response.data;
      dispatch(updateProduct(updatedProduct));
    } catch (err) {
      console.log(err);
    }
  };
};

// REDUCER
export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case SetSingleProduct:
      return { ...state, product: action.product };
    default:
      return state;
  }
}
