import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import Cookies from 'js-cookie'

import axios, {base} from '../axios-pf'

class Login extends Component {

    state = {
        data : {
            username : "",
            password : ""
        }
    }

    componentDidMount = async() => {
        
    }

    handleSubmit = async e => {
        const data = this.state.data
        const payload = {
            username : data.username,
            password : data.password
        }

        const { data : res } = await axios.post('/auth/login', payload)
        Cookies.set('admin', res.user, { expires: 2 })
        Cookies.set('session_id', res.session_id, { expires: 2 })
        window.location.reload(false)
    }

    handleChange = e => {
        const value = e.target.value
        const name = e.target.name
        const data = {...this.state.data}
        data[name] = value
        this.setState({ data })
    }
    

    render() {

        if (Cookies.get('session_id') && Cookies.get('session_id').length !== 0 && Cookies.get('admin') && Cookies.get('admin').length !== 0) 
            return <Redirect to="/d/admin"/>

        return (
            <div className="container">
                <div className="row m-0 mt-4 p-3 border rounded">
                    <h4 style={{ fontFamily:'Sailec' }}>Login to make changes</h4>
                    <div className="p-0 col-md-12 mt-3">
                        <TextField className="w-100" variant="outlined" label="username" onChange={this.handleChange} name="username" value={this.state.data.username}/>
                    </div>
                    <div className="p-0 col-md-12 mt-3">
                        <TextField className="w-100" variant="outlined" label="password" onChange={this.handleChange} name="password" value={this.state.data.password}/>
                    </div>
                    <Button variant="contained" className="mt-3" color="primary" onClick={this.handleSubmit}>Login</Button>
                </div>
                
            </div>
        );
    }
}

export default Login;