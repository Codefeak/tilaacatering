// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import type { StoreState } from '../../utls/flowTypes';
import { getCheckUser } from '../../store/reducers';
import * as actions from '../../store/actions';
import backgroundImg from '../../images/catering-pitopalvelu-compressor.jpg';


type Props = {
  location: string,
  user: {},
  name: string,
  checkUser: () => mixed,
};

class PrivateRoute extends React.Component<Props> {
  componentDidMount() {
    const { checkUser } = this.props;
    checkUser();
  }

  render() {
    const {
      location, user, name, component: Component, ...rest
    } = this.props;
    return (
      <React.Fragment>
        <MediaQuery query="(min-width: 1081px)">
          <div className="main-container__background" style={{ backgroundImage: `url(${backgroundImg})` }}/>
        </MediaQuery>
        <div className="routes-container">
          {!!name && <div><h1>{name}</h1><hr/></div>}
          <Route
            {...rest}
            render={() => {
              if (!user) {
                return <Redirect push to={{ pathname: '/login', state: { from: location } }} />;
              }
              return <Component {...this.props} />;
            }}/>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state: StoreState) => ({
  user: getCheckUser(state),
});

export default connect(
  mapStateToProps,
  actions,
)(PrivateRoute);
