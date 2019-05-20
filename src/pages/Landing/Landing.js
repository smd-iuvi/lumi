import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const style = {
  color: '#fff'
};

const Landing = () => {
  return (
    <div className="container" style={style}>
      <h1>Landing Page</h1>
      <Link to={ROUTES.SIGN_IN}>Logar </Link>
    </div>
  );
};

export default Landing;
