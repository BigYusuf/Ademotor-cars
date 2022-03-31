import React, { useState } from 'react'




const Search = ({history}) => {
    const [keyword, setKeyword] = useState()
    function searchHandler(e){
        e.preventDefault();
        if(keyword.trim()){
            history.push(`/products/search/${keyword}`)
        }else{
            history.push(`/`)
        }
    }
    return (
        <form onSubmit={searchHandler}>
            <div className="search__container">
                <input type='text' className="search__input"
                id="search__input" 
                placeholder='Enter Product Name....'
                onChange={(e)=> setKeyword(e.target.value)}
                 />
                <div className="search__button__wrapper">
                    <button type='submit' className="search__button">

                    </button>
                </div>
            </div>
        </form>
    )
}

export default Search
