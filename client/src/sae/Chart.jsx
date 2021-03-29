import React, { Component } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Brush,
    AreaChart,
    Area,
    Bar,
    // ResponsiveContainer,
  } from 'recharts';
class Chart extends Component {
    render() {
        return (
            <div className="container-fluid p-0">
                {/* <ResponsiveContainer width="100%" height={200}> */}
                <LineChart width={600} height={300} data={this.props.data1} syncId="graph">
                        <CartesianGrid stroke="#fff" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {/* <Bar dataKey="bendingFOS" barSize={20} fill="#413ea0" /> */}
                        <Line type="monotone" dataKey="N_pinion" stroke="#0099cc" />
                        <Line type="monotone" dataKey="N_gear" stroke="rgb(136, 132, 216)" />
                        {/* <Brush/> */}
                        {/* <Scatter dataKey="cnt" fill="red" /> */}
                    </LineChart>
                    <LineChart width={600} height={300} data={this.props.data1} syncId="graph">
                        <CartesianGrid stroke="#f5f5f5"/>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {/* <Bar dataKey="contactFOS" barSize={20} fill="#413ea0" /> */}
                        <Line type="monotone" dataKey="bendingFOS" stroke="#006600" />
                        <Line type="monotone" dataKey="contactFOS" stroke="#339966" />
                        {/* <Line type="monotone" dataKey="N_gear" stroke="#ffc600" />  */}
                    </LineChart>
            </div>
        );
    }
}

export default Chart;