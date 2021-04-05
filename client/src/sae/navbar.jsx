import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import logo from './assets/logo.svg'

class Navbar extends Component {

    state = {

    }

    componentDidMount = async() => {
        
    }
    

    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <span class="navbar-brand">
                        <img src={logo} className="img img-fluid" alt="calces logo"/>
                    </span>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarText">
                        <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Product <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Contact</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Pricing</a>
                        </li>
                        </ul>
                        <span class="navbar-text">
                        Navbar text with an inline element
                        </span>
                    </div>
                    </nav>
            </div>
        );
    }
}

export default Navbar;