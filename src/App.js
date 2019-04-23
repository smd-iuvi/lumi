import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import VideoInfos from './pages/VideoInfos';
import Player from './pages/Player';
import Profile from './pages/Profile';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Video" exact component={VideoInfos} />
          <Route path="/Player" exact component={Player} />
          <Route path="/Profile" exact component={Profile} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
