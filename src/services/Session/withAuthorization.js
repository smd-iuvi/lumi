import React from 'react';
import { withRouter } from 'react-router-dom';

import AuthUserContext from './context';
import { withServiceManager } from '../../services';
import * as ROUTES from '../../constants/routes';
import * as CONDITION from '../../constants/authorizingConditions';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentWillMount() {
      const { firebase, history } = this.props;
      this.listener = firebase.onAuthUserListener(
        authUser => {
          if (condition(authUser) === CONDITION.NOT_AUTHORIZED) {
            console.log(CONDITION.NOT_AUTHORIZED);
            history.push(ROUTES.RESTRICTED_AREA);
          } else if (condition(authUser) === CONDITION.NOT_LOGGED) {
            console.log(CONDITION.NOT_LOGGED);
            history.push(ROUTES.RESTRICTED_AREA);
          }
        },
        () => history.push(ROUTES.RESTRICTED_AREA)
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) === CONDITION.AUTHORIZED ? (
              <Component {...this.props} />
            ) : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return withRouter(withServiceManager(WithAuthorization));
};

export default withAuthorization;
