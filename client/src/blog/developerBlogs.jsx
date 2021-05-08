import React, { Component } from 'react'

import axios, { base } from '../axios-pf'
import { motion } from 'framer-motion'

import Test from '../assets/test-img.png'

import DevCard from '../common/developerBlogCard'

import Loader from '../common/Loader'

function shuffle(array) {
    let i = array.length
  
    while (i !== 0) {
      let random = Math.floor(Math.random() * i)
      i--
      [array[i], array[random]] = [array[random], array[i]]
      
    }
  
    return array;
  }

class DeveloperBlogs extends Component {

    state = {
        banner : "",
        blogs : [],
        loading : true
    }

    // shuffle_array = array => {
        // for (let i = array.length - 1; i > 0; i--) {
        //     let j = Math.floor(Math.random() * (i + 1))
        //     [array[i], array[j]] = [array[j], array[i]]
        // }
    // }

    componentDidMount = async() => {
        window.scrollTo(0, 0)
        let { data:blogs } = await axios.get('/devblog')
        blogs = shuffle(blogs)
        this.setState({ blogs, loading : false })
    }
    

    render() {
        const blogs = this.state.blogs === undefined ? null : this.state.blogs
        const el = this.state.loading ? <Loader content="Loading..."/> : 
            <div className="row m-0">
                {blogs.map((m, key) => <DevCard key={key} title={m.cardtitle} content={m.content} date={m.publishedOn} slug={m.slug} card={base + m.cardBanner}/>)}
            </div>
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
                        {el}
                    </div>
                </div>
            </div>
        );
    }
}

export default DeveloperBlogs;