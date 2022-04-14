import React, {memo} from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import '../pages/allproducts_page/viewAllProduct.css'

function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="product__card">
      <Link to={`/product/${product._id}`}>
        <img className="product__image" src={product.image} alt={product.name} />
      </Link>
      <div className="product__body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <div className="product__price">${product.price}</div>
      </div>
    </div>
  );
}
export default memo(Product);