// @flow
import * as React from 'react';

type Props = {
  children: React.Node,
};
const SignUpLayout = ({ children }: Props) => (
  <div className="login-layout">
    <div className="login-layout__signup">{children}</div>
  </div>
);

export default SignUpLayout;
