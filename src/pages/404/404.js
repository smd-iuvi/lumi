import React from 'react';
import './404.css';
import imgError from './assets/Error404.png';

import EmptyLabel from '../../components/EmptyLabel/EmptyLabel';

const Error404 = () => {
    return (
        <div className="container Error404">
            <img src={imgError} />
            <EmptyLabel>Página não encontrada :(</EmptyLabel>
        </div>
    );
};

export default Error404;
