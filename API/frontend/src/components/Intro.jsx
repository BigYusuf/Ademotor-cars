import React from 'react';
import { Link } from 'react-router-dom';

const Intro = () => {
    
    const mouseMove = (e) =>{
        document.querySelectorAll('.home-parallax').forEach(elm =>{
        let speed = elm.getAttribute('data-speed');
        let x = (window.innerWidth - e.pageX * speed) / 90;
        let y = (window.innerHeight - e.pageY * speed) / 90;
        elm.style.transform = `translateX(${y}px) translateY(${x}px)`;
        });
    };
    
    const mouseLeave = (e) =>{
        document.querySelectorAll('.home-parallax').forEach(elm =>{
        elm.style.transform = `translateX(0px) translateY(0px)`;
        });
    };

    return (
        <div>
                        
            <section className="home"onMouseLeave={mouseLeave} id="home"onMouseMove={mouseMove}>

            <h3 data-speed="-2" className="home-parallax">find your car</h3>

            <img data-speed="5" className="home-parallax" src="image/home-img.png" alt=""/>

            <Link to="/products" data-speed="7"  className="btn home-parallax" >explore cars</Link>

            </section>

            <section className="icons-container">

            <div className="icons">
                <i className="fas fa-home"></i>
                <div className="content">
                    <h3>150+</h3>
                    <p>branches</p>
                </div>
            </div>

            <div className="icons">
                <i className="fas fa-car"></i>
                <div className="content">
                    <h3>4770+</h3>
                    <p>cars sold</p>
                </div>
            </div>

            <div className="icons">
                <i className="fas fa-users"></i>
                <div className="content">
                    <h3>320+</h3>
                    <p>happy clients</p>
                </div>
            </div>

            <div className="icons">
                <i className="fas fa-car"></i>
                <div className="content">
                    <h3>1500+</h3>
                    <p>news cars</p>
                </div>
            </div>

            </section>

        </div>
    )
}

export default Intro
