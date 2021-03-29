import React, { Component } from 'react'
import Input from '../common/Input'
import Dropdown from '../common/dropdown'
import Table from '../common/Table'
import Tooltip from '@material-ui/core/Tooltip';
import axios, {base} from '../axios-pf'
import Chart from '../sae/Chart'
class Gears extends Component {

    state = {
        defaultRadio : "",
        dropdown : false,
        result : [],
        data : {
            fwidth1:"0.6",
            fwidth2:"1",
            ko:"1.25",
            Q:"11",
            L:"400",
            rpm:"3451.251",
            torque:"185.44",
            power:"37500",
            cvt:"",
            hardness:"363",
            modulus:"200",
            module:"3",
            module1:"",
            module2:"",
            grade:"2",
            process:"2",
            material:"0",
            poisson:"0.29",
            gearbox : "",
            npinioni : "30",
            npinionf : "70",
            ngeari : "70",
            ngearf : "100",
            minFOS : "1.45"
        }
    }
    materials = [
        {
            name : "Steel",
            value : "0"
        },
        {
            name : "Nitralloy 135M",
            value : "1"
        },
        {
            name : "Nitralloy N and 2.5% chrome",
            value : "2"
        },
    ]

    gearbox = [
        {
            name : "Single Reduction",
            value : "0"
        },
        {
            name : "Double Reduction",
            value : "1"
        },
        {
            name : "Epicyclic",
            value : "2"
        },
    ]

    process = [
        {
            name : "Carburized and hardened",
            value : "0"
        },
        {
            name : "Nitrided",
            value : "1"
        },
        {
            name : "Through Hardened",
            value : "2"
        },
        {
            name : "Nitrided and through hardened",
            value : "3"
        },
        {
            name : "Flame or Induction Hardened",
            value : "4"
        }

    ]

    resultTableHaedings = [
       "m", "Face Width(inch)", "npinion", "ngear", "reduction", "FOS_bending", "FOS_contact", "L", "Q", "ko",
    ]
    handleChange = ({currentTarget:input}) => {
        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({ data });
        console.log(data)
    };

    changeRadio = e => {
        this.setState({ defaultRadio: e.target.value})
    }

    change = (field, material) => {
        console.log(material)
        this.state.data[`${field}`] = material
        this.setState(this.state)
    }

    resetState = (e) => {
        e.preventDefault()
        this.setState({ data : {
            fwidth1:"",
            fwidth2:"",
            ko:"",
            Q:"",
            L:"",
            rpm:"",
            torque:"",
            power:"",
            cvt:"",
            hardness:"",
            modulus:"200",
            module:"",
            module1:"",
            module2:"",
            grade:"",
            process:"",
            material:"",
            poisson:"0.29",
            gearbox : "",
            npinioni : "",
            npinionf : "",
            ngeari : "",
            ngearf : "",
            minFOS : "",
            redi : "1.5",
            redf :"3"
        } })
    }

    handleSumbit = async e => {
        e.preventDefault()
        const data = this.state.data
        const payload = {
            fwidth1:data.fwidth1,
            fwidth2:data.fwidth2,
            ko:data.ko,
            Q:data.Q,
            L:data.L,
            rpm:data.rpm,
            torque:data.torque,
            power:data.power,
            cvt:data.cvt,
            hardness:data.hardness,
            modulus:data.modulus,
            module:data.module,
            module1:data.module1,
            module2:data.module2,
            grade:data.grade,
            process:data.process,
            material:data.material,
            poisson:data.poisson,
            gearbox : data.gearbox,
            npinioni : data.npinioni,
            npinionf : data.npinionf,
            ngeari : data.ngeari,
            ngearf : data.ngearf,
            minFOS : data.minFOS,
            redi : data.redi,
            redf : data.redf
        }

        const { data : result } = await axios.post('/solve', payload)
        this.setState({ result }, () => window.scrollTo(0, 400))
    }

    topRef = React.createRef()
    toEndOfPage = React.createRef()

    executeTopScroll = () => this.topRef.current.scrollIntoView()
    executeToEndScroll = () => this.toEndOfPage.current.scrollIntoView()
    render() {

        let val = this.state.defaultRadio
        const data = this.state.data
        const gearbox = this.state.data.gearbox
        console.log(this.state.result[3])
        return (
            <div ref={this.topRef} className="container-fluid p-0">
                { this.state.result.length === 0 ? false : true && 
                    <div>
                        <Tooltip title="back to top">
                            <div onClick={this.executeTopScroll} className="back-to-top-button">
                                <i className="d-flex justify-content-center align-items-center fa fa-angle-up"></i>
                            </div>
                        </Tooltip>
                        <Tooltip title="to end of page">
                            <div onClick={this.executeToEndScroll} className="to-end-of-page">
                                <i className="d-flex justify-content-center align-items-center fa fa-angle-down"></i>
                            </div>
                        </Tooltip>
                    </div>
                }
                <div className="row m-0">
                    <div className="col-md-2 qwx-sae-left-side-panel p-0">
                        <h2 className="qwx-sae-left-side-heading">GearsOn</h2>
                        <hr/>
                        <ul>
                            <li>Docs</li>
                            <li>Involute curves</li>
                            <li>Shafts</li>
                        </ul>
                    </div>
                    <div className="col-md-10 offset-md-2 qwx-sae-right-side-panel">
                        <form className="p-3 row m-0">
                            <div className="col-md-6">
                                <div className="qwx-sae-form-field-wrapper">
                                    <h3>Loading</h3>
                                    <div className="row m-0">
                                        <Input onChange={this.handleChange} value={data.rpm} required name="rpm" label="Motor/Engine RPM" placeholder="max rpm" size="col-md-6"/>
                                        <Input onChange={this.handleChange} value={data.torque} required name="torque" label="Motor/Engine torque" placeholder="max torque in N-m" size="col-md-6"/>
                                        <Input onChange={this.handleChange} value={data.power} required name="power" label="Motor/Engine Power" placeholder="max power in Kw" size="col-md-6"/>
                                        <Input onChange={this.handleChange} value={data.cvt} name="cvt" label="Motor/Engine CVT" placeholder="cvt ratio" size="col-md-6" text="If a CVT is used for primary reduction then CVT ratio is required, else not"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 p-0">
                                <div className="qwx-sae-form-field-wrapper">
                                    <h3>Material</h3>
                                    <div className="row m-0">
                                        <Input onChange={this.handleChange} value={data.hardness} required name="hardness" label="Hardness" placeholder="hardness in brinell" size="col-md-4"/>
                                        <Input onChange={this.handleChange} value={data.poisson} name="poisson" label="Poisson ratio" placeholder="possion ratio" size="col-md-4"/>
                                        <Input onChange={this.handleChange} value={data.modulus} name="modulus" label="Elastic Modulus" placeholder="Elastic modulus in Mpa" size="col-md-4"/>
                                        <p className="material-field-text-content">
                                        According to AGMA specification Allowable bending and contact stress 
                                        depends on manufacturing process. 
                                        Some of the common gear processes are listed below.
                                        </p>
                                        <Dropdown changeCallback={this.change} title="material" width="200px" array={this.materials}/>
                                        <Dropdown changeCallback={this.change} title="process" width="200px" array={this.process}/>
                                        <div className="steel-grade wrapper">
                                            <h6>Steel grade</h6>
                                            {/*Radio button*/}
                                            <div className="toggle_radio">
                                                <input onChange={this.handleChange} onClick={this.changeRadio} type="radio" value="1" checked={ val===1 ? true : false } className="toggle_option" id="first_toggle"  name="grade" />
                                                <input onChange={this.handleChange} onClick={this.changeRadio} type="radio" value="2" checked={ val===2 ? true : false } className="toggle_option" id="second_toggle" name="grade" />
                                                <label htmlFor="first_toggle"><p>1</p></label>
                                                <label htmlFor="second_toggle"><p>2</p></label>
                                                <div className="toggle_option_slider"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="qwx-sae-form-field-wrapper">
                                    <h3>Gear data</h3>
                                    <Dropdown changeCallback={this.change} title="gearbox" width="200px" array={this.gearbox}/>
                                    {gearbox === "0" && <div className="row m-0">
                                        <Input onChange={this.handleChange} value={data.module} name="module" label="module" placeholder="module" size="col-md-6" text="for eg. 1.25, 1.5, 2, 2.5, 3, 4"/>
                                        <Input onChange={this.handleChange} value={data.minFOS} name="minFOS" label="min FOS" placeholder="module" size="col-md-6" text="min value of FOS required"/>
                                        <div className="face-width-range col-md-6">
                                            <h5>pinion teeth</h5>
                                            <span>from&nbsp;</span>
                                            <input min="8" max="101" onChange={this.handleChange} value={data.npinioni} name="npinioni" id="npinioni" type="number"/>&nbsp;
                                            <span>to&nbsp;</span>&nbsp;
                                            <input max="250" onChange={this.handleChange} value={data.npinionf} name="npinionf" id="npinionf" type="number"/>
                                        </div>
                                        <div className="face-width-range col-md-6 mb-4">
                                            <h5>Gear teeth</h5>
                                            <span>from&nbsp;</span>
                                            <input min="8" max="101" onChange={this.handleChange} value={data.ngeari} name="ngeari" id="ngeari" type="number"/>&nbsp;
                                            <span>to&nbsp;</span>&nbsp;
                                            <input min="16" max="250" onChange={this.handleChange} value={data.ngearf} name="ngearf" id="ngearf" type="number"/>
                                        </div>
                                        <div className="face-width-range col-md-6 mb-4">
                                            <h5>Reduction range</h5>
                                            <span>from&nbsp;</span>
                                            <input max="12" onChange={this.handleChange} value={data.redi} name="redi" id="redi" type="number"/>&nbsp;
                                            <span>to&nbsp;</span>&nbsp;
                                            <input max="12" onChange={this.handleChange} value={data.redf} name="redf" id="redf" type="number"/>
                                        </div>
                                        <div className="face-width-range col-md-6">
                                            <h5>Face width range(in inch)</h5>
                                            <span>from&nbsp;</span>
                                            <input min="0.1" step="0.1" max="2.5" onChange={this.handleChange} value={data.fwidth1} name="fwidth1" id="fwidth1" type="number"/>&nbsp;
                                            <span>to&nbsp;</span>&nbsp;
                                            <input min="0.1" step="0.1" max="2.5" onChange={this.handleChange} value={data.fwidth2} name="fwidth2" id="fwidth2" type="number"/>
                                        </div>
                                    </div>}
                                    {gearbox === "1" && <div className="row m-0">
                                        <Input onChange={this.handleChange} value={data.module1} name="module1" label="module1" placeholder="module1" size="col-md-6" text="for eg. 1.25, 1.5, 2, 2.5, 3, 4"/>
                                        <Input onChange={this.handleChange} value={data.module2} name="module2" label="module2" placeholder="module2" size="col-md-6" text="for eg. 1.25, 1.5, 2, 2.5, 3, 4"/>
                                        <div className="face-width-range col-md-6">
                                            <h5>Face width range(in inch)</h5>
                                            <span>from&nbsp;</span>
                                            <input min="0.1" max="2.5" onChange={this.handleChange} value={data.fwidth1} name="fwidth1" id="fwidth1" type="number"/>&nbsp;
                                            <span>to&nbsp;</span>&nbsp;
                                            <input min="0.1" max="2.5" onChange={this.handleChange} value={data.fwidth2} name="fwidth2" id="fwidth2" type="number"/>
                                            {gearbox === "1" && <p className="message-text">face width range is for both pinion and Gear</p>}
                                        </div>
                                        
                                    </div>}
                                </div>
                            </div>
                            <div className="col-md-6 p-0">
                                <div className="qwx-sae-form-field-wrapper">
                                    <h3>Constraints</h3>
                                    <div className="row m-0">
                                        <Input onChange={this.handleChange} value={data.ko} name="ko" label="Overload Factor" placeholder="Ko" size="col-md-4" textToShow="If value of overload factor is not provided then default value will be 1.25"/>
                                        <Input onChange={this.handleChange} value={data.Q} name="Q" label="Quality Number" placeholder="Q" size="col-md-4" textToShow="If value of Ouality Number is not provided then default value will be 11"/>
                                        <Input onChange={this.handleChange} value={data.L} name="L" label="Max length of Gearbox" placeholder="max length in mm" size="col-md-4"/>
                                    </div>
                                </div>
                            </div>
                            <div className="qwx-button">
                                <button onClick={this.resetState}>Reset</button>
                                <button onClick={this.handleSumbit}>Proceed</button>
                            </div>
                        </form>

                        {this.state.result.length !== 0 && 
                        <Chart 
                        data1={this.state.result[1] === undefined ? [] : this.state.result[1]}
                        data2={this.state.result[2] === undefined ? [] : this.state.result[2]}
                        />}
                        {this.state.result.length !== 0 && <Table 
                        headings={this.resultTableHaedings} 
                        result={this.state.result[0] === undefined ? [] : this.state.result[0]} 
                        stats={this.state.result[3] === undefined ? [] : this.state.result[3]}/>}
                        <div id="123" className="end-of-page" ref={this.toEndOfPage}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Gears;