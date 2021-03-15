import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios, { base } from '../axios-pf';

import BlogCard from '../common/blogCard'

class Blog extends Component {

    state = {
        blogs : []
    }

    componentDidMount = async() => {
        const { data : blogs } = await axios.get(base + 'add-blog');
        this.setState({ blogs })
    }

    render() {

        const blogs = this.state.blogs === undefined ? null : this.state.blogs

        return (
            <div className="container-fluid p-0">
            <div className="row m-0">
                <div className="home-left col-md-3">
                    <div className="heading-container">

                        <h5 className="main-heading">Welcome</h5>
                        <h5 className="main-heading">to the Blogs</h5>

                    </div>

                    <div className="row m-0 d-flex justify-content-center">
                        <Link to="/" style={{ textDecoration:"none" }}>
                            <h5 className="mr-5 blog-link"><i className="fa fa-arrow-left"></i> Back to home</h5>
                        </Link>
                    </div>
                    <div className="text-center">
                        <a href="/admin/#write-a-blog"><button className="make-blog-button">Write a blog</button></a>
                    </div>
                </div>
                <div className="home-right offset-md-3 col-md-5">

                    <div className="row m-0">
                        {blogs.map(m => 
                                <BlogCard
                                image = {base + 'blog/' + m.blogcardImgRoute}
                                name = {m.name}
                                desc = {m.desc}
                                author = {m.author}
                                instaid = {m.instaid}
                                publishedOn={m.publishedOn}
                                slug={m.slug}
                                /> 
                        )}
                    </div>
                    
                </div>
            </div>
            
        </div>
        );
    }
}

export default Blog;