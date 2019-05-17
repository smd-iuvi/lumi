import React from 'react';

import './ButtonsBottom.css';


const ButtonsBottom = (props) => {
    return (
        <article className="buttonsSidebar buttonsBottom">
            <img src={props.icon} className="iconBottom" />
            <h1 className="labelBottom">{props.children}</h1>
        </article>
    );
};

export default ButtonsBottom;
