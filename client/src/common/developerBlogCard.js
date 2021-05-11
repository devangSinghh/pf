import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import Tooltip from '@material-ui/core/Tooltip'

const DevCard = props => {
    return ( 
        <div className="col-md-4 mt-3">
            <div className="d-blog-card m-2">
                <div>
                    <Link className="d-flex justify-content-center" to={'/blogs/' + props.slug}>
                    <img src={props.card} className="d-blog-card-img" alt=""/>
                    </Link>
                </div>
                    
                {/* </Link> */}
                <div>
                    <div className="row w-100 m-0 wrapper d-flex align-items-center">
                    <h5 className="d-blog-card-heading">{props.title}</h5>
                    <h6 className="blog-date d-flex justify-content-end">{props.date}</h6>
                </div>
                
                <p className="text-left hidden-with-shadow d-blog-card-text">
                    {props.content}
                </p>
                </div>
                {/* } /> */}
                <Link to={'/blogs/' + props.slug}>
                    <div style={{textTransform: 'none'}} className="read-more">
                        <Tooltip title="Open blog" aria-label="add">
                            {/* <IconButton aria-label="blog title"> */}
                                {/* <ArrowRightAltIcon/> */}
                                <div className="read-b-btn">Read <ArrowRightAltIcon/> </div>
                            {/* </IconButton> */}
                        </Tooltip>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default DevCard