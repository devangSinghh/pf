import React from 'react';

const Input = ({name, label, size, text , ...rest }) => {
    return (
        <div className={"qwx-form-wrapper " + size}>
            <label className="qwx-form-label" htmlFor={name}>{label}</label>
            <input className="qwx-form-input" name={name} id={name} {...rest} />
            <p className="qwx-form-text-to-show">{text}</p>
        </div>
    )
}

export default Input;