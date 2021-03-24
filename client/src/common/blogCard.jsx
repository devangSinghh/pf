import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {base} from '../axios-pf';
import { Timeline, Divider } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

const BlogCard = props => {
    return (
        <div className="mt-5">
            <Link to={"/blogs/" + props.slug}>
                <img src={props.image} className="blog-card-image img img-fluid" alt=""/>
            </Link>
            <h5 className="blog-card-initial-line" style={{ color:`${props.color}`, opacity:0.7 }}>{props.blogInitialLine}</h5>
            <h5 className="blog-card-title">{props.name}</h5>
            <h5 className="text-center blog-author"><span><i class="fa pr-1 fa-user-circle"></i>{props.author}</span>&nbsp;/&nbsp;<span>{props.publishedOn}</span></h5>
            <h6 className="blog-card-content mt-3">{props.desc}</h6>
            <div className="blog-card-end-line"></div>
            {/* <div className="container_blog_story">
            <Timeline>
                <Timeline.Item>
                <h1>{props.name}</h1>
                <h6>Published on {props.publishedOn}</h6>
                <h6>{props.author} [@{props.instaid}]</h6>
                <img src={props.image} className="blog-card-image img img-fluid" alt=""/>
                <div className="row">
                    <div className="col blog_story_section">
                    {props.desc}
                    </div>
                </div>
                <a href={base + 'blogs/' + props.slug}><h6 className="read-more">Read more...</h6></a>
                </Timeline.Item>
                <Timeline.Item></Timeline.Item>
            </Timeline>
        </div> */}
        </div>
    );
}

export default BlogCard;