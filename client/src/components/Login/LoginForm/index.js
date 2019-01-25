// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import type { StoreState } from '../../../utls/flowTypes';
import { getInputType } from '../../../store/reducers';
import * as actions from '../../../store/actions';
import Button from '../../Button';

type HandleEvent = () => mixed;

type Props = {
  inputType: string,
  handleSubmit: HandleEvent,
  viewChangeTo: HandleEvent,
  handleCheck: string => mixed,
  viewChangeTo: string => mixed,
};

const LoginForm = (props: Props) => {
  const {
    inputType, handleSubmit, handleCheck, viewChangeTo,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="login-form_section">
          <div className="login-form_section_input">
            <Field
              component="input"
              name="email"
              type="email"
              placeholder="Enter Username or E-mail"/>
          </div>
          <div className="login-form_section_input">
            <Field component="input" name="password" type={inputType} placeholder="Password" />
          </div>
          <div className="login-form_section_checkbox">
            <Field
              name="checkbox"
              component="input"
              type="checkbox"
              onChange={() => handleCheck(inputType)}/>
            <span>Show Password</span>
          </div>
        </div>
        <div className="login-form_section_button">
          <Button label="Login" type="submit" size="lg" variant="contained" color="on-light"/>
          <Button label="SignUp" type="button" size="lg" variant="outlined" color="on-dark" onClick={() => viewChangeTo('signUp')}/>
        </div>
        <p className="forgot-password">
          <a href="/forgotPassword">Forgot your password ?</a>
        </p>
      </div>
    </form>
  );
};

const mapStateToProps = (state: StoreState) => ({
  inputType: getInputType(state),
});
export default connect(
  mapStateToProps,
  actions,
)(reduxForm({ form: 'login' })(LoginForm));
