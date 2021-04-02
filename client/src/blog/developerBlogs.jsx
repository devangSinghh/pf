import React, { Component } from 'react'
import DevCard from '../common/developerBlogCard'
import axios, { base } from '../axios-pf'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

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
                <img src="" alt="developer blogs banner image"/>
            </div>
        );
    }
}

export default DeveloperBlogs;