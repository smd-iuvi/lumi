import React from 'react';

import AuthUserContext from './context';
import { withServiceManager } from '../../services';

const withAuthentification = Component => {
  class WithAuthentification extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: JSON.parse(localStorage.getItem('authUser'))
      };
    }

    componentDidMount() {
      const { serviceManager } = this.props;
      this.listener = serviceManager.onAuthUserListener(
        authUser => {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          this.setState({ authUser: authUser });
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

  return withServiceManager(WithAuthentification);
};

export default withAuthentification;
