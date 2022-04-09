import React from 'react';
import {Link} from 'react-router-dom';
import Rating from "./Rating";



export const Slide1 = (props) => {
   
const {product} =props;
  return (
   
          <div className="slick-wrapper" key={product._id}>
          <div className="swiper-slide box" >
                <Link to={`/product/${product._id}`}>
                  <img src={product.image} alt=""/>
                </Link>
                   
                    <div className="content">
                        <h3>new model</h3>
                        <div className="price"> <span>price : </span> ${product.price}/- </div>
                        <p>
                        {product.oldNew}
                            <span className="fas fa-circle"></span> {product.year}
                            <span className="fas fa-circle"></span> {product.type}
                            <span className="fas fa-circle"></span> {product.engine}
                            <span className="fas fa-circle"></span> {product.speed}
                        </p>
                        <Link to={`/product/${product._id}`} className="btn">check out</Link>
                    </div>
                </div>
      </div>
      
  );
}
  
export const Slide2 = (props) => {
   
  const {product} =props;
  return (
  
    <div className="slick-wrapper" key={product._id}>
        <div className="slick-slide box"> 
        <Link to={`/product/${product._id}`}>
          <img src={product.image} alt=""/>
          </Link>
            <div className="content">
                <h3>{product.oldNew} model</h3>
                <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                <div className="price">{product.price}/-</div>
                <Link to={`/product/${product._id}`} className="btn">check out</Link>
            </div>
        </div>
      </div>
      );
}

export const Slide3 = (props) => {
   
  const {user} =props;
  return (
    <div className="slick-wrapper" key={user._id}>
      <div className="slick-slide box">
        <img src={user.image} alt=""/>
        <div className="content">
            <p>{user.ReviewUs}</p>
            <h3>{user.name}</h3>
            <Rating rating={user.RateUs}></Rating>
            
        </div>
      </div>
    </div>
      );
}
