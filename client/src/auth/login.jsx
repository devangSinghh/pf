import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import Cookies from 'js-cookie'

import axios, {base} from '../axios-pf'
import CsrfProtect from '../common/csrf'

class Login extends Component {

    state = {
        data : {
            username : "",
            password : "",
            csrfVal : ""
        },
        csrf : '',
        logStatus : true,
    }

    initial_state = this.state

    componentDidMount = async() => {
        const {data : _csrfToken} = await axios.get('/get-csrf')
        axios.defaults.headers.post['X-XSRF-TOKEN'] = _csrfToken
        this.setState({ csrf : _csrfToken.csrfToken })
    }

    handleSubmit = async e => {

        const csrf_input_field = document.getElementById('csrf-field')
        const csrf_value = csrf_input_field.getAttribute('value')
        //check for csrf attacks
        if (csrf_value !== this.state.csrf) {
            this.setState({ logStatus : false })
            return //if both tokens don't match then return the function
        }
        const data = this.state.data
        
        const payload = {
            username : data.username,
            password : data.password
        }

        const { data : res } = await axios.post('/auth/login', payload)
        Cookies.set('admin', res.user, { expires: 2 })
        Cookies.set('session_id', res.session_id, { expires: 2 })
        // window.location.reload(false)
        this.setState(this.initial_state)
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
                    <input id="csrf-field" type="hidden" name="csrf" value={this.state.csrf}/>
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