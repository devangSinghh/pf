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

                <h6>Have an idea, <Link style={{ textDecoration:"none" }} to="showcase-your-blog">write your blog</Link></h6>

                Tag me in your blog &nbsp;
                <a style={{ textDecoration:"none", color:"#005796" }} href="https://www.instagram.com/dev___ang/" target="_blank">@dev___ang</a>
                
            </div>
        );
    }
}

export default Contact;