import React from 'react';

import {Slide3} from './Slides';
import data from '../data'
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Review = () => {
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
         slidesToShow: 1,
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
     // const dispatch = useDispatch();
    //  const userList = useSelector((state) => state.userList);
      //const { loading, error } = userList;
    
 // useEffect(() => {
   // dispatch(listUsers());
 // }, [dispatch]);
    return (
        <div>
           {/* {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (*/}
            <section className="reviews" id="reviews">

            <h1 className="heading"> client's <span>review</span> </h1>

            <div className="slick review-slider">

            <Slider {...settings}>
          {data.users.map((user, index) => (
            <Slide3 key={index} user={user}></Slide3>
          ))}
          </Slider>

                <div className="slick-pagination"></div>

            </div>

            </section>

        {/* )}*/}
        </div>
    )
}

export default Review
