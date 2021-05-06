import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import fb from '../assets/socialmedialogo/fb.svg'
import insta from '../assets/socialmedialogo/insta.svg'
import tweet from '../assets/socialmedialogo/tweet.svg'
import glogo from '../assets/socialmedialogo/glogo.svg'
import lnkdn from '../assets/socialmedialogo/lnkdn.svg'

import sign from '../assets/sign.svg'

import Education from './education'
import About from './about'
import Interests from './Interests'
import Work from './work'
import Contact from './contact'

import axios, {base} from '../axios-pf';
import ReactGA from 'react-ga';
class Home extends Component {

    componentDidMount = async() => {
        const {data:recordIp} = await axios.get('/record-ip/add')
        const { data : csrf } = await axios.get('/csrf')
        console.log(csrf)
    }
    
    recordClicks = () => {
        ReactGA.event({
            category : 'B',
            action  : 'blog button'
        })
    }

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
                                <img style={{ pointerEvents:"none" }} src="https://i.imgur.com/UawpYk6.png" className="mx-auto img img-fluid text-center person_img" alt=""/>
                            </div>
                        </div>
                        .
                        <div className="row m-0 d-flex justify-content-center">
                            <img style={{ pointerEvents:"none" }} src={sign} className="m-2" alt=""/>
                            <Link to="/blogs" style={{ textDecoration:"none" }} onClick={this.recordClicks}><h5 className="m-2 blog-link">Visit the Blog</h5></Link>
                        </div>
                    </div>
                    <div className="home-right offset-md-3 col-md-6">
                        <About/>
                        <Education/>
                        <Interests/>
                        <Work/>
                        <Contact />
                        <div className="developer-section">
                            {/* <h6>The site is best viewed in Internet Explorer 9.0 +, Firefox 24+ or Chrome 33+.</h6> */}
                            <h6>Developed by Devang Singh</h6>
                            <h6><i className="fa fa-copyright pt-1" />&nbsp;{new Date().getFullYear()}&nbsp;thedevang.com</h6>
                        </div>
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