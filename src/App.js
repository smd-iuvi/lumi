import React, { useEffect, useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import uuid from 'uuid';

import * as ROUTES from './constants/routes';

import NavBar from './components/NavBar/NavBar';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';
import SmallWidth from './pages/SmallWidth/SmallWidth';

import Home from './pages/Home/Home';
import VideoInfos from './pages/VideoInfos/VideoInfos';
import Player from './pages/Player/Player';
import Profile from './pages/Profile/Profile';
import Upload from './pages/Upload/Upload';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Search from './pages/Search/Search';
import Landing from './pages/Landing/Landing';
import Event from './pages/Event/Event';
import Category from './pages/Category/Category';
import Discover from './pages/Discover/Discover';
import VideosList from './pages/VideosList/VideosList';
import Error404 from './pages/404/404';
import RestrictedArea from './pages/RestrictedArea/RestrictedArea';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import Documentation from './pages/Documentation/Documentation';
import { withAuthentification } from './Firebase/Session';

function App(props) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);

    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
    }
  }, []);

  function updateWindowDimensions() {
    setWidth(window.innerWidth);
  }

  const { location } = props;

  return (
    <div>
      {width > 950 ? (
        <>
          {!location.pathname.includes(ROUTES.PLAYER) &&
            !location.pathname.includes(ROUTES.LANDING) &&
            !location.pathname.includes(ROUTES.DOCUMENTATION) ? (
              <Sidebar />
            ) : null}

          {!location.pathname.includes(ROUTES.LANDING) &&
            !location.pathname.includes(ROUTES.SIGN_IN) &&
            !location.pathname.includes(ROUTES.SIGN_UP) &&
            !location.pathname.includes(ROUTES.DOCUMENTATION) ? (
              <NavBar class="navbar" />
            ) : null}
          {location.pathname.includes(ROUTES.PLAYER) && (
            <NavBar class="navbar navbarComplete" />
          )}

          <Switch>
            <Route path={ROUTES.HOME} exact component={Home} />
            <Route
              path={`${ROUTES.VIDEO}/:videoId`}
              exact
              component={VideoInfos}
            />
            <Route
              path={`${ROUTES.PLAYER}/:videoId`}
              component={Player}
              key={uuid()}
            />{' '}
            <Route path={ROUTES.VIDEOS_LIST} component={VideosList} />
            <Route path={ROUTES.PROFILE} component={Profile} />
            <Route path={ROUTES.UPLOAD} exact component={Upload} />
            <Route path={ROUTES.SIGN_IN} exact component={SignIn} />
            <Route path={ROUTES.SIGN_UP} exact component={SignUp} />
            <Route path={ROUTES.LANDING} exact component={Landing} />
            <Route path={ROUTES.DISCOVER} exact component={Discover} />
            <Route path={ROUTES.ADMIN} exact component={AdminDashboard} />
            <Route
              path={`${ROUTES.SEARCH_ALL}/:searchTerm`}
              component={Search}
              key={uuid()}
            />
            <Route path={`${ROUTES.SEARCH}`} component={Search} />
            <Route path={ROUTES.EVENT} exact component={Event} />
            <Route
              path={`${ROUTES.CATEGORY}/:name`}
              exact
              component={Category}
            />
            <Route
              path={ROUTES.RESTRICTED_AREA}
              exact
              component={RestrictedArea}
            />
            <Route
              path={ROUTES.DOCUMENTATION}
              exact
              component={Documentation}
            />
            <Route component={Error404} />
          </Switch>

          {!location.pathname.includes(ROUTES.PLAYER) &&
            !location.pathname.includes(ROUTES.LANDING) ? (
              <Footer />
            ) : null}
        </>
      ) : (
          <SmallWidth />
        )}
    </div>
  );
}

export default withRouter(withAuthentification(App));
