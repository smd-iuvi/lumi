import React from 'react';
import './404.css';
import imgError from './assets/Error404.svg';

const Error404 = () => {
    return (
        <div className="container Error404">
            <img src={imgError} />
            <h1 class="Large-Text-Bold">Página não encontrada :(</h1>
        </div>
    );
};

export default Error404;
