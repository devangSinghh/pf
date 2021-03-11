import React, { Component } from 'react';

class Interests extends Component {
    render() {
        return (
            <div className="interests">
                <h5 className="pl-3 timeline-heading">Interests</h5>
                <ul>
                    <li>
                        <h5>Travelling</h5>
                        <h6>A creative person who loves to travel</h6>
                    </li>
                    <li>
                        <h5>Blogging</h5>
                        <h6>Gathering memories day by day</h6>
                        <h6 className="text-info">Check out blogs <i className="fa fa-external-link"></i></h6>
                    </li>
                    <li>
                        <h5>Technical stuff</h5>
                        <ul>
                            <li>Frontend - ReactJS</li>
                            <li>Backend - Nodejs</li>
                            <li>UI design - Figma</li>
                            <li>Competitive coding</li>
                            <li>Kubernetes</li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Interests;