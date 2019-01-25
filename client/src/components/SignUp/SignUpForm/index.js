//  @flow
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { getSignUpMessage } from '../../../store/reducers';
import Button from '../../Button';

type Props = {
  handleSubmit: () => mixed,
  viewChangeTo: () => mixed,
};

const SignUpRequest = ({ handleSubmit, viewChangeTo }: Props) => {
  const CompanyFields = [
    {
      type: 'text',
      name: 'name',
      label: 'Name',
    },
    {
      type: 'text',
      name: 'company',
      label: 'Company',
    },
    {
      type: 'email',
      name: 'email',
      label: 'Email',
    },
    {
      type: 'password',
      name: 'password',
      label: 'Password',
    },
    {
      type: 'number',
      name: 'phone',
      label: 'Phone',
    },
    {
      type: 'text',
      name: 'website',
      label: 'Website',
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
              component="input"
              className="sign-up-request__form--input"
              placeholder={field.label}/>
          ))}
        </div>
      </div>
      <Button label="Submit" type="submit" size="md" variant="contained" color="on-light" />
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
)(reduxForm({ form: 'signUp' })(SignUpRequest));
