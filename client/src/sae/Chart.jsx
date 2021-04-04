import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush, AreaChart, Area, Bar, ResponsiveContainer  } from 'recharts';
import { motion } from 'framer-motion'
class Chart extends Component {
    render() {

        const page = this.props.page
        return (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:1 }} id="chart" className="container-fluid p-0 mb-4">
                {/* <ResponsiveContainer width="100%" height={200}> */}
                {page === 'gear' && <div className="row m-0 d-flex justify-content-center">
                    <div className="col-md-6 p-0 d-flex justify-content-center">
                        <ResponsiveContainer width={'100%'} height={300} margin={{ left:-30 }}>
                        <LineChart data={this.props.data1} syncId="graph">
                            <CartesianGrid stroke="#063944" />
                            <XAxis tick={{ fill: '#d5d5d5' }} dataKey="name" />
                            <YAxis tick={{ fill: '#d5d5d5' }} />
                            <Tooltip />
                            <Legend />
                            {page === "gear" && <Line type="monotone" dot={false} dataKey="N_pinion" stroke="#0099cc" />}
                            {page === "gear" &&<Line type="monotone" dot={false} dataKey="N_gear" stroke="rgb(136, 132, 216)" />}
                            {page === 'doubleGear' && 
                                <div>
                                    <Line type="monotone" dot={false} dataKey="N_pinion1" stroke="#0099cc" />
                                    <Line type="monotone" dot={false} dataKey="N_gear1" stroke="rgb(136, 132, 216)" />
                                    <Line type="monotone" dot={false} dataKey="N_pinion2" stroke="#0099cc" />
                                    <Line type="monotone" dot={false} dataKey="N_gear2" stroke="rgb(136, 132, 216)" />
                                </div>
                            }
                        </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="col-md-6 p-0 d-flex justify-content-center">
                    <ResponsiveContainer width={'99%'} height={300}>
                        <LineChart width={600} height={300} data={this.props.data1} syncId="graph">
                            <CartesianGrid stroke="#063944"/>
                            <XAxis tick={{ fill: '#d5d5d5' }} dataKey="name" />
                            <YAxis tick={{ fill: '#d5d5d5' }}/>
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dot={false} dataKey="bendingFOS" stroke="#006600" />
                            <Line type="monotone" dot={false} dataKey="contactFOS" stroke="#339966" />
                        </LineChart>
                    </ResponsiveContainer>
                    </div>
                </div>}
                    
                    
            </motion.div>
        );
    }
}

export default Chart;