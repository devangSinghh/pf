import React, { Component } from 'react';

import { Timeline, Divider } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

class Education extends Component {
    render() {
        return (
            <div className=" timeline-container">
                <div className="wrapper-timeline p-4">
                    <div className="heading mb-4 d-inline">
                        <h3 className="mb-4 timeline-heading">
                        {/* <svg className="mb-2 mr-2 hat" width="34" height="34" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.5001 16.1978L5.44568 13.7188V16.1577V17.8591C5.44568 19.7732 9.05295 21.3251 13.5025 21.3251C17.9518 21.3251 21.5597 19.7732 21.5597 17.8591C21.5597 17.844 21.5547 17.8289 21.5544 17.8142V13.7188L13.5001 16.1978Z" fill="#B2B2B2"/>
                            <path d="M0 10.8687L2.87741 11.898L3.12262 11.3728L4.1797 11.2829L4.33042 11.4398L3.42334 11.6549L3.29114 12.0462C3.2909 12.0462 1.24221 16.3292 1.5431 18.4244C1.5431 18.4244 2.8219 19.1873 4.10014 18.4244L4.43984 12.6958V12.2189L6.34259 11.7897L6.2082 12.1206L4.78953 12.5819L5.44567 12.8163L13.5001 15.2954L21.5544 12.8163L27 10.8687L13.5001 5.67493L0 10.8687Z" fill="#B2B2B2"/>
                        </svg> */}
                        Education</h3>
                    </div>
                    <div className="timeline">
                    <Timeline>
                        <Timeline.Item>2016<br/>Delhi Public School, Azaad Nagar, Kanpur</Timeline.Item>
                        <Timeline.Item>2018<br/>Mantora Public School, Kalyanpur, Kanpur</Timeline.Item>
                        <Timeline.Item>2020-present<br/>Indian Institute of Technology, Kanpur</Timeline.Item>
                    </Timeline>
                    </div>
                </div>
            </div>
        );
    }
}

export default Education;