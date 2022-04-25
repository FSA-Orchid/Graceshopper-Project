import axios from 'axios';

//Input for the axios routes is up to being change, routes work with postman/insomnia

const initialState = [];

//Action Constants
const SetCart = 'SET_CART';
const ClearCart = 'CLEAR_CART';
const RemoveFromCart = 'REMOVE_FROM_CART';
const AddToCart = 'ADD_TO_CART';
const UpdateQuantityCart = 'UPDATE_QUANTITY_CART';

//Action Creators
const setCart = (cart) => {
  return { type: SetCart, cart };
};

const clearCart = () => {
  return { type: ClearCart };
};

const removeFromCart = (product) => {
  return {
    type: RemoveFromCart,
    product,
  };
};

const addToCart = (newProduct) => {
  return {
    type: AddToCart,
    newProduct,
  };
};

const updateCart = (product) => {
  return {
    type: UpdateQuantityCart,
    product,
  };
};

//THUNKS
export const setCartThunk = (id) => {
  return async function (dispatch) {
    try {
      let response = await axios.get(`/api/users/${id}/cart`);
      let cart = response.data;
      dispatch(setCart(cart));
    } catch (err) {
      console.log(err);
    }
  };
};

export const clearCartThunk = (id) => {
  return async function (dispatch) {
    try {
      await axios.delete(`/api/users/${id}/cart/clear`);
      dispatch(clearCart());
    } catch (err) {
      console.log(err);
    }
  };
};

//this will complete the order and clear the state for this cart
export const closeOrderThunk = (id) => {
  return async function (dispatch) {
    try {
      await axios.put(`/api/users/${id}/cart/complete`);
      dispatch(clearCart());
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeFromCartThunk = (id, product) => {
  return async function (dispatch) {
    try {
      await axios.delete(`/api/users/${id}/cart/remove`, product.id);
      dispatch(removeFromCart(product));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addToCartThunk = (id, productId, inventory, price) => {
  return async function (dispatch) {
    try {
      //Or it would be an axios.post
      console.log('I DISPATCHED ADDTOCART');
      let response = await axios.post(`/api/users/${id}/cart/add`, {
        productId,
        inventory,
        price,
      });
      const newProduct = response.data;
      dispatch(addToCart(newProduct));
    } catch (err) {
      console.log(err);
    }
  };
};


export const updateQuantityCartThunk = (id, product) => {
  return async function (dispatch) {
    try {
      let response = await axios.put(
        `api/users/${id}/update`,
        product
      );
      let newProduct = response.data;
      dispatch(updateCart(newProduct));
    } catch (err) {
      console.log(err);
    }
  };
};

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
      return state.filter((product) => product.id !== action.product.id);
    default:
      return state;
  }
}
