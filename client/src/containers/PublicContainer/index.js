// @flow
import * as React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import type { StoreState } from '../../utls/flowTypes';
import { getUser } from '../../store/reducers';

type Props = {
  location: { state: { from: string } },
  user: {},
  component: React.Node,
};
const PublicComponent = ({ location, user, component: Component }: Props) => {
  const { from } = location.state || { from: { pathname: '/' } };
  if (user) {
    return <Redirect to={from} />;
  }
  return <Component />;
};

const mapStateToProps = (state: StoreState) => ({
  user: getUser(state),
});

export default withRouter(connect(mapStateToProps)(PublicComponent));
