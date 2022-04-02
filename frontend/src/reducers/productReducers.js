const {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LISTP_REQUEST,
  PRODUCT_LISTP_SUCCESS,
  PRODUCT_LISTP_FAIL,
  PRODUCT_LIST_F1_REQUEST,
  PRODUCT_LIST_F1_SUCCESS,
  PRODUCT_LIST_F1_FAIL,
  PRODUCT_LIST_ALL_REQUEST,
  PRODUCT_LIST_ALL_SUCCESS,
  PRODUCT_LIST_ALL_FAIL,
  PRODUCT_LIST_F2_REQUEST,
  PRODUCT_LIST_F2_SUCCESS,
  PRODUCT_LIST_F2_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_RESET,
} = require('../constants/productConstants');


export const productListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, 
        products: action.payload.products, 
        productsCount: action.payload.productsCount,
        resPerPage: action.payload.resPerPage };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productListPReducer = (state = { loading: true, products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LISTP_REQUEST:
      return { loading: true };
    case PRODUCT_LISTP_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LISTP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productList_ALL_Reducer = (state = { loading: true, products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_ALL_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_ALL_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_ALL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productList_F1_Reducer = (state = { loading: true, products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_F1_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_F1_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_F1_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productList_F2_Reducer = (state = { loading: true, products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_F2_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_F2_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_F2_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
