import React from 'react';
import Intro from '../../components/Intro';
import ProductHome from '../../components/ProductHome';
import FeaturedProduct from '../../components/FeaturedProduct';
import Service from '../../components/Service';
import Navbar from '../../components/Navbar';
import Review from '../../components/Review';
import NewsLetter from '../../components/NewsLetter';
import Contact from '../../components/Contact';
import Footer from '../../components/Footer';

const HomePage = () => {
    return (
        <div>
            <Navbar/>
            <Intro/>
            <ProductHome/>
            <Service/>
            <FeaturedProduct/>
            <NewsLetter/>
            <Review/>
            <Contact/>
            <Footer/>
        </div>
    )
}

export default HomePage
