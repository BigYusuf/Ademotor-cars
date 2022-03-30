import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {deleteProduct, listProducts} from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import { Link } from 'react-router-dom';
import Table from '../components/table/Table';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET} from '../constants/productConstants';

import './style2.css'

export default function ProductListPage(props) {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete;

  const dispatch = useDispatch();
    const customerTableHead = ['ID', 'IMAGE', 'NAME', 'PRICE', 'CATEGORY', 'BRAND', 'ACTIONS']
 
    const renderHead = (product, index) => <th key={index}>{product}</th>

    const renderBody = (product, index) => (
      <tr key={index}>
        <td>{product._id}</td>
        <td><img className="table_image" alt="" src={product.image}/></td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>{product.category}</td>
        <td>{product.model}</td>
        <td>
          <i type="" className="fas fa-pen" onClick={() => props.history.push(`/product/${product._id}/edit`) }></i>
          <i type="" className="fas fa-trash" onClick={() => deleteHandler(product)}> </i>
        </td>
      </tr>
  )


  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
    //  props.history.push(`/product/${createdProduct._id}/edit`);
    props.history.push('/productlist');
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProducts());
  }, [createdProduct, dispatch, props.history, successCreate, successDelete]);

  const deleteHandler = (product) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteProduct(product._id));
    }
  };
 // const createHandler = () => {
  //  dispatch(createProduct());
 // };
  
  return (
    <div>
      <div className="row">
      <Link to='/'>
            <button type="button" className="btn"> Go back</button>
      </Link> 
        <h1 className="List__title" >Products</h1>
      <Link to='/createproduct'>
            <button type="button" className="btn"> Create Product</button>
      </Link> 
      </div>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        
        <Table
              limit='10'
              headData={customerTableHead}
              renderHead={(product, index) => renderHead(product, index)}
              bodyData={products}
              renderBody={(product, index) => renderBody(product, index)}
          />
      )}
    </div>
  );
}
