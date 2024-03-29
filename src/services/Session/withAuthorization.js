import React from 'react';
import { withRouter } from 'react-router-dom';

import AuthUserContext from './context';
import { withServiceManager } from '../../services';
import * as ROUTES from '../../constants/routes';
import * as CONDITION from '../../constants/authorizingConditions';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentWillMount() {
      const { serviceManager, history } = this.props;

      this.listener = (authUser) => {
        if (authUser) {
          if (condition(authUser) === CONDITION.NOT_AUTHORIZED) {
            history.push(ROUTES.RESTRICTED_AREA);
          } else if (condition(authUser) === CONDITION.NOT_LOGGED) {
            history.push(ROUTES.RESTRICTED_AREA);
          }
        } else {
          history.push(ROUTES.RESTRICTED_AREA)
        }
      }

      serviceManager.user.addListener(this.listener)
    }

    componentWillUnmount() {
      const { serviceManager } = this.props;
      serviceManager.user.removeListener(this.listener)
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
