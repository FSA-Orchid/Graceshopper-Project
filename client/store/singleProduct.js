import axios from 'axios';

const initialState = {};

<<<<<<< HEAD
// ACTION CONSTANTS
const SetSingleProduct = 'SET_SINGLE_PRODUCT';
const UpdateProduct = 'UPDATE_PRODUCT';

// ACTION CREATORS
=======
const SetSingleProduct = 'SET_SINGLE_PRODUCT'

//for single product view
>>>>>>> b73e3b0bd6afc8c749fdfcade8832976ad64c679
export const setSingleProduct = (product) => {
  return { type: SetSingleProduct, product };
};

// THUNKS
export const setProductThunk = (id) => {
  return async function (dispatch) {
<<<<<<< HEAD
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
=======
  try {
    let response = await axios.get(`/api/products/${id}`)
    let product = response.data
    dispatch(setSingleProduct(product))
  }
  catch (err){console.log(err)}
}}
>>>>>>> b73e3b0bd6afc8c749fdfcade8832976ad64c679

// REDUCER
export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case SetSingleProduct:
<<<<<<< HEAD
      return { ...state, product: action.product };
=======
      return action.product
>>>>>>> b73e3b0bd6afc8c749fdfcade8832976ad64c679
    default:
      return state;
  }
}
