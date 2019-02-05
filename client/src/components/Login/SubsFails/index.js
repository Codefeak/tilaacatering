// @flow

import React from 'react';

import Subscribe from '../../Stripe/Subsribe';

type Props = {};

const SubsFails = (props: Props) => (
  <div className="login">
    <div className="login__subs-fails">
      <p className="login__subs-fails__heading">
        Your Subscription Ended!!!
        <p>Please Subscribe to Login. Thank You!!!</p>
      </p>
      <Subscribe {...props} />
    </div>
  </div>
);

export default SubsFails;
