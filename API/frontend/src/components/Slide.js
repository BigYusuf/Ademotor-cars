import React from "react";
import Slider from "react-slick";
import data from '../data';

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function Slide() {
  var settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    centerPadding: "60px",
    autoplay: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };
  return (

    <Slider {...settings}>
       {
                    data.popularCars.map(car => (
                <div className="swiper-slide box" key={car._id}>
                    <img src={car.image} alt=""/>
                    <div className="content">
                        <h3>new model</h3>
                        <div className="price"> <span>price : </span> ${car.price}/- </div>
                        <p>
                        {car.oldNew}
                            <span className="fas fa-circle"></span> {car.year}
                            <span className="fas fa-circle"></span> {car.type}
                            <span className="fas fa-circle"></span> {car.engine}
                            <span className="fas fa-circle"></span> {car.speed}
                        </p>
                        <a href="#" className="btn">check out</a>
                    </div>
                </div>
                    ))};
    </Slider>
  );
}
  

export default Slide;
