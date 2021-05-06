import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import axios, { base } from '../axios-pf';
import moment from 'moment';
import Cookies from 'js-cookie';

class Management extends Component {

    state = {
        dateContext: moment(),
        data : {
            name : "",
            initialLine : "",
            desc : "",
            repo : "",
            blogname:"",
            blogdesc : "",
            author:"",
            instaid : "",
            file : null,
            blogfile : null
        }
    }

    handleChange = ({ currentTarget : input }) => {
        const data = {...this.state.data};
        data[input.name] = input.value;
        if(input.type === 'file')data[input.name] = input.files[0]
        this.setState({ data });    
    }

    handleSubmit = async e => {  
        e.preventDefault();

        const data = this.state.data
        const payload = new FormData() 
        payload.append('file', data.file)
        payload.append('name', data.name)
        payload.append('desc', data.desc)
        payload.append('repo', data.repo)

        const config = { headers: { 'content-type': 'multipart/form-data' } }
        const { data : uploadRes } = await axios.post(base + 'add-project', payload, config );

    }

    resetFileInputs = () => {
        this.setState({ data : { file : null } })
    }

    deleteThisFile = (e, name, index) => {
        const currentFile = [...this.state.data.file]
        if (this.state.data.file === null) {
            return;
        }
        else {
            currentFile.splice(index, 1);
            this.setState({ data : { file : currentFile } })
        }
    }

    AddABlog = async(e) => {

        e.preventDefault()
        
        const data = this.state.data

        const payload = new FormData() 

        payload.append('blogfile', data.blogfile)
        payload.append('blogname', data.blogname)
        payload.append('initialLine', data.initialLine)
        payload.append('blogdesc', data.blogdesc)
        payload.append('author', data.author)
        payload.append('instaid', data.instaid)
        payload.append('publishedOn', moment().format("DD.MM.yyyy"))

        const config = { headers: { 'content-type': 'multipart/form-data' } }

        const { data : resp } = await axios.post(base + 'add-blog', payload, config)

        return <Redirect to="/blog"/>
    }


    render() {

        const fileDetails = this.state.data.file === null ? null : <div>
            {this.state.data.file.name}
            <i onClick={this.resetFileInputs} className="fa fa-times" />
        </div>

        if(!Cookies.get('admin')) return <Redirect to="/login"/>

        // const blogFileDetails = this.state.data.blogfile === null ? null : <div>
        //     {this.state.data.blogfile.name}
        //     <i onClick={this.resetFileInputs} className="fa fa-times" />
        // </div>


        return (
            <div>
                <div className="row m-0">
                    <div className="col-md-6">
                        <form>
                            <div className="add-project-form container">
                                <h5 className="mb-5">ADD PROJECT</h5>
                                <div className="wrapper mb-5">
                                    <input type="text" name="name" id="name" required="true" onChange={this.handleChange}/>
                                    <div className="placeholder">Project Name</div>
                                </div>
                                <div className="d-flex flex-column mb-5">
                                    <label htmlFor="desc">Project description</label>
                                    <textarea className="col-md-6" rows="12" type="text" name="desc" id="desc" required="true" onChange={this.handleChange}/>
                                </div>
                                <div className="wrapper mb-5">
                                    <input style={{ width:"50%" }} type="text" name="repo" id="repo" required="true" onChange={this.handleChange}/>
                                    <div className="placeholder">Github repo link</div>
                                </div>
                                <div className="upload-file-wrapper">
                                    <input name="file" id="file" type="file" onChange={this.handleChange}/>
                                    <label htmlFor="file" className="upload-file-button">
                                        Upload project image
                                    </label>
                                    {fileDetails}
                                </div>
                                <button onClick={this.handleSubmit} className="mt-2 submit-button">Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-6">
                        {/*Write a blog*/}
                        <div id="write-a-blog" className="container">
                            <h5 className="mt-5 mb-5">WRITE A BLOG</h5>
                            <div className="wrapper mb-5">
                                <input style={{ width:"60%" }} type="text" name="blogname" id="blogname" required="true" onChange={this.handleChange}/>
                                <div className="placeholder">Blog Name</div>
                            </div>
                            <div className="wrapper mb-5">
                                <input style={{ width:"60%" }} type="text" name="initialLine" id="initialLine" required="true" onChange={this.handleChange}/>
                                <div className="placeholder">Blog initial line</div>
                            </div>
                            <div className="d-flex flex-column mb-5">
                                    <label htmlFor="desc">Blog description</label>
                                    <textarea
                                    style={{ resize:"none" }} 
                                    placeholder="only a small description, just to display in blog card"
                                    className="col-md-6" rows="6" type="text" 
                                    name="blogdesc" id="blogdesc" required="true" onChange={this.handleChange}/>
                                </div>
                            <div className="wrapper mb-5">
                                <input style={{ width:"60%" }} type="text" name="author" id="author" required="true" onChange={this.handleChange}/>
                                <div className="placeholder">author Name</div>
                            </div>
                            <div className="wrapper mb-5">
                                <input style={{ width:"60%" }} type="text" name="instaid" id="instaid" required="true" onChange={this.handleChange}/>
                                <div className="placeholder">author insta id</div>
                            </div>

                            <h5>Blog card image</h5>
                            <div className="upload-file-wrapper">
                                    <input name="blogfile" id="blogfile" type="file" onChange={this.handleChange}/>
                                    <label htmlFor="blogfile" className="upload-file-button">
                                        Upload blog card image
                                    </label>
                                    {/* {blogFileDetails} */}
                                </div>

                            <button className="mt-3" onClick={this.AddABlog}>Create blog</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Management;