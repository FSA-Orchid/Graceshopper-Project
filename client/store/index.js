import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import singleProduct from './singleProduct';
<<<<<<< HEAD
import allproducts from './allproducts';
=======
import allProducts from './allproducts';
import cart from './cart';
import orderHistory from './orderHistory';
import allUsers from './users';
import singleUser from './singleUser';
>>>>>>> b73e3b0bd6afc8c749fdfcade8832976ad64c679

const reducer = combineReducers({
  auth: auth,
  singleProduct: singleProduct,
<<<<<<< HEAD
  products: allproducts,
=======
  products: allProducts,
  cart: cart,
  orders: orderHistory,
  users: allUsers,
  user: singleUser,
>>>>>>> b73e3b0bd6afc8c749fdfcade8832976ad64c679
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
