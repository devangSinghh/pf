import React, { Component } from 'react';
import Gears from '../sae/gears'
import Shaft from '../sae/Shafts'
import Docs from '../sae/Docs'

import gicon from '../assets/icons/gear.svg'
import sicon from '../assets/icons/shaft.svg'
import dicon from '../assets/icons/docs.svg'
import logo from '../assets/icons/logo.svg'

import { motion } from 'framer-motion'

// import Curve from '../sae/Curve'
class SAEcontainer extends Component {
    
    state = {
        page : "Gears"
    }

    changePage = e => {
        const name = e.target.getAttribute("name")
        this.setState({ page : name })
    }

    links = [
        {
            name : "Docs",
            icon:'file'
        },
        {
            name : "Gears",
            icon:'cog'
        },
        {
            name : "shaft",
            icon : 'shaft'
        },
    ]
    
    render() {
        const page = this.state.page
        return (
            <div style={{ backgroundColor:"#001015" }} className="row m-0">
                <motion.div initial={{ left:-100 }} animate={{ left:0 }} transition={{ duration: 0.3 }} className="col-md-2 qwx-sae-left-side-panel p-0">
                        <div className="d-flex justify-content-center align-items-center">
                            <img src={logo} className="qwx-sae-left-side-logo" alt=""/> 
                        </div>                       
                        <hr/>
                        <ul>
                            {this.links.map(m => 
                                <li style={{ backgroundColor:m.name===this.state.page ? "rgba(6, 51, 65, 0.5)" : null, borderRight:m.name===this.state.page ? "2px solid rgba(33, 120, 94, 1)" : null }} name={m.name} onClick={e => this.changePage(e)}>
                                {m.name != "shaft" ? <i className={"fa fa-" + m.icon}/> : <img src={sicon} />} {m.name}
                                </li>    
                            )}
                        </ul>
                </motion.div>
                <div className="col-md-10 offset-md-2 qwx-sae-right-side-panel">
                    {page === "Gears" ? <Gears/> : page === "shaft" ? <Shaft/> : page === "Docs" ? <Docs /> : null}
                </div>
            </div>
        );
    }
}

export default SAEcontainer;