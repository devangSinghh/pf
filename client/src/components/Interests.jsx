import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Interests extends Component {
    render() {
        return (
            <div className="interests">
                <h5 className="pl-3 timeline-heading">Interests</h5>
                <ul>
                    <li>
                        <h5>Travelling</h5>
                        <h6>There are always new things to visit</h6>
                    </li>
                    <li>
                        <h5>Blogging</h5>
                        <h6>Gathering memories day by day</h6>
                        <Link style={{ textDecoration:"none" }} to="/blogs"><h6 className="text-info">Check out blogs <i className="fa fa-external-link"></i></h6></Link>
                    </li>
                    <li>
                        <h5>Frameworks and technologies</h5>
                        <ul>
                            <li>Frontend - ReactJS</li>
                            <li>Backend - Nodejs</li>
                            <li>UI design - Figma</li>
                            <li>AWS EC2, SES</li>
                            <li>Kubernetes</li>
                            <li>Docker</li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Interests;