import React, { Component } from 'react';

import axios, { base } from '../axios-pf';

class Management extends Component {

    state = {
        data : {
            name : "",
            desc : "",
            repo : "",
            file : null
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

        const payload = new FormData() 
        payload.append('file', this.state.data.file)
        payload.append('name', this.state.data.name)
        payload.append('desc', this.state.data.desc)
        payload.append('repo', this.state.data.repo)

        const config = { headers: { 'content-type': 'multipart/form-data' } }
        const { data : uploadRes } = await axios.post(base + 'add-project', payload, config );

        console.log(uploadRes)
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

        const fileDetails = this.state.data.file === null ? null : <div>
            {this.state.data.file.name}
            <i onClick={this.resetFileInputs} className="fa fa-times" />
        </div>

        return (
            <div>
                <form>
                    <div className="add-project-form container">
                        <h5 className="mb-5">Add Project</h5>
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
        );
    }
}

export default Management;