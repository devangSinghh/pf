import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import mansvg from '../assets/man-svg.svg';

import axios, { base } from '../axios-pf';

class ShowcaseBlog extends Component {

    state = {
        data : {
            name : "",
            email : "",
            blogCategory : "",
            instaid : "",
            query : ""
        }
    }

    handleChange = ({currentTarget:input}) => {
        const data = {...this.state.data};   
        data[input.name] = input.value;
        if(input.name === 'file')data[input.name] = input.files[0]
        this.setState({ data });
    };

    handleSubmit = async e => {
        e.preventDefault();

        const data = this.state.data

        const payload = {
            name : data.name,
            email : data.email,
            blogCategory : data.blogCategory,
            instaid:data.instaid,
            query : data.query
        }

        const { data : res } = await axios.post('/showcase-blog-request', payload)
    }

    render() {
        return (
            <div className="container">
                <form className="showcase-blog-form">
                    <h3 className="main-heading text-center mt-3 mb-4">Blogs are a great way to showcase yourself</h3>
                    <img src={mansvg} className="showcase-image mt-2 d-flex justify-content-center img img-fluid mx-auto" alt=""/>
                    <div className="row d-flex justify-content-center m-0">

                        <div className="mt-5 col-md-4 d-flex justify-content-center">
                            <div className="wrapper mb-5">
                                <input type="text" name="name" id="name" required="true" onChange={this.handleChange}/>
                                <div className="placeholder">Your Name</div>
                            </div>
                            
                        </div>
                        <div className="mt-5 col-md-4 d-flex justify-content-center">
                        <div className="wrapper mb-5">
                                <input type="text" name="email" id="email" required="true" onChange={this.handleChange}/>
                                <div className="placeholder">Your email</div>
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center m-0">
                        <div className="mt-5 col-md-4 d-flex align-items-center justify-content-center flex-column ">
                            <div className="wrapper ">
                                <input type="text" name="blogCategory" id="blogCategory" required="true" onChange={this.handleChange}/>
                                <div className="placeholder">Blog category</div>
                            </div>
                            <p style={{ fontSize:"12px", color:"#0A8670", fontWeight:"600" }}>for eg. travel, food, automotive, coding <br/> or any personal experience</p>
                            
                        </div>
                        <div className="mt-5 col-md-4 d-flex align-items-center justify-content-center flex-column">
                            <div className="wrapper">
                                <input type="text" name="instaid" id="instaid" required="true" onChange={this.handleChange}/>
                                <div className="placeholder">Your instagram id</div>
                            </div>
                            <p style={{ fontSize:"12px", color:"#0A8670", fontWeight:"600" }}>if you don't have insta id, no problem<br/> facebook or twitter id will also work.
                            <br/>In case of facebook, copy your profile link<br/>If you don't have any paste your email id
                            </p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center flex-column align-items-center row m-0">
                        <textarea 
                         className="general-query-area"
                         style={{ resize:"none", width:"60%" }}
                         name="query" id="query" 
                         placeholder="if you have any general query, don't think much just post it !"
                         rows="7"
                         onChange={this.handleChange} 
                         />
                         <p style={{ fontSize:"12px", fontWeight:"600", textAlign:"center" }}>i will contact you within working days regarding your blog</p>
                    </div>
                    
                    <div className="text-center submit-button">
                        <button onClick={this.handleSubmit}>Submit</button>
                    </div>
                </form>
                <Link style={{ fontSize:"12px", color:"grey", textDecoration:"none" }} to="/"><h6 className="">Back to home</h6></Link>
            </div>
        );
    }
}

export default ShowcaseBlog;