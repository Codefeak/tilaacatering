// @flow

import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import type { StoreState } from '../../utls/flowTypes';
import * as actions from '../../store/actions';
import { getLogInState } from '../../store/reducers';

type M = Array<{ field: string, path: string, className: string }>;
type Props = {
  logout: () => mixed,
  MenuList: M,
};

const Burger = (props: Props) => {
  const { logout, MenuList } = props;
  return (
    <React.Fragment>
      <div className="burger">
        <ul>
          {MenuList.map(menu => (
            <li key={menu.field}>
              <Link to={menu.path}>
                <span className={menu.className} />
              </Link>
            </li>
          ))}
          <li>
            <Link to="/" onClick={() => logout()}>
              <span className="fas fa-power-off" />
            </Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state: StoreState) => ({
  isLogIn: getLogInState(state),
});

export default connect(
  mapStateToProps,
  actions,
)(Burger);
