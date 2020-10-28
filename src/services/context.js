import React from 'react';

const ServiceManagerContext = React.createContext(null);

export const withServiceManager = Component => props => (
  <ServiceManagerContext.Consumer>
    {serviceManager => <Component {...props} serviceManager={serviceManager} />}
  </ServiceManagerContext.Consumer>
);

export default ServiceManagerContext;
