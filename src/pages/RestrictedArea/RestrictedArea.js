import React from 'react';
import imgError from './assets/Error.png';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import EmptyLabel from '../../components/EmptyLabel/EmptyLabel';

const RestrictedArea = () => {
    return (
        <div className="container Error404">
            <img src={imgError} />
            <EmptyLabel>Faça
            <Link to={ROUTES.SIGN_IN} className="link linkRedirect"> login </Link>
                ou
            <Link to={ROUTES.SIGN_UP} className="link linkRedirect"> registre-se </Link>
                para acessar a página</EmptyLabel>
        </div>
    );
};

export default withRouter(RestrictedArea);
