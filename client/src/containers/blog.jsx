import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios, { base } from '../axios-pf';

import BlogCard from '../common/blogCard'

class Blog extends Component {

    state = {
        blogs : [],
        loadingBlogs : true
    }

    componentDidMount = async() => {
        const { data : blogs } = await axios.get('add-blog');
        this.setState({ blogs, loadingBlogs : false })
    }

    render() {

        const blogs = this.state.blogs === undefined ? null : this.state.blogs

        const el = this.state.loadingBlogs === true ? 
        <div style={{ height:"70vh", color:"grey" }} 
        className="d-flex justify-content-center align-items-center">
            <h3>loading Blogs...</h3>
        </div>
        :
        <div className="row m-0">
                        {blogs.map((m, key) => 
                                <div className="col-md-5">
                                    <BlogCard
                                    key={key}
                                    image = {base + 'blog/' + m.blogcardImgRoute}
                                    name = {m.name}
                                    desc = {m.desc}
                                    author = {m.author}
                                    instaid = {m.instaid}
                                    publishedOn={m.publishedOn}
                                    slug={m.slug}
                                    blogInitialLine={m.blogInitialLine}
                                    color={m.color}
                                    /> 
                                </div>
                        )}
                    </div>

        return (
            <div className="blog-container container-fluid p-0">
            <div className="row m-0">
                <div className="blog-left col-md-3">
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
                        {/* <a href="/admin/#write-a-blog"><button className="make-blog-button">Write a blog</button></a> */}
                    </div>
                </div>
                <div className="home-right offset-md-3">

                    {el}

                </div>


            </div>
            
        </div>
        );
    }
}

export default Blog;