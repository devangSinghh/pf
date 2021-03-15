import React, { Component } from 'react';

class BlogFunctions extends Component {

    appendInput = e => {
        e.preventDefault();
        const currentListLength = this.state.blogSections.length;
        const newInput = `input-${ currentListLength }`;
        this.setState(prevState => ({ blogSections: prevState.blogSections.concat([{name:newInput, val:""}]) }) );
    }

    handleBlogChange = (e, key) => {
        const val = e.target.value;
        const blogSections = [...this.state.blogSections]
        blogSections[key].val = val;
        this.setState({ blogSections }) 
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default BlogFunctions;