import React, { Component } from 'react';
import ShaftBanner from '../assets/sae/shaft-banner.svg';
import Input from '../common/Input'
import Dropdown from '../common/dropdown'
import Table from '../common/Table'
import {Tooltip as tt} from '@material-ui/core/Tooltip';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import axios, {base} from '../axios-pf'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Brush, AreaChart, Area, Bar, Tooltip, ResponsiveContainer } from 'recharts';
import { Modal } from 'react-bootstrap'
import Chart from '../sae/Chart'
import {motion} from 'framer-motion'

class Shaft extends Component {

    state = {
        showForm : true,
        showBanner : false,
        showPlot:false,
        modal : false,
        result : [],
        plot : [],
        data : {
            kb :"0.9",
            kd:"1.020",
            ke:"0.702",
            kc:"1",
            torque:"185.44",
            length:"130",
            q:"0.82",
            qs:"0.85",
            kt:"1.45",
            kts:"1.67",
            fos:"1.6",
            d1:"121",
            d2:"61",
            g1a:"92",
            g2b:"12",
            tensile:"470",
            ultimate :"700",
            finish:"0"
        }
    }

    componentDidMount = async() => {
        document.addEventListener('click', this.handleClickOutsideModal, true);
        window.scrollTo(0, 0)
    }

    componentWillUnmount = () => {
        document.removeEventListener('click', this.handleClickOutsideModal, true);
        
    }
    modalRef = React.createRef()

    openModal = () => {
        this.setState({ modal : true, showBanner:true })
    }

    change = (field, material) => {
        this.state.data[`${field}`] = material
        this.setState(this.state)
    }
    handleClickOutsideModal = e => {

        {/*If clicked outside of modal, it will close*/}
        if (this.modalRef.current && !this.modalRef.current.contains(e.target)) {
           this.setState({modal : false})
        }
    };

    plotGraph = async index => {
        this.setState({ modal:true, showPlot:true })
        console.log(index)
        const d = this.state.result[index]
        const payload = {
            FOS:d.FOS,
            length : d.length,
            Ft1:d.Ft1,
            Ft2:d.Ft2,
            Fr1:d.Fr1,
            Fr2:d.Fr2,
            Ray:d.Ray,
            Raz:d.Raz,
            Rby:d.Rby,
            Rbz:d.Rbz,
            g1a:d.g1a,
            g2b:d.g2b
        }


        const { data:plot } = await axios.post('/solve/shaft/plot', payload)
        console.log(plot)
        this.setState({ plot })
        this.setState(this.state)
    }

    handleSumbit = async e => {
        e.preventDefault()
        const data = this.state.data
        const payload = {
            kb  : data.kb,
            kd : data.kd,
            ke : data.ke,
            kc : data.kc,
            torque : data.torque,
            length : data.length,
            q : data.q,
            qs : data.qs,
            kt : data.kt,
            kts : data.kts,
            fos : data.fos,
            d1 : data.d1,
            d2 : data.d2,
            g1a : data.g1a,
            g2b : data.g2b,
            tensile : data.tensile,
            ultimate  : data.ultimate,
            finish : data.finish
        }


        const { data:result } = await axios.post('/solve/shaft', payload)
        this.setState({ result }, () => window.scrollTo(0, 600))
    }

    surfaceFinish = [
        {
            name:"Ground",
            value : "0"
        },
        {
            name:"Machined or cold-drawn",
            value : "1"
        },
        {
            name:"Hot-rolled",
            value : "2"
        },
        {
            name:"As-forged",
            value : "3"
        },
    ]

    headings = ["FOS", "Inner Dia", "Outer Dia", "Fr1", "Ft1", "Fr2", "Ft2", "Raz", "Ray", "Rbz", "Rby", ]

    handleChange = ({currentTarget:input}) => {
        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({ data });
        console.log(data)
    };

    topRef = React.createRef()
    toEndOfPage = React.createRef()

    executeTopScroll = () => this.topRef.current.scrollIntoView()
    executeToEndScroll = () => this.toEndOfPage.current.scrollIntoView()

    render() {
        const data = this.state.data
        return (
            <React.Fragment>
                {this.state.result.length === 0 ? false : true && 
                            <div>
                                <tt title="back to top">
                                    <div onClick={this.executeTopScroll} className="back-to-top-button">
                                        <i className="d-flex justify-content-center align-items-center fa fa-angle-up" />
                                    </div>
                                </tt>
                                <tt title="to end of page">
                                    <div onClick={this.executeToEndScroll} className="to-end-of-page">
                                        <i className="d-flex justify-content-center align-items-center fa fa-angle-down" />
                                    </div>
                                </tt>
                            </div>
                }
                {this.state.showForm && <div className="shaft-page container-fluid p-0">
                <motion.div initial={{y:-25}} animate={{y:0}} transition={{ type: "spring", stiffness: 160 }} ref={this.topRef} className="row m-0">
                    <div className="col-md-5 p-0">
                        <div className="col-md-12 mt-3">
                            <div className="qwx-sae-form-field-wrapper">
                                <h3>Loading</h3>
                                <div className="row m-0">
                                    <Input onChange={this.handleChange} value={data.torque} required name="torque" label="Motor/Engine torque" placeholder="max torque in N-m" size="col-md-6"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 mt-3">
                            <div className="qwx-sae-form-field-wrapper">
                                <h3>Factor of Safety</h3>
                                <div className="row m-0">
                                    <Input onChange={this.handleChange} value={data.fos} required name="fos" label="Factor of safety" placeholder="preferred FOS" size="col-md-10"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 mt-3">
                            <div className="qwx-sae-form-field-wrapper">
                                <h3>Material data</h3>
                                <div className="row m-0">
                                    <Input onChange={this.handleChange} value={data.tensile} required name="tensile" label="Tensile strength" placeholder="tensile strength" size="col-md-6"/>
                                    <Input onChange={this.handleChange} value={data.ultimate} required name="ultimate" label="Ultimate strength" placeholder="ultimate strength" size="col-md-6"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7 p-0 mt-3">
                        <div className="col-md-11">
                            <div className="qwx-sae-form-field-wrapper">
                                <h3>Variables</h3>
                                <div className="row m-0">
                                    <Input onChange={this.handleChange} value={data.kb} name="kb" label="Size Factor" placeholder="size factor (kb)" size="col-md-4"/>
                                    <Input onChange={this.handleChange} value={data.kc}  name="kc" label="Loading factor" placeholder="loading factor (kc)" size="col-md-4"/>
                                    <Input onChange={this.handleChange} value={data.kd}  name="kd" label="Temperature factor" placeholder="temperature factor (kd)" size="col-md-4"/>
                                    <Input onChange={this.handleChange} value={data.ke} name="ke" label="Reliability factor" placeholder="Reliability factor (ke)" size="col-md-4"/>
                                    <Input onChange={this.handleChange} value={data.q}  name="q" label="Notch sensitivity" placeholder="Notch sensitivity (q)" size="col-md-4"/>
                                    <Input onChange={this.handleChange} value={data.qs}  name="qs" label="Notch sensitivity (shear)" placeholder="Notch sensitivity (qs)" size="col-md-4"/>
                                    <Input onChange={this.handleChange} value={data.kt}  name="kt" label="Stress concentration factor" placeholder=" (Kt)" size="col-md-4"/>
                                    <Input onChange={this.handleChange} value={data.kts}  name="kts" label="Stress concentration factor (shear)" placeholder=" (Kts)" size="col-md-4"/>
                                    <Dropdown changeCallback={this.change} title="finish" width="200px" array={this.surfaceFinish}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-11">
                            <div className="qwx-sae-form-field-wrapper">
                                <h3>Constraints</h3>
                                <div className="row m-0">
                                    <p className="constraints-content-line">
                                        If a single gear is mounted on shaft then consider it as Gear1(as shown in <span className="open-figure" onClick={(e) => this.openModal(e)}>figure</span>) and don't fill Gear2 fields
                                    </p>
                                    <Input onChange={this.handleChange} value={data.d1} name="d1" label="Pitch diameter of gear1" placeholder="Pitch diameter of gear1" size="col-md-4"/>
                                    <Input onChange={this.handleChange} value={data.d2}  name="d2" label="Pitch diameter of gear2" placeholder="Pitch diameter of gear2" size="col-md-4"/>
                                    <Input onChange={this.handleChange} value={data.g1a}  name="g1a" label="Distance b|w Gear1 and point A" placeholder="Distance b|w Gear1 and point A" size="col-md-4"/>
                                    <Input onChange={this.handleChange} value={data.g2b} name="g2b" label="Distance b|w Gear2 and point B" placeholder="Distance b|w Gear2 and point B" size="col-md-4"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
                <div className="qwx-button text-center">
                    <button onClick={this.resetState}>Reset</button>
                    <button onClick={this.handleSumbit}>Proceed</button>
                </div>
            </div>}
            {this.state.result.length ? 
                <Link className="col-md-10 mx-auto text-center" to="chart-2">
                    <button className="show-hide-btn mb-4" onClick={() => this.setState({ showForm : !this.state.showForm })}>{this.state.showForm === false ? 'Show' : 'Hide'} form</button>
                </Link>
                :
                null
            }
            <Modal size="lg" style={{opacity:1}} aria-labelledby="contained-modal-title-vcenter" centered show={this.state.modal} onHide={() => this.setState({ modal:false })}>
            
            <Modal.Header><Modal.Title id="contained-modal-title-vcenter">
                <i onClick={() => this.setState({modal:false})} className="fa fa-times" />
            </Modal.Title></Modal.Header>
            
            <Modal.Body ref={this.modalRef}>
                {this.state.showBanner ? <img src={ShaftBanner} className="img img-fluid" alt="sae-shaft-calculator-banner-image"/> : null}
                {this.state.showPlot ?
                    <div>
                        <h5>Max shear force in x-z plane : {this.state.plot[4]}</h5>
                        <h5>Max shear force in y-z plane : {this.state.plot[5]}</h5>
                        <h5>Max Bending moment in x-z plane : {this.state.plot[6]}</h5>
                        <h5>Max Bending moment in y-z plane : {this.state.plot[7]}</h5>
                    </div> 
                    :
                    null
                }
            </Modal.Body>
            
            </Modal>
            {this.state.result.length ? 
                <div id="chart-2" className="col-md-10 mx-auto mb-5">
                    <ResponsiveContainer width={'100%'} height={300} margin={{ left:-30 }}>
                        <LineChart width={600} height={300} data={this.state.result} >
                            <CartesianGrid stroke="#063944"/>
                            <XAxis tick={{ fill: '#d5d5d5' }} dataKey="name" />
                            <YAxis tick={{ fill: '#d5d5d5' }}/>
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dot={false} dataKey="inner_D" stroke="#006600" />
                            <Line type="monotone" dot={false} dataKey="outer_D" stroke="#339966" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                :null
            }
            {this.state.result.length ? <Table 
                headings={this.headings} 
                result={this.state.result === undefined ? [] : this.state.result} 
                // stats={this.state.result[3] === undefined ? [] : this.state.result[3]}
                page="shaft"
                plot = {this.plotGraph}
            />
                :null
        }
            <div ref={this.toEndOfPage} style={{ height:"10vh" }}></div>
            </React.Fragment>
        );
    }
}

export default Shaft;