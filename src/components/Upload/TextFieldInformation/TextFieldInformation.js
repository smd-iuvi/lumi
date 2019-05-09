import React from 'react'

import './TextFieldInformation.css';

import Label from '../Label/Label';

const TextFieldInformation = (props) => {
    return (
        <div className="TextFieldInformation infosContainer">
            <Label>{props.label}</Label>
            <input type="text" placeholder="Digite algo..." />
        </div>
    )
}

export default TextFieldInformation
