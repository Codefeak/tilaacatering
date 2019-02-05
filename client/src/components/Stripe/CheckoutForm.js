import React from 'react';
import { injectStripe } from 'react-stripe-elements';
import axios from 'axios';

// import AddressSection from './AddressSection';
import Button from '../Button';

const CheckoutForm = (props) => {
  const { stripe, currentUser, children } = props;
  const handleSubmit = async (e) => {
    e.preventDefault();
    await stripe.createToken('account').then(token => axios.post('/stripe/invoice/charge', {
      stripeToken: token.token,
      email: currentUser.email,
      stripeCusID: currentUser.stripeCusID,
    }));
    const {
      purchaseEvent, id, handleBuyAccess, buyAccessState,
    } = props;
    purchaseEvent(id);
    handleBuyAccess(buyAccessState);
  };
  
  return (
    <form className="stripe-form" onSubmit={handleSubmit}>
      {children}
      <div className="stripe-form-btns">
        <Button type="submit" label="Buy Event" variant="contained" color="on-light" />
      </div>
    </form>
  );
};

export default injectStripe(CheckoutForm);
