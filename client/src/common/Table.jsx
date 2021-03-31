import React, { Component } from 'react'
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import Tooltip from '@material-ui/core/Tooltip';
class Table extends Component {

    state = {
        highlight : "",
        tooltipState : false,
        position : "relative"
    }

    // componentDidMount(){
    //     window.addEventListener('scroll', this.handleScroll);
    // }

    // componentWillUnmount(){
    //     window.removeEventListener('scroll',this.handleScroll);
    // }

    // handleScroll = (event)=>{
    //     if(window.pageYOffset > 863){
    //         this.setState({position:"fixed"});
    //     }
    //     if(window.pageYOffset < 863){
    //         this.setState({position : "relative"});
    //     }
    // } 

    handleSetActive = () => {
        console.log(11223)
        this.setState({ highlight : "orange", tooltipState:true })
    }

    render() {

        const stats = this.props.stats[0] == undefined ? [] : this.props.stats[0]
        return (
                <React.Fragment>
                    <div style={{ position:this.state.position, top:"0", zIndex:"40000", backgroundColor:"white" }} id="stats" className="mx-auto col-md-10 p-0 stats-section">
                        <p>min bending FOS : {stats.minFOS_bending}<Link className="pl-2" style={{ color:"#555", fontSize:"20px" }} offset={-100} spy={true} to={stats.i_FOSb} onSetActive={this.handleSetActive}><i className="fa fa-external-link"></i></Link></p>
                        <p>min contact FOS : {stats.minFOS_contact}<Link className="pl-2" style={{ color:"#555", fontSize:"20px" }} offset={-100} spy={true} to={stats.i_FOSc} onSetActive={this.handleSetActive}><i className="fa fa-external-link"></i></Link></p>
                    </div>
                    <div className="table-wrapper">
                        <table className="table-component table mx-auto col-md-10">
                        <thead>
                            <tr>
                                {this.props.headings.map(m => 
                                    <th style={{ position:"sticky", top:"0px", backgroundColor:"white", boxShadow: "0px 0.3px 0px 0px rgb(230, 230, 230)" }}>{m}</th>    
                                )}  
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.result.map((m, key) => 
                                <Tooltip open={this.state.tooltipState && this.state.highlight.length && (key === stats.i_FOSb || key === stats.i_FOSc)} title={"minimum FOS " + `${key === stats.i_FOSb ? "bending" : "contact"}` +" in this combination"}>
                                    <tr style={{ border:this.state.highlight === "" ? null : (key === stats.i_FOSb || key === stats.i_FOSc) ? '3px solid '+this.state.highlight : null, transition:"all 0.4s",  }} name={key} key={key} id={key}>
                                        <td>{m.module}</td>
                                        <td>{m.faceWidth}</td>
                                        <td>{m.n_pinion}</td>
                                        <td>{m.n_gear}</td>
                                        <td>{m.reduction}</td>
                                        <td>{m.bending_fos}</td>
                                        <td>{m.contact_fos}</td>
                                        <td>{m.length}</td>
                                        <td>{m.qualityN}</td>
                                        <td>{m.overload}</td>
                                    </tr>   
                                </Tooltip> 
                            )}
                        </tbody>
                    </table>
                    </div>
                </React.Fragment>
        );
    }
}

export default Table;