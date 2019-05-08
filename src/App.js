import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import * as ROUTES from './constants/routes';

import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';

import Home from './pages/Home/Home';
import VideoInfos from './pages/VideoInfo/VideoInfos';
import Player from './pages/Player/Player';
import Profile from './pages/Profile/Profile';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar />

        <Switch>
          <Route path={ROUTES.HOME} exact component={Home} />
          <Route path={ROUTES.VIDEO} exact component={VideoInfos} />
          <Route path={`${ROUTES.PLAYER}/:videoId`} component={Player} />
          <Route path={ROUTES.PROFILE} exact component={Profile} />
        </Switch>

        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
