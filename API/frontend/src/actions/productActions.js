//import Axios from 'axios';
import {axiosInstance} from '../config.js';
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LISTP_FAIL,
  PRODUCT_LISTP_REQUEST,
  PRODUCT_LISTP_SUCCESS,
  PRODUCT_LIST_F1_FAIL,
  PRODUCT_LIST_F1_REQUEST,
  PRODUCT_LIST_F1_SUCCESS,
  PRODUCT_LIST_F2_FAIL,
  PRODUCT_LIST_F2_REQUEST,
  PRODUCT_LIST_F2_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_SUCCESS,
} from '../constants/productConstants';

export const listProducts = (keyword = '', currentPage = 1) => async (dispatch) => {
  dispatch({ type: PRODUCT_LIST_REQUEST });
  //let link = `/api/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`
  let link = `/api/products?keyword=${keyword}&page=${currentPage}`
  try {
    const { data } = await axiosInstance.get(link);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};
export const listProductsP = () => async (dispatch) => {
  dispatch({ type: PRODUCT_LISTP_REQUEST });
  try {
    const { data } = await axiosInstance.get(`/api/allproducts`);
    dispatch({ type: PRODUCT_LISTP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LISTP_FAIL, payload: error.message });
  }
};
export const listProductsf1 = () => async (dispatch) => {
  dispatch({ type: PRODUCT_LIST_F1_REQUEST });
  try {
    const { data } = await axiosInstance.get(`/api/products/featured1`);
    dispatch({ type: PRODUCT_LIST_F1_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_F1_FAIL, payload: error.message });
  }
};
export const listProductsf2 = () => async (dispatch) => {
  dispatch({ type: PRODUCT_LIST_F2_REQUEST });
  try {
    const { data } = await axiosInstance.get(`/api/products/featured2`);
    dispatch({ type: PRODUCT_LIST_F2_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_F2_FAIL, payload: error.message });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    const { data } = await axiosInstance.get(`/api/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_REQUEST, payload: product  });
  const {userSignin: { userInfo }} = getState();
  try {
    const { data } = await axiosInstance.post( '/api/products/createproduct', product, 
      { headers: { Authorization: `Bearer ${userInfo.token}` }}
    );
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data.product });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_CREATE_FAIL, payload: message });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
  const { userSignin: { userInfo }} = getState();
  try {
    const { data } = await axiosInstance.put(`/api/products/${product._id}`, product, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_UPDATE_FAIL, error: message });
  }
};
export const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
  //
  const { userSignin: { userInfo }} = getState();
  try {
    const { data } = axiosInstance.delete(`/api/products/${productId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
  }
};
