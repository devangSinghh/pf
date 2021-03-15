import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Timeline, Divider } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

const BlogCard = props => {
    return (
        <div className="mt-5">
            {/* <img src={props.image} className="blog-card-image img img-fluid" alt=""/>
            <h5 className="blog-card-title">{props.name}</h5>
            <h6 className="blog-card-content">{props.desc}</h6>
            <h6 className="blog-author">{props.author}</h6>
            <h6 className="blog-author-id">@{props.instaid}</h6>
            <h6 className="read-more">Read more</h6> */}

            <div className="container_blog_story">
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
                <Link to={'/blogs/' + props.slug}><h6 className="read-more">Read more...</h6></Link>
                </Timeline.Item>
                <Timeline.Item></Timeline.Item>
            </Timeline>
        </div>
        </div>
    );
}

export default BlogCard;