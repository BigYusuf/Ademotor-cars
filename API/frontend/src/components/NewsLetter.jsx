import React, {memo} from 'react'

const NewsLetter = () => {
    return (
        <section className="newsletter">

        <h3>subscribe for latest updates</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, suscipit.</p>

        <form action="">
            <input type="email" placeholder="enter your email"></input>
            <input type="submit" value="subscribe"></input>
        </form>

        </section>
    )
}

export default memo(NewsLetter)
