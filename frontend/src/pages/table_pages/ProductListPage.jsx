import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {deleteProduct, listProductsP} from '../../actions/productActions';
import LoadingBox from '../../components/LoadingBox';
import { Link } from 'react-router-dom';
import Table from '../../components/Table';
import MessageBox from '../../components/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET} from '../../constants/productConstants';

import './listPages.css'

export default function ProductListPage(props) {
  const productList = useSelector((state) => state.productListP);
  const { loading, error, products } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete;
  
  const dispatch = useDispatch();
    const customerTableHead = ['ID', 'IMAGE', 'NAME', 'PRICE', 'CATEGORY', 'BRAND', 'ACTIONS']
 
    const renderHead = (product, index) => <th key={index}>{product}</th>

    const renderBody = (product, index) => (
      <tr className="table__row" key={index}>
        <td className="table__data" data-label="ID">{product._id}</td>
        <td className="table__data" data-label="IMAGE"><img className="table__image" alt="" src={product.image}/></td>
        <td className="table__data" data-label="NAME">{product.name}</td>
        <td className="table__data" data-label="PRICE">{product.price}</td>
        <td className="table__data" data-label="CATEGORY">{product.category}</td>
        <td className="table__data" data-label="BRAND">{product.model}</td>
        <td className="table__data" data-label="ACTION">
          <i type="" className="fas fa-pen" onClick={() => props.history.push(`/product/${product._id}/edit`) }></i>
          <i type="" className="fas fa-trash" onClick={() => deleteHandler(product)}> </i>
        </td>
      </tr>
  )


  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
    props.history.push('/productlist');
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProductsP());
  }, [createdProduct, dispatch, props.history, successCreate, successDelete]);

  const deleteHandler = (product) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteProduct(product._id));
    }
  };
  
  return (
    <div  className="list__container">
      <div className="list__header">
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
