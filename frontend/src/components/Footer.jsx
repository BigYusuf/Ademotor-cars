import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <section className="footer" id="footer">

<div className="box-container">

    <div className="box">
        <h3>our branches</h3>
        <Link to="#"> <i className="fas fa-map-marker-alt"></i> ikeja </Link>
        <Link to="#"> <i className="fas fa-map-marker-alt"></i> idumota </Link>
        <Link to="#"> <i className="fas fa-map-marker-alt"></i> alaba </Link>
        <Link to="#"> <i className="fas fa-map-marker-alt"></i> Ibadan </Link>
        <Link to="#"> <i className="fas fa-map-marker-alt"></i> port-Harcourt </Link>
    </div>

    <div className="box">
        <h3>quick links</h3>
        <Link to="#"> <i className="fas fa-arrow-right"></i> home </Link>
        <Link to="#"> <i className="fas fa-arrow-right"></i> vehicles </Link>
        <Link to="#"> <i className="fas fa-arrow-right"></i> services </Link>
        <Link to="#"> <i className="fas fa-arrow-right"></i> featured </Link>
        <Link to="#"> <i className="fas fa-arrow-right"></i> reviews </Link>
        <Link to="#"> <i className="fas fa-arrow-right"></i> contact </Link>
    </div>

    <div className="box">
        <h3>contact info</h3>
        <Link to="#"> <i className="fas fa-phone"></i> +123-456-7890 </Link>
        <Link to="#"> <i className="fas fa-phone"></i> +111-222-3333 </Link>
        <Link to="#"> <i className="fas fa-envelope"></i> mystik5551@gmail.com </Link>
        <Link to="#"> <i className="fas fa-map-marker-alt"></i> Lagos, Nigeria</Link>
    </div>

    <div className="box">
        <h3>contact info</h3>
        <Link to="#"> <i className="fab fa-facebook-f"></i> facebook </Link>
        <Link to="#"> <i className="fab fa-twitter"></i> twitter </Link>
        <Link to="#"> <i className="fab fa-instagram"></i> instagram </Link>
        <Link to="#"> <i className="fab fa-linkedin"></i> linkedin </Link>
        <Link to="#"> <i className="fab fa-pinterest"></i> pinterest </Link>
    </div>

</div>

<div className="credit"> created by Yusufff | all rights reserved </div>

</section>










        </div>
    )
}

export default Footer
