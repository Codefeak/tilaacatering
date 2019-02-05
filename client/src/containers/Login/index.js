// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import type { StoreState } from '../../utls/flowTypes';

import LoginForm from '../../components/Login/LoginForm';
import LoginLayout from '../../components/Login/LoginLayout';
import SubsFails from '../../components/Login/SubsFails';
import SignUpForm from '../../components/SignUp/SignUpForm';
import SignUpLayout from '../../components/SignUp/SignUpLayout';
import SignUpSuccess from '../../components/SignUp/SignUpSuccess';
import {
  getAuthenticationErrors,
  getSubscriptionErrors,
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
  stripeErr: { userData: { stripeCusID: string } },
  signedUpData: {},
  user: {},
  loginErr: { errors: {} },
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

  viewChangeTo: HandleFunction = (view) => {
    this.setState({ view });
  };

  render() {
    const {
      authentication,
      registration,
      signUpErr,
      signedUpData,
      loginErr,
      stripeErr,
    } = this.props;
    // eslint-disable-next-line prefer-const
    let { signUpMsg } = this.props;
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
              viewChangeTo={this.viewChangeTo}/>
            {!!signUpMsg && this.viewChangeTo('signUpSuccess')}
          </SignUpLayout>
        );

      case 'signUpSuccess':
        return (
          <SignUpSuccess
            viewChangeTo={this.viewChangeTo}
            signUpMsg={signUpMsg}
            currentUser={signedUpData}/>
        );

      case 'subsFails':
        return <SubsFails viewChangeTo={this.viewChangeTo} currentUser={stripeErr.userData} />;

      case 'login':
      default:
        return (
          <LoginLayout>
            <LoginForm
              {...this.state}
              onSubmit={authentication}
              viewChangeTo={this.viewChangeTo}
              errors={loginErr && loginErr.errors}/>
            {!!stripeErr && this.viewChangeTo('subsFails')}
          </LoginLayout>
        );
    }
  }
}

const mapStateToProps = (state: StoreState) => ({
  loginErr: getAuthenticationErrors(state),
  stripeErr: getSubscriptionErrors(state),
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
