import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { TextField, InputAdornment, IconButton } from "@material-ui/core"
import {Visibility, VisibilityOff } from '@material-ui/icons'
import CheckIcon from '@material-ui/icons/Check'
import Cookies from 'js-cookie'
import axios, {base} from '../axios-pf'

class Register extends Component {

    state = {
        data : {
            username : "",
            password : "",
            confirmPass : "",
            csrf : ""
        },
        showpass : false,
        passmatch : false,
        result : ''
    }

    initial_state = this.state

    componentDidMount = async() => {
        const {data : csrf} = await axios.get('/csrf')
        this.setState({ csrf : csrf })
    }

    handleSubmit = async() => {
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
            password : data.password,
            csrf : this.state.csrf
        }
        const { data : result } = await axios.post('/auth/register', payload)
        this.setState({ result })   
        // this.setState(this.initial_state)
    }

    showpass = () => { this.setState({ showpass :!this.state.showpass }) }
    
    onMouseDown = () => { this.setState({ showpass :!this.state.showpass }) }

    handleChange = e => {
        const value = e.target.value
        const name = e.target.name
        const data = {...this.state.data}
        data[name] = value

        if(data.confirmPass.length !== data.password.length) {
            this.setState({ passmatch : false })
        }

        if(data.confirmPass.length !==0 && data.confirmPass === data.password) {
            this.setState({ passmatch : true })
        }
        this.setState({ data })
    }
    

    render() {
        const r = this.state.result
        return (
            <div className="container">
                <div className="row m-0 mt-4 p-3 border rounded">
                    <h4 style={{ fontFamily:'Sailec' }}>Register new Admin</h4>
                    <div className="p-0 col-md-12 mt-3">
                        <TextField required className="w-100" id="username" variant="outlined" label="username" onChange={this.handleChange} name="username" value={this.state.data.username}/>
                    </div>
                    <input id="csrf-field" type="hidden" name="csrf" value={this.state.csrf}/>
                    <div className="p-0 col-md-12 mt-3">
                        <TextField className="w-100" id="password" variant="outlined" 
                        type={this.state.showpass ? 'text' : 'password'} 
                        required
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={this.showpass}
                                  onMouseDown={this.onMouseDown}
                                >
                                  {this.state.showpass ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        label="password" onChange={this.handleChange} 
                        name="password" value={this.state.data.password}/>
                    </div>
                    <div className="p-0 col-md-12 mt-3">
                        <TextField className="w-100" 
                        id="confirmPass" variant="outlined" type="password" label="confirm password" 
                        onChange={this.handleChange} name="confirmPass" 
                        required
                        value={this.state.data.confirmPass}
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                //   aria-label="toggle password visibility"
                                //   onClick={this.showpass}
                                //   onMouseDown={this.onMouseDown}
                                >
                                  {this.state.passmatch ? <CheckIcon style={{ color: 'green' }} /> : <div/>}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                    </div>
                    <Button disabled={this.state.data.username.length === 0 || this.state.data.password.length === 0} variant="contained" className="mt-3" color="primary" onClick={this.handleSubmit}>Register Admin</Button>
                </div>
                <p style={{ color:r.includes('exists') ? 'red' : 'green', fontFamily:"Sailec" }}>{r}</p>
            </div>
        );
    }
}

export default Register;