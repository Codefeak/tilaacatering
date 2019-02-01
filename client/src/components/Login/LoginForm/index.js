// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import validate from '../../../utls/validate';
import type { StoreState } from '../../../utls/flowTypes';
import { getInputType } from '../../../store/reducers';
import * as actions from '../../../store/actions';
import Button from '../../Button';

type HandleEvent = () => mixed;

type Props = reduxForm & {
  inputType: string,
  handleSubmit: HandleEvent,
  viewChangeTo: HandleEvent,
  handleCheck: string => mixed,
  viewChangeTo: string => mixed,
};
const renderField = ({
  placeholder, type, input, meta: { error, touched }, emailErr, pwdErr,
}) => (
  <div>
    <div>
      <input autoComplete="off" {...input} placeholder={placeholder} type={type} />
      {touched && (error && <p className="login-form_section--error">{error}</p>)}
      {touched && (emailErr && <p className="login-form_section--error">{emailErr.email}</p>)}
      {touched && (pwdErr && <p className="login-form_section--error">{pwdErr.password}</p>)}
    </div>
  </div>
);

const LoginForm = (props: Props) => {
  const {
    inputType, handleSubmit, handleCheck, viewChangeTo, errors,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="login-form_section">
          <div className="login-form_section_input">
            <Field
              component={renderField}
              name="email"
              type="text"
              emailErr={errors}
              placeholder="Enter Your E-mail"/>
          </div>
          <div className="login-form_section_input">
            <Field
              component={renderField}
              name="password"
              type={inputType}
              pwdErr={errors}
              placeholder="Password"/>
          </div>
          <div className="login-form_section_checkbox">
            <Field
              name="checkbox"
              component={renderField}
              type="checkbox"
              onChange={() => handleCheck(inputType)}/>
            <span>Show Password</span>
          </div>
        </div>
        <div className="login-form_section_button">
          <Button label="Login" type="submit" size="lg" variant="contained" color="on-light" />
          <Button
            label="SignUp"
            type="button"
            size="lg"
            variant="outlined"
            color="on-dark"
            onClick={() => viewChangeTo('signUp')}/>
        </div>
        {/* <p className="forgot-password">
          <a href="/forgotPassword">Forgot your password ?</a>
        </p> */}
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
)(
  reduxForm({
    form: 'login',
    validate,
    destroyOnUnmount: true,
    enableReinitialize: true,
  })(LoginForm),
);
