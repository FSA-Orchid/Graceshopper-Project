import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import singleProduct from "./singleProduct";
import allProducts from "./allproducts";
import cart from './cart'
import orderHistory from './orderHistory'

const reducer = combineReducers({
  auth: auth,
  singleProduct: singleProduct,
  products: allProducts,
  cart: cart,
  orders: orderHistory

});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
