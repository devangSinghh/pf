import React, { Component } from 'react';
import Form from '../sae/form'

class Dropdown extends Component {

    state = {
        dropdown : false,
        value : "",
        material : "",
        process : "",
        processValue : ""
    }

    ref = React.createRef();

    toggleDropdown = () => {
        this.setState({ dropdown: !this.state.dropdown });
    }

    handleClickOutside = e => {
        if (this.ref.current && !this.ref.current.contains(e.target)) {
            this.setState({ dropdown: false });
        }
    };

    componentDidMount = () => {
        document.addEventListener('click', this.handleClickOutside, true);

    }
    componentWillUnmount = () => {
        document.removeEventListener('click', this.handleClickOutside, true);
    }

    changeValue = (e, value, material) => {
        this.setState({ material })
        this.props.changeCallback(this.props.title, value)
        
        this.setState({ dropdown : false })
        
    }

    render() {
            const dropdown = this.state.dropdown
            const material = this.state.material
        return (
            <div>
                <div className="dropdown m-3">
                    <div onClick={this.toggleDropdown} style={{ width: this.props.width, border: dropdown ? "1px solid rgb(139, 139, 139)" : "" }} className="dropdown-wrapper">
                        <div className="d-flex justify-content-start">
                            <h4>{material != ""? `${this.state.material}` : this.props.title}</h4>
                        </div>
                        <div className="d-flex justify-content-end">
                            <span className="vertical-line"></span>
                            <i className="fa fa-angle-down"></i>
                        </div>
                    </div>
                    {dropdown && <div ref={this.ref} style={{ width: this.props.width }} className="dropdown-content content ">
                        <ul>
                            {this.props.array.map((m, key) =>
                                <li className="dropdown-input" name="material" key={key} onClick={e => this.changeValue(e, m.value, m.name)}>{m.name}</li>
                            )}
                        </ul>    
                    </div>}
                </div>
            </div>
        );
    }
}

export default Dropdown;