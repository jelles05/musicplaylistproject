import React from 'react'

function doLi (track, index, onClickAdd) {
    return (
        <li className='list-group-item list-group-item-success' key={index}>
            <div>{track.title}</div>
            <div id={index} onClick={onClickAdd}>
                {!track.isChecked ? <i className='fa fa-plus' /> : <i className='fa fa-check' />}
            </div>
        </li>
    )
}

const DetailResultVideoComponent = ({ listTracks, onClickAdd }) => (
    <ul className='list-group'>
        {listTracks.map((track, index) => doLi(track, index, onClickAdd))}
    </ul>
)

export default DetailResultVideoComponent
