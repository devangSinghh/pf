import React, { Component } from 'react';
import glogo from '../assets/socialmedialogo/glogo.svg'
import WorkCard from '../common/workCard';
import axios, { base } from '../axios-pf';

class Work extends Component {

    state = {
        projects : []
    }

    componentDidMount = async() => {
        const { data : projects } = await axios.get('add-project/get')
        this.setState({ projects })
    }

    render() {
        const projects = this.state.projects === undefined ? null : this.state.projects
        return (
            <div className="work-experience">
                <h5 className="timeline-heading mt-5">Work Experience</h5>
                <h6 className="work-quote">
                    There are three responses to a piece of work – yes, 
                    no, and WOW! Wow is the one to aim for.
                </h6>

                <a href="https://github.com/devangSinghh"><button><img src={glogo} alt=""/></button></a>

                <div className="row d-flex justify-content-center m-0">
                    {projects.map(m => 
                        <div className="col-md-6 p-2 d-flex justify-content-center work-cards p-0">
                            <WorkCard title={m.name} description={m.desc} link={m.link} image={m.image} />
                        </div>    
                    )}
                </div>
            </div>
        );
    }
}

export default Work;