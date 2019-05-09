import React from 'react'

import './Label.css';

const Label = (props) => {
    return (
        <h1 className="Label">{props.children}</h1>
    )
}

export default Label
