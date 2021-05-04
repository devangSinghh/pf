import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import moment from 'moment';
import axios, { base } from '../axios-pf' 

import Cookies from 'js-cookie'

class DevBlogsAdmin extends Component {

    state = {
        blog : [],
        data : {
            devblogtitle : "",
            author : "",
            content : "",
            devblogfile : null,
            blogBanner : null
        },
        blogAdded : false
    }

    componentDidMount = async() => {
        
    }

    handleChange = ({ currentTarget : input }) => {
        const data = {...this.state.data};
        data[input.name] = input.value;
        if(input.type === 'file')data[input.name] = input.files[0]
        this.setState({ data });    
    }

    AddDevBlog = async(e) => {

        e.preventDefault()
        
        const data = this.state.data

        const payload = new FormData() 

        payload.append('devblogfile', data.devblogfile)
        payload.append('devblogtitle', data.devblogtitle)
        payload.append('content', data.content)
        payload.append('author', data.author)
        payload.append('publishedOn', moment().format("DD.MM.yyyy"))

        const config = { headers: { 'content-type': 'multipart/form-data' } }

        const { data : resp } = await axios.post('devblog', payload, config)
        
        this.setState({ blog : resp, blogAdded : true })

        return <Redirect to="/d/blogs"/>
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

    

    render() {
        const blog = this.state.blog === undefined ? null : this.state.blog
        const data = this.state.data

        if(Cookies.get('admin') === undefined) {
            return <Redirect to="/login" />
        }

        if(this.state.blogAdded) {
            return <Redirect to={"/d/blogs/" + blog.name}/>
        }
        return (
            <div className="dev-blog-admin-container">
                <h3>Card details</h3>
                <div className="row m-0">
                    <div className="col-md-12 p-0 mb-3">
                        <TextField name="devblogtitle" value={data.devblogtitle} onChange={this.handleChange} className="w-100" id="outlined-basic" label="Blog card title" variant="outlined" />
                    </div>
                    <div className="col-md-12 p-0 mb-3">
                        <TextField name="author" value={data.author} onChange={this.handleChange} className="w-100" id="outlined-basic" label="Blog card author" variant="outlined" />
                    </div>
                    <div className="col-md-12 p-0 mb-3">
                        <Button variant="contained" color="primary" component="label">
                            Upload blog card image
                            <input type="file" name="devblogfile" onChange={this.handleChange} hidden/>
                        </Button>
                    </div>
                    <div className="col-md-12 p-0 mb-3">
                        <TextField name="content" onChange={this.handleChange} value={data.content} className="w-100" id="outlined-basic" multiline rows={10} label="Blog card content" variant="outlined" />
                    </div>
                    <Button onClick={this.AddDevBlog} variant="outlined">Save</Button>
                </div>
            </div>
        );
    }
}

export default DevBlogsAdmin;