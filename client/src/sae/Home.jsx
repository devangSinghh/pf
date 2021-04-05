import React, { Component } from 'react'

import Navbar from './Navbar'
import Footer from './Footer'
import axios, {base} from '../axios-pf'

import { Link } from 'react-router-dom'

import { motion } from 'framer-motion'


class Home extends Component {

    state = {

    }

    componentDidMount = async() => {
        
    }


    

    render() {
        return (
            <div className="container-fluid p-0">
                <Navbar/>
            </div>
        );
    }
}

export default Home;