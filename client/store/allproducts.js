import axios from 'axios';

const initialState = [];

//action constants
const SetProducts = 'SET_PRODUCTS';
const DeleteProduct = 'DELETE_PRODUCT';
const AddProduct = 'ADD_PRODUCT';
const UpdateProduct = 'UPDATE_PRODUCT';

//action creators
export const setProducts = (products) => {
  return { type: SetProducts, products };
};

export const deleteProduct = (id) => {
  return { type: DeleteProduct, id: id };
};

export const addProduct = (product) => {
  return { type: AddProduct, product: product };
};

export const updateProduct = (product) => {
  return { type: UpdateProduct, product: product };
};

//THUNKS BELOW
export const setProductsThunk = () => {
  return async function (dispatch) {
    try {
      let response = await axios.get('/api/products');
      let products = response.data;
      dispatch(setProducts(products));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteProductThunk = (id) => {
  return async function (dispatch) {
    try {
      await axios.delete(`/api/products/${id}`);
      await dispatch(deleteProduct(id));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addProductThunk = (product) => {
  return async function (dispatch) {
    try {
      let response = await axios.post('/api/products/add', product);
      let newProduct = response.data;
      dispatch(addProduct(newProduct));
    } catch (err) {
      console.log(err);
    }
  };
};

export const editProductThunk = (product) => {
  return async function (dispatch) {
    try {
      let response = await axios.put(`/api/products/${id}`, product);
      let updatedProduct = response.data;
      dispatch(updateProduct(updatedProduct));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SetProducts:
      return [...state, action.products];
    case UpdateProduct:
      return [
        state.map((product) =>
          product.id === action.product.id ? action.product : product
        ),
      ];
    case AddProduct:
      return [...state, action.product];
    case DeleteProduct:
      return [state.filter((product) => product.id !== action.id)];
    default:
      return state;
  }
}