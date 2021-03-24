import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Contact extends Component {
    render() {
        return (
            <div className="mt-4 get-in-touch">
                <h5 className="timeline-heading">Building your digital presence</h5>
                <h6>Send me a message &nbsp;
                    <a style={{ textDecoration:"none" }} href="mailto:devang.iitk@gmail.com">devang.iitk@gmail.com</a>
                </h6>

                {/* <h6>Have an idea, <Link style={{ textDecoration:"none" }} to="showcase-your-blog">write your blog</Link></h6> */}

            </div>
        );
    }
}

export default Contact;