import React from 'react';
import { compose } from 'recompose';

import { withAuthorization } from '../../services/Session';
import { withServiceManager } from '../../services';

import * as ROLES from '../../constants/roles';
import * as CONDITIONS from '../../constants/authorizingConditions';

function AdminDashboard(props) {
  return <div />;
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
  withServiceManager
)(AdminDashboard);
