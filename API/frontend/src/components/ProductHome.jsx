import React, { useEffect } from 'react';

import {Slide1} from './Slides';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProductHome() {
    var settings = {
      className: "center",
      dots: true,
      infinite: true,
      centerMode: true,
      centerPadding: "0px",
      autoplay: true,
      speed: 500,
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
            centerPadding: "60px",
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
    <section className="vehicles" id="vehicles">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <h1 className="heading"> popular <span>vehicles</span> </h1>
          <div className="slick vehicles-slider">
          <Slider {...settings}>
          {products.map((product) => (
              <Slide1 key={product._id} product={product}></Slide1>
            ))
            }

          </Slider>
          </div>
        </>
      )}
  </section>
  );
}