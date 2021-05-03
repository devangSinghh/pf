import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Footer extends Component {
    render() {
        return (
            <div>
                <footer className="dev-blog-footer footer">
                    <div className="container">
                        <div className="dev-blog-footer-wrapper align-items-center d-flex justify-content-center  row w-100 m-0">
                            <div className="col-md-6 align-items-center d-flex justify-content-center">
                                <h2>Developers. Blog</h2>
                            </div>
                            {/* <div className="col-md-4"></div> */}
                            <div className="col-md-6 align-items-center d-flex justify-content-center">
                                <Link to="/d/blogs/"><h3>Read more
                                    </h3></Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;