import axios from "axios";

const initialState = [];

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
      let productsPrice = products.map((product) => product.price);
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
      let productsPrice = products.map((product) => product.price);
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
      let sortedYearsOld = action.productsYears;
      sortedYearsOld.sort(function (a, b) {
        return a - b;
      });
      console.log("old to new years", sortedYearsOld);
      let sortedProductsOld = [];
      for (let i = 0; i < sortedYearsOld.length; i++) {
        let curYear = sortedYearsOld[i];
        for (let j = 0; j < action.products.length; j++) {
          let curProduct = action.products[j];
          if (curYear === curProduct.year) {
            sortedProductsOld.push(curProduct);
          }
        }
      }
      console.log("Old to New products", sortedProductsOld);
      return sortedProductsOld;
    case SetNewToOld:
      let sortedYearsNew = action.productsYears;
      sortedYearsNew.sort(function (a, b) {
        return b - a;
      });
      let sortedProductsNew = [];
      for (let i = 0; i < sortedYearsNew.length; i++) {
        let curYearNew = sortedYearsNew[i];
        for (let j = 0; j < action.products.length; j++) {
          let curProductNew = action.products[j];
          if (curYearNew === curProductNew.year) {
            sortedProductsNew.push(curProductNew);
          }
        }
      }
      // sortedProductsNew = sortedProductsNew.map(
      //   (product) => (product.id = product.id + sortedProductsNew.length)
      // );
      console.log("New to Old products", sortedProductsNew);
      return sortedProductsNew;
    case SetPriceMax:
      let sortedPriceMax = [...action.productsPrice];
      sortedPriceMax.sort(function (a, b) {
        return b - a;
      });
      let maxToMinPrice = [];
      for (let i = 0; i < sortedPriceMax.length; i++) {
        curPrice = sortedPriceMax[i];
        for (let j = 0; j < action.products.length; j++) {
          let curProduct = action.products[j];
          if (curPrice === curProduct.price) {
            maxToMinPrice.push(curProduct);
          }
        }
      }
      maxToMinPrice = maxToMinPrice.map(
        (product) => (product.id = product.id + maxToMinPrice.length)
      );
      console.log("max to min products", maxToMinPrice);
      return maxToMinPrice;
    case SetPriceMin:
      let sortedPriceMin = [...action.productsPrice];
      sortedPriceMin.sort(function (a, b) {
        return a - b;
      });
      let minToMaxPrice = [];
      for (let i = 0; i < sortedPriceMin.length; i++) {
        curPrice = sortedPriceMin[i];
        for (let j = 0; j < action.products.length; j++) {
          let curProduct = action.products[j];
          if (curPrice === curProduct.price) {
            minToMaxPrice.push(curProduct);
          }
        }
      }
      return minToMaxPrice;
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
