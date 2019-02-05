import React from 'react';
import { injectStripe } from 'react-stripe-elements';
import axios from 'axios';

// import AddressSection from './AddressSection';
import Button from '../Button';

class Subscribe extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault();
    const { stripe, currentUser, viewChangeTo } = this.props;
    await stripe.createToken('account', { name: currentUser.name }).then(token => axios.post('/stripe/new', {
      stripeToken: token.token,
      email: currentUser.email,
      id: currentUser._id || currentUser.id,
    }));
    viewChangeTo('login');
  };

  render() {
    const { viewChangeTo } = this.props;
    return (
      <form className="stripe-form" onSubmit={this.handleSubmit}>
        <div className="stripe-form-btns">
          <Button type="submit" label="Proceed & Subscribe" variant="contained" color="on-light" />
          <Button
            label="Back to login"
            type="button"
            variant="outlined"
            color="on-dark"
            onClick={() => {
              viewChangeTo('login');
            }}/>
        </div>
      </form>
    );
  }
}

export default injectStripe(Subscribe);
