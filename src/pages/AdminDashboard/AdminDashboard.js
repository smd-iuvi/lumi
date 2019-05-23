import React, { Component } from 'react';
import { compose } from 'recompose';

import { withAuthorization } from '../../Firebase/Session';
import { withFirebase } from '../../Firebase';

import * as ROLES from '../../constants/roles';
import * as CONDITIONS from '../../constants/authorizingConditions';

class AdminDashboard extends Component {
  render() {
    return <div />;
  }
}

const condition = authUser => {
  if (authUser == null) {
    return CONDITIONS.NOT_LOGGED;
  } else if (authUser.role !== ROLES.ADMIN) {
    return CONDITIONS.NOT_AUTHORIZED;
  }
};

export default compose(
  withAuthorization(condition),
  withFirebase
)(AdminDashboard);
