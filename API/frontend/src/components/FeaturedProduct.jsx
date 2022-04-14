import React, { useEffect } from 'react';

import { Slide2 } from './Slides';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function FeaturedProduct() {
    var settings = {
        className: "center",
    dots: true,
    infinite: true,
    centerMode: true,
    centerPadding: "0px",
    autoplay: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
     {
       breakpoint: 1024,
       settings: {
         slidesToShow: 3
       }
     },
     {
       breakpoint: 768,
       settings: {
         slidesToShow: 2,
       }
     },
     {
       breakpoint: 480,
       settings: {
         slidesToShow: 1,
       }
     }
    ]
    };
      const dispatch = useDispatch();
      const productList = useSelector((state) => state.productList);
      const { loading, error, products } = productList;
    
      useEffect(() => {
        dispatch(listProducts());
      }, [dispatch]);
      return (
        <section className="featured" id="featured">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
           <>
    
            <h1 className="heading">featured <span>cars</span> </h1>
        
            <div className="slick featured-slider">
           
            <Slider {...settings}>
              {products.map((product) => (
                <Slide2 key={product._id} product={product}></Slide2>
              ))}
            </Slider>
    
              </div>
            <div className="slick featured-slider">
           
            <Slider {...settings}>
              {products.map((product) => (
                <Slide2 key={product._id} product={product}></Slide2>
              ))}
            </Slider>
    
            </div>
          </>
        )}
    </section>
      );
    }
    