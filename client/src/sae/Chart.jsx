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
            <div className="container-fluid p-0 mb-4">
                {/* <ResponsiveContainer width="100%" height={200}> */}
                <div className="row m-0">
                    <div className="col-md-6">
                        <LineChart width={600} height={300} data={this.props.data1} syncId="graph">
                            <CartesianGrid stroke="#fff" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dot={false} dataKey="N_pinion" stroke="#0099cc" />
                            <Line type="monotone" dot={false} dataKey="N_gear" stroke="rgb(136, 132, 216)" />
                        </LineChart>
                    </div>
                    <div className="col-md-6">
                        <LineChart width={600} height={300} data={this.props.data1} syncId="graph">
                            <CartesianGrid stroke="#f5f5f5"/>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dot={false} dataKey="bendingFOS" stroke="#006600" />
                            <Line type="monotone" dot={false} dataKey="contactFOS" stroke="#339966" />
                        </LineChart>
                    </div>
                </div>
                    
                    
            </div>
        );
    }
}

export default Chart;