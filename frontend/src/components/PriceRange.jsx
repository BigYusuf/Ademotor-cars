import React from 'react'

const PriceRange = () => {
    return (
        <div className="price__wrapper">
            <h2>Price Range</h2>
            <p>Use slider or enter min and max price </p>
            <div className="price_input">
                <div className="input__field">
                    <span>Min</span>
                    <input type="text" className="input__min" />
                </div>
                <div className="seperator">-</div>
                <div className="input__field">
                    <span>Max</span>
                    <input type="text" className="input__min" />
                </div>
                <div className="slider">
                    <div className="progress"> </div>
                </div>

            </div>
        </div>
    )
}

export default PriceRange
