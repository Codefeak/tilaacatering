// @flow

import React from 'react';

import Subscribe from '../../Stripe/Subsribe';

type Props = {};

const SignUpSuccess = (props: Props) => (
  <div className="sign-up">
    <div className="sign-up__success">
      <p className="sign-up__success__heading">
        You have successfully singed up.
        <p>Please Subscribe Now</p>
      </p>
      <Subscribe {...props} />
    </div>
  </div>
);

export default SignUpSuccess;
