// @flow

import React, { Component } from 'react';
import EmailForm from '../../components/EmailForm';

type Props = {
  /* ... */
};

type State = {
  submitted: boolean,
  formErrors: string,
  emailValid: boolean,
};

class ForgotPassword extends Component<Props, State> {
  state = {
    submitted: false,
    formErrors: '',
    emailValid: false,
  };

  handleSubmit = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    this.setState({
      submitted: true,
    });
    // axios
    //   .put('/api/v2/users/password/reset/', values)
    //   .then(() => {
    //     this.setState({ loading: false, submitted: true });
    //   })
    //   .catch(() => this.setState({ loading: false, submitted: true }));
  };

  handleChange = (event: SyntheticEvent<HTMLButtonElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField(name: string, value: string) {
    let { formErrors, emailValid } = this.state;
    emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    formErrors = emailValid ? '' : ' is invalid';
    this.setState({ formErrors, emailValid }, this.validateForm);
  }

  render() {
    const { submitted } = this.state;
    const emailForm = (
      <EmailForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
    );

    const form = submitted ? (
      <div className="emailNotConfirmed">
        <h5>Email sent!</h5>
      </div>
    ) : (
      <div>
        <div>{emailForm}</div>
      </div>
    );

    return (
      <div>
        <div className="card-content">{form}</div>
      </div>
    );
  }
}

export default ForgotPassword;
