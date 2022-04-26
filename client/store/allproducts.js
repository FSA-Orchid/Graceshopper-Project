import axios from "axios";

const initialState = [];

const ghost = {
  instrument: "",
  make: "",
  imageUrl: "",
  model: "",
  year: "",
  color: "",
  condition: "",
  description: "",
  price: 0,
  inventory: 0,
};

//action constants
const SetProducts = "SET_PRODUCTS";
const SetGuitars = "SET_GUITARS";
const SetBass = "SET_BASS";
const SetOldToNew = "SET_OLD_TO_NEW";
const SetNewToOld = "SET_NEW_TO_OLD";
const SetMake = "SET_MAKE";
const SetPriceMax = "SET_PRICE_MAX";
const SetPriceMin = "SET_PRICE_MIX";
const DeleteProduct = "DELETE_PRODUCT";
const AddProduct = "ADD_PRODUCT";
const UpdateProduct = "UPDATE_PRODUCT";

//action creators
export const setProducts = (products) => {
  return { type: SetProducts, products };
};

export const setGuitars = (products) => {
  return {
    type: SetGuitars,
    products,
  };
};

export const setBass = (products) => {
  return {
    type: SetBass,
    products,
  };
};

export const setOldToNew = (products, productsYears) => {
  return {
    type: SetOldToNew,
    products,
    productsYears,
  };
};

export const setNewToOld = (products, productsYears) => {
  return {
    type: SetNewToOld,
    products,
    productsYears,
  };
};

export const setMake = (products) => {
  return {
    type: SetMake,
    products,
  };
};

export const setPriceMax = (products, productsPrice) => {
  return {
    type: SetPriceMax,
    products,
    productsPrice,
  };
};

export const setPriceMin = (products, productsPrice) => {
  return {
    type: SetPriceMin,
    products,
    productsPrice,
  };
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
      let response = await axios.get("/api/products");
      let products = response.data;
      dispatch(setProducts(products));
    } catch (err) {
      console.log(err);
    }
  };
};

export const setGuitarsThunk = () => {
  return async function (dispatch) {
    try {
      let response = await axios.get("/api/products");
      let products = response.data;
      dispatch(setGuitars(products));
    } catch (err) {
      console.log(err);
    }
  };
};

export const setBassThunk = () => {
  return async function (dispatch) {
    try {
      let response = await axios.get("/api/products");
      let products = response.data;
      dispatch(setBass(products));
    } catch (err) {
      console.log(err);
    }
  };
};

export const setOldToNewThunk = () => {
  return async function (dispatch) {
    try {
      let response = await axios.get("/api/products");
      let products = response.data;
      let productsYears = [...products.map((product) => product.year)];
      dispatch(setOldToNew(products, productsYears));
    } catch (err) {
      console.log(err);
    }
  };
};

export const setNewToOldThunk = () => {
  return async function (dispatch) {
    try {
      let response = await axios.get("/api/products");
      let products = response.data;
      let productsYears = [...products.map((product) => product.year)];
      dispatch(setNewToOld(products, productsYears));
    } catch (err) {
      console.log(err);
    }
  };
};

export const setMakeThunk = (make) => {
  return async function (dispatch) {
    try {
      let response = await axios.get("/api/products");
      let products = response.data.filter((product) => product.make === make);
      dispatch(setMake(products));
    } catch (err) {
      console.log(err);
    }
  };
};

export const setPriceMaxThunk = () => {
  return async function (dispatch) {
    try {
      let response = await axios.get("/api/products");
      let products = response.data;
      let productsPrice = [...products.map((product) => product.price)];
      dispatch(setPriceMax(products, productsPrice));
    } catch (err) {
      console.log(err);
    }
  };
};

export const setPriceMinThunk = () => {
  return async function (dispatch) {
    try {
      let response = await axios.get("/api/products");
      let products = response.data;
      let productsPrice = [...products.map((product) => product.price)];
      dispatch(setPriceMin(products, productsPrice));
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
      let response = await axios.post("/api/products/add", product);
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
      let response = await axios.put(`/api/products/${product.id}`, product);
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
      return action.products;
    case SetGuitars:
      return action.products.filter(
        (product) => product.instrument === "Guitar"
      );
    case SetBass:
      return action.products.filter((product) => product.instrument === "Bass");
    case SetMake:
      return action.products;
    case SetOldToNew:
      state.sort((a, b) => {
        return a.year - b.year;
      });
      return [...state];
    case SetNewToOld:
      state.sort((a, b) => {
        return b.year - a.year;
      });
      return [...state];
    case SetPriceMax:
      state.sort(function (a, b) {
        return b.price - a.price;
      });
      console.log("max to min products", state);
      return [...state];
    case SetPriceMin:
      state.sort(function (a, b) {
        return a.price - b.price;
      });
      console.log("max to min products", state);
      return [...state];
    case UpdateProduct:
      return state.map((product) =>
        product.id === action.product.id ? action.product : product
      );
    case AddProduct:
      return [...state, action.product];
    case DeleteProduct:
      return [state.filter((product) => product.id !== action.id)];
    default:
      return state;
  }
}
