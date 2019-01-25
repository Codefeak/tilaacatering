// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import type { StoreState } from '../../utls/flowTypes';

import LoginForm from '../../components/Login/LoginForm';
import LoginLayout from '../../components/Login/LoginLayout';
import SignUpForm from '../../components/SignUp/SignUpForm';
import SignUpLayout from '../../components/SignUp/SignUpLayout';
import SignUpSuccess from '../../components/SignUp/SignUpSuccess';
import {
  getAuthentication,
  getSignUpMessage,
  getSignUpErrors,
  getSignedUpData,
} from '../../store/reducers';
import * as actions from '../../store/actions';

type Props = {
  authentication: () => mixed,
  registration: () => mixed,
  location: { pathname: string },
  signUpMsg: number,
  signUpErr: string,
  userData: {},
};
type State = {
  signUp: boolean,
  email: string,
  view: string,
};

type HandleFunction = () => mixed;

class Login extends React.Component<Props, State> {
  state = {
    signUp: false,
    email: '',
    view: 'login',
  };

  toggleFalse2: HandleFunction = () => {
    this.setState({ signUp: false });
  };

  handleSignUp2: HandleFunction = () => {
    this.setState({ signUp: true });
  };

  viewChangeTo: HandleFunction = (view) => {
    this.setState({ view });
  };

  render() {
    const {
      authentication, registration, signUpMsg, signUpErr, signedUpData,
    } = this.props;
    const { view } = this.state;
    // Swtich for rendering different views. "login" || "signUp" || "signUpSuccess"
    switch (view) {
      case 'signUp':
        return (
          <SignUpLayout>
            <SignUpForm
              onSubmit={registration}
              signUpMsg={signUpMsg}
              signUpErr={signUpErr}
              toggleFalse={this.toggleFalse2}
              viewChangeTo={this.viewChangeTo}/>
            {!!signUpMsg && this.viewChangeTo('signUpSuccess')}
            {!!signUpErr && <span>{signUpErr.statusText}</span>}
          </SignUpLayout>
        );

      case 'signUpSuccess':
        return <SignUpSuccess viewChangeTo={this.viewChangeTo} currentUser={signedUpData}/>;

      case 'login':
      default:
        return (
          <LoginLayout>
            <LoginForm {...this.state} onSubmit={authentication} viewChangeTo={this.viewChangeTo} />
          </LoginLayout>
        );
    }
  }
}

const mapStateToProps = (state: StoreState) => ({
  user: getAuthentication(state),
  signUpMsg: getSignUpMessage(state),
  signUpErr: getSignUpErrors(state),
  signedUpData: getSignedUpData(state),
});
export default withRouter(
  connect(
    mapStateToProps,
    actions,
  )(Login),
);
