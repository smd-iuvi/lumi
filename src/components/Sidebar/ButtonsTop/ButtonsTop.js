import React from 'react';

import './ButtonsTop.css';


const ButtonsTop = (props) => {
    return (
        <article className="buttonsSidebar">
            <article className={props.newClass}></article>
            <h1 className="labelButtons Medium-Text-Bold">{props.children}</h1>
        </article>
    );
};

export default ButtonsTop;
