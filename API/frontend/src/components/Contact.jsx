import React, {memo} from 'react'

const Contact = () => {
    return (
            

            <section className="contact" id="contact">

            <h1 className="heading"><span>contact</span> us</h1>

            <div className="contact__wrapper">

                <iframe  title="locationMap"className="mymap" 
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3963.428075254387!2d3.346204775869908!3d6.593597853336253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sng!4v1649954913749!5m2!1sen!2sng"
                loading="lazy" ></iframe>
                <form action="">
                    <h3>get in touch</h3>
                    <input type="text" placeholder="your name" className="box"></input>
                    <input type="email" placeholder="your email" className="box"></input>
                    <input type="tel" placeholder="subject" className="box"></input>
                    <textarea placeholder="your message" className="box" cols="30" rows="10"></textarea>
                    <button type="submit" value="send message" className="btn">Send Message</button>
                </form>

            </div>

            </section>
    )
}

export default memo(Contact);
