import React from 'react';
import { Link } from 'react-router-dom';

const Service = () => {
    return (
        <div>
            
<section className="services" id="services">

<h1 className="heading"> our <span>services</span> </h1>

<div className="box-container">

    <div className="box">
        <i className="fas fa-car"></i>
        <h3>car selling</h3>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis, nisi.</p>
        <Link to="#" className="btn"> read more</Link>
    </div>

    <div className="box">
        <i className="fas fa-tools"></i>
        <h3>parts repair</h3>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis, nisi.</p>
        <Link to="#" className="btn"> read more</Link>
    </div>

    <div className="box">
        <i className="fas fa-car-crash"></i>
        <h3>car insurance</h3>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis, nisi.</p>
        <Link to="#" className="btn"> read more</Link>
    </div>

    <div className="box">
        <i className="fas fa-car-battery"></i>
        <h3>battery replacement</h3>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis, nisi.</p>
        <Link to="#" className="btn"> read more</Link>
    </div>

    <div className="box">
        <i className="fas fa-gas-pump"></i>
        <h3>oil change</h3>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis, nisi.</p>
        <Link to="#" className="btn"> read more</Link>
    </div>

    <div className="box">
        <i className="fas fa-headset"></i>
        <h3>24/7 support</h3>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis, nisi.</p>
        <Link to="#" className="btn"> read more</Link>
    </div>

</div>

</section>


        </div>
    )
}

export default Service
