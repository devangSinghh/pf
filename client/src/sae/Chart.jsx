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

        const page = this.props.page
        return (
            <div id="chart" className="container-fluid p-0 mb-4">
                {/* <ResponsiveContainer width="100%" height={200}> */}
                {page === 'gear' && <div className="row m-0">
                    <div className="col-md-6">
                        <LineChart width={600} height={300} data={this.props.data1} syncId="graph">
                            <CartesianGrid stroke="#fff" />
                            <XAxis dataKey="name" />
                            <YAxis />
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
                </div>}
                    
                    
            </div>
        );
    }
}

export default Chart;