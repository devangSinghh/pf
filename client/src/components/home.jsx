import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fb from '../assets/socialmedialogo/fb.svg'
import insta from '../assets/socialmedialogo/insta.svg'
import tweet from '../assets/socialmedialogo/tweet.svg'
import glogo from '../assets/socialmedialogo/glogo.svg'
import lnkdn from '../assets/socialmedialogo/lnkdn.svg'

import sign from '../assets/sign.svg'

//My image
import my_image from '../assets/person_img1.png'

import Education from './education'
import About from './about'
import Interests from './Interests'
import Work from './work'
import Contact from './contact'

class Home extends Component {
    render() {
        return (
            <div className="container-fluid p-0">
                <div className="row m-0">
                    <div className="home-left col-md-3">
                        <div className="heading-container">

                            <h5 className="main-heading">Hi,</h5>
                            <h5 className="main-heading">I'm Devang</h5>

                            <h6>Fullstack developer</h6>

                            <div className="social-media">
                                <a href="https://www.facebook.com/profile.php?id=100005032994738" target="_blank"><img style={{ pointerEvents:"none" }} className="pr-2" src={fb} alt=""/></a>
                                <a href="https://www.instagram.com/dev___ang/" target="_blank"><img style={{ pointerEvents:"none" }} className="p" src={insta} alt=""/></a>
                                <a href="https://www.linkedin.com/in/devang-singh-ab2124168/" target="_blank"><img style={{ pointerEvents:"none" }} className="pl-2" src={lnkdn} alt=""/></a>
                                <a href="https://github.com/Luffy-webdev" target="_blank"><img style={{ pointerEvents:"none" }} className="pl-2" src={glogo} alt=""/></a>
                            </div>

                            <div className="row m-0 d-flex justify-content-center">
                                <img style={{ pointerEvents:"none" }} src={my_image} className="mx-auto img img-fluid text-center person_img" alt=""/>
                            </div>
                        </div>
                        .
                        <div className="row m-0 d-flex justify-content-center">
                            <img style={{ pointerEvents:"none" }} src={sign} className="m-2" alt=""/>
                            <Link to="blog" style={{ textDecoration:"none" }}><h5 className="m-2 blog-link">Visit the Blog</h5></Link>
                        </div>
                    </div>
                    <div className="home-right offset-md-3 col-md-6">
                        <About/>
                        <Education/>
                        <Interests/>
                        <Work/>
                        <Contact />
                        <h6 className="developer-section">Developed by Devang Singh</h6>
                    </div>
                    <div className="col-md-3">
                        {/* Blogs */}
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Home;