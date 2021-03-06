import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import singleProduct from './singleProduct';
import allProducts from './allproducts';
import cart from './cart';
import orderHistory from './orderHistory';
import allUsers from './users';
import singleUser from './singleUser';
import paymentInfo from './payment'
import shippingAddresses from './shipAddress'


const reducer = combineReducers({
  auth: auth,
  singleProduct: singleProduct,
  products: allProducts,
  cart: cart,
  orders: orderHistory,
  users: allUsers,
  user: singleUser,
  paymentInfo: paymentInfo,
  shippingAddresses: shippingAddresses
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware)
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
