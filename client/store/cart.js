import axios from "axios";

//Input for the axios routes is up to being change, routes work with postman/insomnia

const initialState = [];

//Action Constants
const SetCart = "SET_CART";
const ClearCart = "CLEAR_CART";
const RemoveFromCart = "REMOVE_FROM_CART";
const AddToCart = "ADD_TO_CART";
const UpdateQuantityCart = "UPDATE_QUANTITY_CART";

//this function will split an array in two depending
function split(array, cart) {
  return array.reduce(
    ([toUpdate, toAdd], item) => {
      return cart.find((current) => current.id == item.id)
        ? [[...toUpdate, item], toAdd]
        : [toUpdate, [...toAdd, item]];
    },
    [[], []]
  );
}

//Action Creators
const setCart = (cart) => {
  return { type: SetCart, cart };
};

export function clearCart() {
  return { type: ClearCart };
}

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

//This thunk will check if the user, when logging in, has a local state cart and will copy it to their
//logged in account
export const setCartFromLoginThunk = (id) => {
  return async function (dispatch) {
    try {

      let res = await axios.get(`/api/users/${id}/cart`);
      let cart = res.data;

      if (cart) {
        let cartParse = localStorage.getItem("cart");
        let localCart = JSON.parse(cartParse);
        let [toUpdate, toAdd] = split(localCart, cart);


        toAdd.map((item) => dispatch(addToCartThunk(id, item, item.orderProduct.inventory)));
        toUpdate.map((item) =>
          dispatch(updateQuantityCartThunk(id, item.id, item.orderProduct.inventory))
        );

        localStorage.setItem("cart", "");
      } else {
        let cartParse = localStorage.getItem("cart");
        if (cartParse) {
          let localCart = JSON.parse(cartParse);
          localCart.map((item) => dispatch(addToCartThunk(id, item, item.inventory)));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const setCartThunk = (id) => {
  return async function (dispatch) {
    try {
      if (id) {
        let response = await axios.get(`/api/users/${id}/cart`);
        let cart = response.data;
        dispatch(setCart(cart));
      } else {
        let cartParse = window.localStorage.getItem("cart");
        if (cartParse) {
          let cart = JSON.parse(cartParse);
          dispatch(setCart(cart));
        } else {
          localStorage.setItem("cart", []);
          dispatch(setCart([]));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const clearCartThunk = (id) => {
  return async function (dispatch) {
    try {
      if (id) {
        await axios.delete(`/api/users/${id}/cart/clear`);
        dispatch(clearCart());
        localStorage.removeItem("cart");
      } else {
        localStorage.removeItem("cart");
        dispatch(clearCart())
      }
    } catch (err) {
      console.log(err);
    }
  };
};

//this will complete the order and clear the state for this cart
export const closeOrderThunk = (id) => {
  return async function (dispatch) {
    try {
      if(id){
      await axios.put(`/api/users/${id}/cart/complete`);
      dispatch(clearCart())
    }
      localStorage.removeItem("cart")
      dispatch(clearCart())
    } catch (err) {
      console.log(err);
    }
  };
};

// export const closeOrderNotLoggedThunk = (email) => {
//   return async function (dispatch) {
//     try {
//       if(email){
//         await axios.g
//       }
//     }
//   }
// }

export const removeFromCartThunk = (id, product) => {
  return async function (dispatch) {
    try {
      if (id) {

        await axios.delete(`/api/users/${id}/cart/${product.id}/remove`);
        dispatch(removeFromCart(product));
      } else {
        let localCart = JSON.parse(localStorage.getItem("cart"));
        let newCart = localCart.filter((item) => item.id !== product.id);
        localStorage.setItem("cart", JSON.stringify(newCart));
        dispatch(removeFromCart(product));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const addToCartThunk = (id, product, inventory) => {
  return async function (dispatch) {
    try {

      //Or it would be an axios.post
      if (id) {
        const price = product.price;
        const productId = product.id;
        let response = await axios.post(`/api/users/${id}/cart/add`, {
          productId,
          inventory,
          price,
        });
        const newProduct = response.data;
        dispatch(addToCart(newProduct));
      } else {
        let cartWindow = localStorage.getItem("cart");

        let cart = [];
        if (cartWindow) {
          cart = JSON.parse(cartWindow);
        }
        product.orderProduct = {
          inventory: inventory,
          totalPrice: inventory * product.price,
        };

        if (!cart) {
          cart = [];
        }
        cart.push(product);
        let stringCart = JSON.stringify(cart);
        localStorage.setItem("cart", stringCart);
        dispatch(addToCart(cart));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateQuantityCartThunk = (id, productId, inventory) => {
  return async function (dispatch) {
    try {
      if (id) {
        let response = await axios.put(`/api/users/${id}/cart/update`, {
          productId: productId,
          inventory: inventory,
        });
        let newProduct = response.data;
        dispatch(updateCart(newProduct));
      } else {
        let cart = JSON.parse(localStorage.getItem("cart"));
        let productChange = cart.find((cartItem) => cartItem.id == productId);

        productChange.orderProduct = {
          inventory: inventory,
          totalPrice: inventory * productChange.price,
        };
        let stringCart = JSON.stringify(cart);
        localStorage.setItem("cart", stringCart);
        dispatch(updateCart(productChange))
      }
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
      return state.map((product) =>
        product.id === action.product.id ? action.product : product
      );
    case AddToCart:
      return action.newProduct;
    case ClearCart:
      return initialState;
    case RemoveFromCart:
      return state.filter((product) => product.id !== action.product.id);
    default:
      return state;
  }
}
