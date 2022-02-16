import React from 'react'

const SearchInputComponent = ({ id, name, placeholder, onChange }) => (
    <input
        type='search'
        name={name}
        id={id}
        placeholder={placeholder}
        className='form-control mr-sm-2'
        aria-label='Search'
        onChange={onChange}
    />
)

export default SearchInputComponent
