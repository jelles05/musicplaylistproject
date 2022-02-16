import React from 'react'

const NavBarComponent = ({ id, playlistSelect, inputSearch, onClickSearch, onClickBrand }) => (
    <div>
        <nav className='navbar navbar-light bg-light justify-content-between' id={id}>
            <div id='brand-select'>
                <div className='navbar-brand' onClick={onClickBrand}>
                    <img className='play-button' src='https://www.pngall.com/wp-content/uploads/5/Play-Button-PNG.png' alt='play button' />
                </div>
                {playlistSelect}
            </div>
            <div id='search'>
                <form>
                    {inputSearch}
                </form>
                <button onClick={onClickSearch} className='btn btn-outline-info my-2 my-sm-0'>Search</button>
            </div>
        </nav>
    </div>
)

export default NavBarComponent
