import React from 'react'

const CsrfProtect = props => {
    return (
        <input id="csrf-field" type="hidden" name="csrf" value={props.csrf}/>
    )
}

export default CsrfProtect