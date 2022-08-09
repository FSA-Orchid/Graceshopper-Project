import axios from "axios";
import { toast } from "react-toastify";
import history from "../history";
import { setCartFromLoginThunk, clearCart} from "./cart";
import { logoutPayment } from "./payment";
import { logoutShipping } from "./shipAddress";
const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });

    dispatch(setCartFromLoginThunk(res.data.id))

    return dispatch(setAuth(res.data));
  }
};

export const authenticateSign =
  (username, password, email,  method) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, {
        username,
        password,
        email,

      });

      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
      toast.success("Logged in successfully!")
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const authenticate =
  (username, password, method) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, { username, password });

      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
      toast.success("Logged in successfully!")
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  return async function (dispatch) {
    try {
      localStorage.removeItem(TOKEN);
      localStorage.removeItem("cart");
      dispatch(clearCart());
      history.push("/login");
      dispatch(logoutPayment())
      dispatch(logoutShipping())
      dispatch(setAuth({}))
    } catch (err) {
      console.log(err);
    }
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
