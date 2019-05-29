import React from 'react';

import './ButtonLogin.css';

const ButtonLogin = (props) => {
    return (
        <article className="buttonsSidebar buttonLogin">
            <img src={props.image} className="imgProfile" />
            <h1 className="Medium-Text-Regular">Fazer login</h1>
        </article>
    );
};

export default ButtonLogin;
