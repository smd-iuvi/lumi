import React from 'react';

import './ButtonProfile.css';


const ButtonProfile = (props) => {
    return (
        <article className="buttonsSidebar buttonProfile">
            <div className="imgProfile"><img src={props.image} /></div>
            <h1 className="Medium-Text-Regular">{props.children}</h1>
        </article>
    );
};

export default ButtonProfile;
