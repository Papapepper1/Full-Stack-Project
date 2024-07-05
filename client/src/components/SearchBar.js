// SearchBar.js
import React, { useState } from 'react';
import './SearchBar.css';


const SearchBar = ({ handleSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSearch(query);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch(query);
        }
    };

    return (
        <div className="SearchBar">       
            <input type="text" value={query} onChange={handleChange} placeholder="Search by title and hit enter..." onKeyDown={handleKeyDown}/>
        </div>
    );
};

export default SearchBar;
