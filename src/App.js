import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import * as ROUTES from './constants/routes';

import NavBar from './components/NavBar/NavBar';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';

import Home from './pages/Home/Home';
import VideoInfos from './pages/VideoInfos/VideoInfos';
import Player from './pages/Player/Player';
import Profile from './pages/Profile/Profile';
import Upload from './pages/Upload/Upload';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Landing from './pages/Landing/Landing';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import { withAuthentification } from './Firebase/Session';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Sidebar />
        <NavBar />

        <Switch>
          <Route path={ROUTES.HOME} exact component={Home} />
          <Route
            path={`${ROUTES.VIDEO}/:videoId`}
            exact
            component={VideoInfos}
          />
          <Route path={`${ROUTES.PLAYER}/:videoId`} component={Player} />
          <Route path={ROUTES.PROFILE} exact component={Profile} />
          <Route path={ROUTES.UPLOAD} exact component={Upload} />
          <Route path={ROUTES.SIGN_IN} exact component={SignIn} />
          <Route path={ROUTES.SIGN_UP} exact component={SignUp} />
          <Route path={ROUTES.LANDING} exact component={Landing} />
          <Route path={ROUTES.ADMIN} exact component={AdminDashboard} />
        </Switch>

        <Footer />
      </BrowserRouter>
    );
  }
}

export default withAuthentification(App);
