import React, { Component } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../constants/routes';

import './SignIn.css';
import { withAuthUser } from '../../Firebase/Session';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
};

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentWillMount() {
    const { authUser, history } = this.props;

    if (authUser !== null) {
      history.push(ROUTES.HOME);
    }
  }

  onSubmit = event => {
    const { firebase, history } = this.props;
    const { email, password } = this.state;
    event.preventDefault();

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
  };

  render() {
    const { error, email, password } = this.state;
    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            value={email}
            name="email"
            onChange={this.onChange}
            placeholder="email"
          />
          <br />
          <br />
          <input
            type="password"
            value={password}
            name="password"
            onChange={this.onChange}
            placeholder="senha"
          />
          <br />
          <br />
          <button type="submit">Entrar</button>
        </form>

        {error && <p>{error.message}</p>}
      </div>
    );
  }
}

export default compose(
  withRouter,
  withFirebase,
  withAuthUser
)(SignIn);
