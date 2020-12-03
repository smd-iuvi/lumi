import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './styles/fonts.css';
import './styles/global.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import services, { ServiceManagerContext } from './services';

ReactDOM.render(
  <ServiceManagerContext.Provider value={new services()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ServiceManagerContext.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
