import React from 'react';

import AuthUserContext from './context';
import { withServiceManager } from '../../services';

import * as ROUTES from '../../constants/routes';

const withAuthentification = Component => {
  class WithAuthentification extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: JSON.parse(localStorage.getItem('authUser'))
      };
    }

    componentDidMount() {
      const { serviceManager, history } = this.props;
      this.listener = (authUser) => {
        console.log(authUser)

        if (authUser) {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          this.setState({ authUser: authUser });
        } else {
          localStorage.removeItem('authUser');
          this.setState({ authUser: null });
        }

        history.push(ROUTES.HOME)
      }

      serviceManager.user.addListener(this.listener)
    }

    componentWillUnmount() {
      const { serviceManager } = this.props;
      serviceManager.user.removeListener(this.listener)
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
