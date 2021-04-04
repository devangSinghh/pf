import React, { Component } from 'react'
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import Tooltip from '@material-ui/core/Tooltip';
import {motion} from 'framer-motion'
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

    plotGraph = (e,index) => {
        const data = this.props.result[index]
        this.props.plot(index)
    }

    handleSetActive = () => {
        this.setState({ highlight : "orange", tooltipState:true })
    }

    render() {
        
        const page = this.props.page
        const stats = this.props.stats == undefined ? [] : page === "gear" ? this.props.stats[0] : []
        return (
                <React.Fragment>
                    {page === "gear" ? 
                    <div>
                        <div style={{ position:this.state.position, top:"0", zIndex:"40000" }} id="stats" className="mx-auto col-md-10 p-0 stats-section">
                            <p>min bending FOS : {stats.minFOS_bending}<Link className="pl-2" style={{ color:"#555", fontSize:"20px" }} offset={-100} spy={true} to={stats.i_FOSb} onSetActive={this.handleSetActive}><i className="fa fa-external-link"></i></Link></p>
                            <p>min contact FOS : {stats.minFOS_contact}<Link className="pl-2" style={{ color:"#555", fontSize:"20px" }} offset={-100} spy={true} to={stats.i_FOSc} onSetActive={this.handleSetActive}><i className="fa fa-external-link"></i></Link></p>
                        </div>
                    <div className="table-wrapper">
                        <motion.table initial={{ y:20 }} animate={{ y:0 }} transition={{ duration:0.5 }} className="table-component table mx-auto col-md-10">
                        <thead>
                            <tr>
                                {this.props.headings.map(m => 
                                    <th style={{ position:"sticky", top:"0px", boxShadow: "0px 0.3px 0px 0px rgb(230, 230, 230)" }}>{m}</th>    
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
                        </motion.table>
                    </div>
                </div>
                    : 
                <div>
                    <div className="table-wrapper">
                        <table className="table-component table mx-auto col-md-10">
                        <thead>
                            <tr>
                                {this.props.headings.map(m => 
                                    <th style={{ position:"sticky", top:"0px", borderBottom:"0" }}>{m}</th>    
                                )}  
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.result.map((m, key) => 
                                <Tooltip open={this.state.tooltipState && this.state.highlight.length && (key === stats.i_FOSb || key === stats.i_FOSc)} title={"minimum FOS " + `${key === stats.i_FOSb ? "bending" : "contact"}` +" in this combination"}>
                                    <tr style={{ border:this.state.highlight === "" ? null : (key === stats.i_FOSb || key === stats.i_FOSc) ? '3px solid '+this.state.highlight : null, transition:"all 0.4s",  }} name={key} key={key} id={key}>
                                        <td>{m.FOS}</td>
                                        <td>{m.inner_D}</td>
                                        <td>{m.outer_D.toFixed(3)}</td>
                                        <td>{m.Fr1.toFixed(3)}</td>
                                        <td>{m.Ft1.toFixed(3)}</td>
                                        <td>{m.Fr2.toFixed(3)}</td>
                                        <td>{m.Ft2.toFixed(3)}</td>
                                        <td>{m.Raz.toFixed(3)}</td>
                                        <td>{m.Ray.toFixed(3)}</td>
                                        <td>{m.Rbz.toFixed(3)}</td>
                                        <td>{m.Rby.toFixed(3)}</td>
                                        {/* <td><i onClick={e => this.plotGraph(e, key)} className="fa fa-external-link"></i></td> */}
                                    </tr>   
                                </Tooltip> 
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
                    }
                </React.Fragment>
        );
    }
}

export default Table;