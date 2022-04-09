import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import Product from '../../components/Product';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import Search from '../../components/Search';
import Navbar from '../../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import { Route } from 'react-router-dom';
import '../style2.css';
import './viewAllProduct.css';
import 'rc-slider/assets/index.css';



export default function ViewAllProductPage({match}) {
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, productsCount, resPerPage } = productList;

  const keyword = match.params.keyword;
  useEffect(() => {
    dispatch(listProducts(keyword, currentPage));
  }, [dispatch, keyword, currentPage]);

  function setCurrentPageNo(pageNumber){
    setCurrentPage(pageNumber)
  }
  return (
    <div className="products__container">
      <Navbar/>
      <div className="search">
        <Route render= {({history}) => <Search history ={history}/> }/>
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
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          
          <div className="products__contents">
            {keyword ? (
              <>
              <div className="products__left">
                <div className="filter__wrapper">
                 
                </div>
              </div>

              <div className="products__right">
                  {products.map((product) => (
                    <Product key={product._id} product={product}></Product>
                  ))}
              </div>
              </>
            ) : 
              <div className="products__wrapper">
                  {products.map((product) => (
                    <Product key={product._id} product={product}></Product>
                  ))}
              </div>
            }
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
