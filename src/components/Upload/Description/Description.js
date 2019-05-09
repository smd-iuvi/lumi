import React from 'react';

import './Description.css';

import Label from '../Label/Label'

const Description = () => {
    return (
        <div className="Description infosContainer">
            <Label>Sinopse/Descrição</Label>
            <textarea placeholder="Digite algo..."></textarea>
        </div>
    );
};

export default Description;
