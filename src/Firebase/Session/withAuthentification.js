import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../../Firebase';

const withAuthentification = Component => {
  class WithAuthentification extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: JSON.parse(localStorage.getItem('authUser'))
      };
    }

    componentWillMount() {
      const { firebase } = this.props;
      this.listener = firebase.onAuthUserListener(
        authUser => {
          firebase.user.get(authUser.uid, user => {
            localStorage.setItem('authUser', JSON.stringify(authUser));
            this.setState({ authUser });
          });
        },
        () => {
          localStorage.removeItem('authUser');
          this.setState({ authUser: null });
        }
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      const { authUser } = this.state;
      return (
        <AuthUserContext.Provider value={authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentification);
};

export default withAuthentification;