import React from 'react';
import { Link } from 'react-router-dom';

import axios, { base } from '../axios-pf';

const WorkCard = props => {
    return (
        <div className="work-card">
            <img  style={{ pointerEvents:"none" }} src={base + 'add-project/' + props.image} className="work-img img img-fluid" alt=""/>
            <div className="work-card-content">
                <h6 className="work-card-heading mb-0">{props.title}</h6>
                <p className="work-card-desc">
                   {props.description}
                </p>
                <a style={{ textDecoration:"none" }} target="_blank" href={props.link}><h6 className="work-card-repo">Link<i className="pl-1 fa fa-external-link"></i></h6></a>
            </div>
        </div>
    );
}

export default WorkCard;