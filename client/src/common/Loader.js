import React from 'react'
import loader from '../assets/loader.svg'

const Loader = props => {
    return (
        <div style={{ width:props.width, height : props.height }} className="d-flex flex-column align-items-center justify-content-center">
            <img src={loader} style={{ pointerEvents : 'none' }}/>
            <h6 style={{ fontFamily:'Sailec' }}>{props.content}</h6>
        </div>
    )
}

export default React.memo(Loader)