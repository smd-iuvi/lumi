import React from 'react';

import './ButtonsBottom.css';


const ButtonsBottom = (props) => {
    return (
        <article className="buttonsSidebar buttonsBottom">
            <article className={props.class} ></article>
            <h1 className="labelBottom">{props.children}</h1>
        </article>
    );
};

export default ButtonsBottom;
