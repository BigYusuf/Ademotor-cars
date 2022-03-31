import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination'
import Product from '../../components/Product';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import '../style2.css'
import './viewAllProduct.css'
import Header from '../../components/Header';

export default function ViewAllProductPage({match}) {
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, productsCount, resPerPage } = productList;
  //const { loading, error, products } = productList;

  const keyword = match.params.keyword
  useEffect(() => {
    dispatch(listProducts(currentPage, keyword));
  }, [dispatch, currentPage, keyword]);

  function setCurrentPageNo(pageNumber){
    setCurrentPage(pageNumber)
  }
  return (
    <div>
      <Header/>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
          {resPerPage <= productsCount && (
            <div className="pagination">
              <Pagination 
              activePage ={currentPage}
              itemsCountPerPage={resPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText={'Next'}
              prevPageText={'Prev'}
              firstPageText={'First'}
              lastPageText={'Last'}
              itemClass='pagination1'
              linkClass='pagination2'
              />
            </div>
          )}

        </>
      )}
    </div>
  );
}
