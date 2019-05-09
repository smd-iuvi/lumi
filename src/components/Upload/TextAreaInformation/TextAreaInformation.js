import React from 'react';

import './TextAreaInformation.css';

import Label from '../Label/Label'

const TextAreaInformation = (props) => {
    return (
        <div className="TextAreaInformation infosContainer">
            <Label>{props.children}</Label>
            <textarea placeholder="Digite algo..."></textarea>
        </div>
    );
};

export default TextAreaInformation;
