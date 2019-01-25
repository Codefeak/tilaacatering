import React from 'react';
import { injectStripe } from 'react-stripe-elements';
import axios from 'axios';

// import AddressSection from './AddressSection';
import CardSection from './CardSection';
import Button from '../Button';

class CheckoutForm extends React.Component {
  handleSubmit = async (e) => {
    const { stripe, currentUser } = this.props;
    e.preventDefault();
    await stripe.createToken({ name: currentUser.name }).then(token => axios.post('/stripe/charge', {
      stripeToken: token.token,
      email: currentUser.email,
      stripeCusID: currentUser.stripeCusID,
    }));
    const {
      purchaseEvent, id, handleBuyAccess, buyAccessState,
    } = this.props;
    purchaseEvent(id);
    handleBuyAccess(buyAccessState);
  };

  render() {
    return (
      <form className="stripe-form" onSubmit={this.handleSubmit}>
        <CardSection />
        <div className="stripe-form-btns">
          <Button type="submit" label="Confirm Payment" variant="contained" color="on-light" />
        </div>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);
