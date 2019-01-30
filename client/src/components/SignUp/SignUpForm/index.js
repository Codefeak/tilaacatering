//  @flow
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import validate from '../../../utls/validate';
import * as actions from '../../../store/actions';
import { getSignUpMessage } from '../../../store/reducers';
import Button from '../../Button';

type Props = reduxForm & {
  handleSubmit: () => mixed,
  viewChangeTo: () => mixed,
};

const renderField = ({
  placeholder, type, input, meta: { error, touched }, err,
}) => (
  <>
    <input
      className="sign-up-request__form--input"
      {...input}
      placeholder={placeholder}
      type={type}/>
    {touched && (error && <p className="sign-up-request__form--error">{error}</p>)}
    {<p className="sign-up-request__form--error">{err && err.email}</p>}
  </>
);
const SignUpRequest = ({
  handleSubmit,
  viewChangeTo,
  pristine,
  submitting,
  invalid,
  signUpErr,
}: Props) => {
  const CompanyFields = [
    {
      type: 'text',
      name: 'name',
      label: 'Full Name',
      error: null,
    },
    {
      type: 'text',
      name: 'company',
      label: 'Company',
      error: null,

    },
    {
      type: 'email',
      name: 'email',
      label: 'Email',
      error: signUpErr && signUpErr.errors,
    },
    {
      type: 'password',
      name: 'newPassword',
      label: 'Password',
      error: null,

    },
    {
      type: 'text',
      name: 'phone',
      label: 'Phone',
      error: null,

    },
    {
      type: 'text',
      name: 'website',
      label: 'Website',
      error: null,

    },
  ];
  return (
    <form onSubmit={handleSubmit} className="sign-up-request">
      <div className="sign-up-request__form">
        <div className="sign-up-request__form--information">
          <p>Company Information</p>
          {CompanyFields.map(field => (
            <Field
              key={field.name}
              type={field.type}
              name={field.name}
              err={field.error}
              component={renderField}
              placeholder={field.label}/>
          ))}
        </div>
      </div>
      <Button
        label="Submit"
        disabled={pristine || submitting || invalid}
        type="submit"
        size="md"
        variant="contained"
        color="on-light"/>
      <Button
        label="Cancel"
        type="button"
        size="md"
        variant="outlined"
        color="secondary"
        onClick={() => viewChangeTo('login')}/>
    </form>
  );
};

const mapDispatchToProps = state => ({
  signUp: getSignUpMessage(state),
});

export default connect(
  mapDispatchToProps,
  actions,
)(
  reduxForm({
    form: 'signUp',
    validate,
    destroyOnUnmount: true,
    enableReinitialize: true,
  })(SignUpRequest),
);
