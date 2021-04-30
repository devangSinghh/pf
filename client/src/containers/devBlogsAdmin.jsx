import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import axios, { base } from '../axios-pf' 

import BlogEditor from '../blog/blogEditor'

class DevBlogsAdmin extends Component {

    state = {

    }

    componentDidMount = async() => {
        
    }
    

    render() {
        return (
            <div className="dev-blog-admin-container">
                <h3>Card details</h3>
                <div className="row m-0">
                    <div className="col-md-12 p-0 mb-3">
                        <TextField className="w-100" id="outlined-basic" label="Blog card title" variant="outlined" />
                    </div>
                    <div className="col-md-12 p-0 mb-3">
                        <TextField className="w-100" id="outlined-basic" label="Blog card author" variant="outlined" />
                    </div>
                    <div className="col-md-12 p-0 mb-3">
                        <Button variant="contained" color="primary" component="label">
                            Upload blog card image
                            <input type="file" hidden/>
                        </Button>
                    </div>
                    <div className="col-md-12 p-0 mb-3">
                        <TextField className="w-100" id="outlined-basic" multiline rows={10} label="Blog card content" variant="outlined" />
                    </div>
                </div>
                <h3>Blog details</h3>
                <div className="row m-0">
                    <div className="col-md-12 p-0 mb-3">
                            <Button variant="contained" color="primary" component="label">
                                Upload Blog Banner Image
                                <input type="file" hidden/>
                            </Button>
                        </div>
                    <BlogEditor/>
                    {/*  blogId={this.state.blog._id} savedContent={this.state.blog.blogEditorContent} blogName={this.state.blogName} */}
                </div>
            </div>
        );
    }
}

export default DevBlogsAdmin;