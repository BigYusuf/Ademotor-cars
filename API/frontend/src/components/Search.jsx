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
                <button type='submit' className="search__button">
                    Search
                </button>
            </div>
        </form>
    )
}

export default Search
