// @flow
import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Elements } from 'react-stripe-elements';

import './styles/main.scss';
import type { StoreState } from './utls/flowTypes';

import Menu from './components/Menu';
import Login from './containers/Login';
import ForgotPassword from './containers/ForgotPassword';
import PrivateRoute from './components/PrivateRoute';
import componentList from './components/componentList';
import PublicContainer from './containers/PublicContainer';
import { getUser } from './store/reducers';
import * as actions from './store/actions';


type Props = {
  user: {},
  logOut: () => mixed,
};

const App = ({ user, logOut }: Props) => {
  const routes = (
    <Switch>
      <Route exact path="/login" render={() => <PublicContainer component={Login} />} />
      <Route
        exact
        path="/forgotPassword"
        render={() => <PublicContainer component={ForgotPassword} />}/>
      {componentList.map(route => (
        <PrivateRoute
          user={user}
          key={route.name}
          name={route.name}
          exact
          path={route.path}
          component={route.component}/>
      ))}
    </Switch>
  );

  return (
    <Elements>
      <div className="app">
        <Menu logout={logOut}>
          <div className="main-container">{routes}</div>
        </Menu>
      </div>
    </Elements>
  );
};

const mapStateToProps = (state: StoreState) => ({
  user: getUser(state),
});

export default withRouter(
  connect(
    mapStateToProps,
    actions,
  )(App),
);
