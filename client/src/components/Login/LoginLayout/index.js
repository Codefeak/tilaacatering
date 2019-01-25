// @flow
import * as React from 'react';

type Props = {
  children: React.Node,
};
const LoginLayout = ({ children }: Props) => (
  <div className="login-layout">
    <div className="login-layout­­__container">{children}</div>
  </div>
);

export default LoginLayout;
