import axios from "axios"

//axios routes not implemented, cart interface not yet decided on. when added, remove this comment.

//NOT YET ADDED TO STORE Index

const initialState = [];

//Action Constants
const SetCart = "SET_CART"
const ClearCart = "CLEAR_CART"
const RemoveFromCart = "REMOVE_FROM_CART"
const AddToCart = "ADD_TO_CART"
const UpdateQuantityCart = "UPDATE_QUANTITY_CART"

//Action Creators
const setCart = (cart) => {
  return {type: SetCart, cart}
}

const clearCart = () => {
  return {type: ClearCart}
}

const removeFromCart = (product) => {
  return {
    type: RemoveFromCart,
    product
  }
}

const addToCart = (product) => {
  return {
    type: AddToCart,
    product
  }
}

const updateCart = (product) => {
  return {
    type: UpdateQuantityCart,
    product
  }
}

//THUNKS
export const setCartThunk = () => {
  return async function (dispatch) {
    try {
      let response = await axios.get(`/api/me/cart`);
      let cart = response.data;
      dispatch(setCart(cart));
    } catch (err) {
      console.log(err);
    }
  };
};

export const clearCartThunk = () => {
  return async function (dispatch) {
    try {
      await axios.delete(`/api/me/cart`)
      dispatch(clearCart())
    }
    catch (err) {
      console.log(err);
    }
  }
}

export const removeFromCartThunk = (product) => {
  return async function (dispatch) {
    try {
      await axios.delete(`/api/me/cart/${product.id}`)
      dispatch(removeFromCart(product))
    }
    catch (err) {
      console.log(err);
    }
  }
}

export const addToCartThunk = (product) => {
  return async function (dispatch) {
    try {
      //Or it would be an axios.post
      let response = await axios.put(`api/me/cart/${product.id}`)
      const newProduct = response.data
      dispatch(addToCart(newProduct))
    }
    catch (err) {
      console.log(err);
    }
  }
}

export const updateQuantityCartThunk = (product) => {
  return async function (dispatch) {
    try {
      let response = await axios.put(`api/me/cart/${product.id}`)
      let newProduct = response.data
      dispatch(updateCart(newProduct))
    }
    catch (err) {
      console.log(err);
    }
  }
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SetCart:
      return action.cart;
    case UpdateQuantityCart:
      return [
        state.map((product) =>
          product.id === action.product.id ? action.product : product
        ),
      ];
    case AddToCart:
      return [...state, action.newProduct];
    case ClearCart:
      return initialState;
    case RemoveFromCart:
      return state.filter((product) => product.id !== action.product.id)
    default:
      return state;
  }
}
