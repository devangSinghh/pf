import React, { Component } from 'react';
import Gears from '../sae/gears'
import Shaft from '../sae/Shafts'
import Docs from '../sae/Docs'
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
        },
        {
            name : "Gears",
        },
        {
            name : "curve",
        },
        {
            name : "shaft",
        },
    ]
    
    render() {
        const page = this.state.page
        return (
            <div className="row m-0">
                <div className="col-md-2 qwx-sae-left-side-panel p-0">
                        <h2 className="qwx-sae-left-side-heading">GearsOn</h2>
                        <hr/>
                        <ul>
                            {this.links.map(m => 
                                <li style={{ backgroundColor:m.name===this.state.page ? "#f1f1f1" : null }} name={m.name} onClick={e => this.changePage(e)}>{m.name}</li>    
                            )}
                        </ul>
                </div>
                <div className="col-md-10 offset-md-2 qwx-sae-right-side-panel">
                    {page === "Gears" ? <Gears/> : page === "shaft" ? <Shaft/> : page === "Docs" ? <Docs /> : null}
                </div>
            </div>
        );
    }
}

export default SAEcontainer;