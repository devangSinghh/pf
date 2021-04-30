import React, { Component } from 'react'
import DevCard from '../common/developerBlogCard'
import axios, { base } from '../axios-pf'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import RippleButton from '../common/Ripple'
import useLongPress from '../common/uselongPress'

import Test from '../assets/test-img.png'

class DeveloperBlogs extends Component {

    state = {
        banner : "",
        blogs : []
    }

    componentDidMount = async() => {
        const { data:blogs } = await axios.get('/dev/blogs')
        this.setState({ blogs })
    }
    

    render() {

        const blogs = this.state.blogs === undefined ? null : this.state.blogs
        return (
            <div className="container-fluid p-0">
                <div className="row m-0 no-gutters">
                    <div className="d-blog-left col-md-3">
                        <h6 className="main-badge">Developers. Blog</h6>
                        <h2 className="main-heading">
                            Find a new source of knowledge for yourself
                        </h2>
                        <h6 className="main-content">Stay tuned for updates</h6>
                    </div>
                    <div className="d-blog-right offset-md-3 col-md-9">
                        <div className="row m-0">
                            <div className="col-md-4">
                                <div className="d-blog-card">
                                    <img src={Test} className="d-blog-card-img" alt=""/>
                                    <div className="row m-0 wrapper d-flex align-items-center">
                                        <h5 className="d-blog-card-heading">wewefdsf</h5>
                                        <h6 className="blog-date d-flex justify-content-end">Apr 28, 2021</h6>
                                    </div>
                                    <RippleButton children={<p className="text-left hidden-with-shadow d-blog-card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                        Eum soluta assumenda culpa commodi dolorem totam unde, impedit accusantium a 
                                        recusandae illo ullam delectus quisquam odio tempore quae quas aliquam maiores.
                                    </p>} />
                                    <h6 className="read-more">Read more...</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeveloperBlogs;