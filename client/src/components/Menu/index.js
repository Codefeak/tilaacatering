// @flow

import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import type { StoreState } from '../../utls/flowTypes';
import * as actions from '../../store/actions';
import { getLogInState } from '../../store/reducers';
import Button from '../Button';
import Burger from './Burger';
import DeviceView from '../DeviceView';

type Props = {
  logout: () => mixed,
  children: React.Node,
};

type State = {
  menuOpen: boolean,
};

type M = Array<{ field: string, path: string, className: string }>;

class Menu extends React.Component<Props, State> {
  constructor(){
    super();
    this.state = {
      menuOpen: false,
    };
    this.toggleMenuOpen = this.toggleMenuOpen.bind(this);
  }

  toggleMenuOpen() {
    this.setState(state => ({
      menuOpen: !state.menuOpen,
    }));
  }

  render() {
    const { logout, children } = this.props;
    const { menuOpen } = this.state;
    const MenuList: M = [
      {
        field: 'Home',
        path: '/',
        className: 'fas fa-home',
      },
      {
        field: 'profile',
        path: '/profile',
        className: 'fas fa-user',
      },
      {
        field: 'purchased History',
        path: '/PurchasedEvents',
        className: 'fas fa-history',
      },
    ];

    return (
      <React.Fragment>
        <div className="menu-header">
          <Link to="/">
            <h1>Tilaa Catering</h1>
          </Link>
          <div id="sidebar-menu">
            <ul>
              {MenuList.map(menu => (
                <li key={menu.field}>
                  <Link to={menu.path}>{menu.field}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="logout-panel">
            <Link to="/" onClick={() => logout()}>
              <Button label="Logout" variant="outlined" color="on-dark" />
            </Link>
          </div>
          <DeviceView device="mobile">
            {!menuOpen && <span className="fas fa-bars" onClick={this.toggleMenuOpen} />}
            {menuOpen && <span className="fas fa-times" onClick={this.toggleMenuOpen} />}
            {menuOpen && <Burger MenuList={MenuList} logout={logout} />}
          </DeviceView>
        </div>
        {children}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  isLogIn: getLogInState(state),
});

export default connect(
  mapStateToProps,
  actions,
)(Menu);
